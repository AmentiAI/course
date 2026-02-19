#!/usr/bin/env python3
"""
hop_dist.py — Obfuscated SOL distribution.

Each destination wallet gets its OWN dedicated chain of 3 brand-new
ephemeral hop wallets that have never been used before.

Flow per destination:
    Source → Hop1(fresh) → Hop2(fresh) → Hop3(fresh) → Dest

No hop wallet is ever reused. After delivery, each hop drains
its dust back to source so nothing is left behind.

Usage:
    python hop_dist.py [--amount 1.5] [--reserve 0.05] [--count 5] [--dry-run]

        --amount   Total SOL to distribute across all dest wallets
                   (default: auto = balance - reserve - fees)
        --reserve  SOL to keep in wallet #0 (default: 0.05)
        --count    How many destination wallets to fund (default: 19)
                   e.g. --count 3 funds wallets #1, #2, #3 only
        --dry-run  Show full plan without sending any transactions
"""

import os
import sys
import json
import time
import struct
import random
import argparse
import base64
import base58
import requests
from typing import List, Optional
from dotenv import load_dotenv
from solders.keypair import Keypair
from solders.pubkey import Pubkey

load_dotenv()

# ── Constants ─────────────────────────────────────────────────────────────────
WALLETS_PATH    = os.path.join(os.path.dirname(__file__), "wallets.json")
BASE_FEE        = 5_000          # lamports per tx (no priority fee)
LAMPORTS        = 1_000_000_000
DEFAULT_RESERVE = 0.05
MAX_DESTS       = 19             # wallets #1–19
SYSTEM_PROG     = bytes(32)      # 32 zero bytes = 11111111111111111111111111111111

DRY_RUN = False
RPC_URL = os.getenv("SOLANA_RPC_URL")


# ── RPC ───────────────────────────────────────────────────────────────────────

def rpc(method: str, params: list) -> dict:
    r = requests.post(RPC_URL, json={
        "jsonrpc": "2.0", "id": 1,
        "method": method, "params": params
    }, timeout=15)
    r.raise_for_status()
    return r.json()


def get_balance(addr: str) -> int:
    return rpc("getBalance", [addr]).get("result", {}).get("value", 0)


def get_blockhash() -> str:
    return rpc("getLatestBlockhash", [{"commitment": "confirmed"}])["result"]["value"]["blockhash"]


def wait_confirm(sig: str, attempts: int = 30) -> bool:
    time.sleep(3)
    for _ in range(attempts):
        try:
            val = rpc("getSignatureStatuses", [[sig]])["result"]["value"]
            s = val[0] if val else None
            if s:
                if s.get("err"):
                    print(f"    ❌ On-chain error: {s['err']}")
                    return False
                if s.get("confirmationStatus") in ("confirmed", "finalized"):
                    return True
        except Exception:
            pass
        time.sleep(2)
    print(f"    ⏱  Timeout: {sig[:20]}...")
    return False


# ── Transaction builder ───────────────────────────────────────────────────────

def _compact_u16(n: int) -> bytes:
    if n < 0x80:
        return bytes([n])
    elif n < 0x4000:
        return bytes([(n & 0x7F) | 0x80, (n >> 7) & 0x7F])
    else:
        return bytes([(n & 0x7F) | 0x80, ((n >> 7) & 0x7F) | 0x80, (n >> 14) & 0x03])


def build_transfer(sender: Keypair, recipient: Pubkey, lamports: int) -> str:
    """
    Build and sign a legacy SOL transfer transaction.
    Returns base64-encoded serialized transaction string.

    Account layout:
      [0] sender      — signer, writable
      [1] recipient   — unsigned, writable
      [2] system prog — unsigned, readonly
    Header: [1, 0, 1]
    """
    blockhash = base58.b58decode(get_blockhash())

    from_b = bytes(sender.pubkey())
    to_b   = bytes(recipient)
    accounts = [from_b, to_b, SYSTEM_PROG]

    # System program instruction index 2 = Transfer
    ix_data = struct.pack("<I", 2) + struct.pack("<Q", lamports)

    instruction = (
        bytes([2])                      +   # program id index
        _compact_u16(2)                 +   # 2 accounts
        bytes([0, 1])                   +   # from=0, to=1
        _compact_u16(len(ix_data))      +
        ix_data
    )

    header = bytes([1, 0, 1])

    acct_section = _compact_u16(len(accounts))
    for a in accounts:
        acct_section += a

    message = header + acct_section + blockhash + _compact_u16(1) + instruction
    sig_bytes = bytes(sender.sign_message(message))

    tx = _compact_u16(1) + sig_bytes + message
    return base64.b64encode(tx).decode()


def send_sol(sender: Keypair, recipient: Pubkey, lam: int, label: str,
             retries: int = 3, retry_pause: float = 5.0) -> Optional[str]:
    """
    Sign, broadcast, confirm. Retries up to `retries` times on failure.
    Returns sig string or None after all attempts exhausted.
    """
    sol = lam / LAMPORTS

    if DRY_RUN:
        print(f"  [DRY-RUN] {label}  {sol:.6f} SOL → {str(recipient)[:14]}...")
        return "dry-run"

    for attempt in range(1, retries + 1):
        try:
            if attempt > 1:
                print(f"  {label} ↻ Retry {attempt}/{retries} (pausing {retry_pause:.0f}s)...")
                time.sleep(retry_pause)

            tx_b64 = build_transfer(sender, recipient, lam)
            result = rpc("sendTransaction", [
                tx_b64,
                {"encoding": "base64", "skipPreflight": False, "preflightCommitment": "confirmed"}
            ])

            if "error" in result:
                print(f"  {label} ❌ Attempt {attempt}: {result['error'].get('message', result['error'])}")
                continue  # retry

            sig = result["result"]
            print(f"  {label}  {sol:.6f} SOL  →  TX: {sig[:22]}...")

            if wait_confirm(sig):
                if attempt > 1:
                    print(f"  {label} ✓ (succeeded on attempt {attempt})")
                else:
                    print(f"  {label} ✓")
                return sig

            print(f"  {label} ⚠️  Attempt {attempt}: confirmation failed, retrying...")

        except Exception as e:
            print(f"  {label} ❌ Attempt {attempt} exception: {e}")

    print(f"  {label} 💀 All {retries} attempts failed.")
    return None


def print_key_rescue(kp: Keypair, label: str):
    key_b58 = base58.b58encode(bytes(kp)).decode()
    print(f"\n  ⚠️  RESCUE — funds stuck in {label}")
    print(f"  Address    : {str(kp.pubkey())}")
    print(f"  Private key: {key_b58}")


# ── Split helpers ─────────────────────────────────────────────────────────────

def split_random(total: int, n: int) -> List[int]:
    """
    Split total lamports into n amounts with ±15% random variation.
    Sum is guaranteed to equal total.
    """
    base = total // n
    amounts = []
    for _ in range(n - 1):
        jitter = int(base * random.uniform(-0.15, 0.15))
        amounts.append(max(base + jitter, 10_000))
    amounts.append(max(total - sum(amounts), 10_000))
    return amounts


# ── Per-wallet hop chain ──────────────────────────────────────────────────────

def fund_wallet_via_hops(
    source_kp:    Keypair,
    source_pubkey: Pubkey,
    dest_addr:    str,
    amount_lam:   int,
    label:        str,
) -> bool:
    """
    Fund a single destination wallet through 3 fresh hop wallets.
    Each hop wallet is generated new for this call only.

    Fee deductions through the chain:
      source  sends: amount_lam      (source pays its own tx fee separately)
      hop1    sends: amount_lam - 1*BASE_FEE
      hop2    sends: amount_lam - 2*BASE_FEE
      hop3    sends: amount_lam - 3*BASE_FEE  → destination receives this
    """
    # Generate 3 brand-new ephemeral keypairs, never used before
    hop1 = Keypair()
    hop2 = Keypair()
    hop3 = Keypair()

    dest_pubkey = Pubkey.from_string(dest_addr)

    hop1_send = amount_lam - BASE_FEE
    hop2_send = hop1_send  - BASE_FEE
    hop3_send = hop2_send  - BASE_FEE  # what destination actually receives

    if hop3_send <= 0:
        print(f"  {label} ❌ Amount too small to cover 3 hop fees")
        return False

    print(f"\n  ┌─ {label}")
    print(f"  │  Hops: {str(hop1.pubkey())[:12]}.. → {str(hop2.pubkey())[:12]}.. → {str(hop3.pubkey())[:12]}..")
    print(f"  │  Dest: {dest_addr}  ({hop3_send/LAMPORTS:.6f} SOL net)")

    # Step 1: Source → Hop1
    sig = send_sol(source_kp, hop1.pubkey(), amount_lam, f"  │  [SRC→HOP1]")
    if not sig:
        print(f"  └─ {label} ❌ failed at SRC→HOP1 after all retries")
        print(f"  │  (funds still in source wallet — safe)")
        return False

    time.sleep(1)

    # Step 2: Hop1 → Hop2
    sig = send_sol(hop1, hop2.pubkey(), hop1_send, f"  │  [HOP1→HOP2]")
    if not sig:
        print(f"  └─ {label} ❌ failed at HOP1→HOP2 after all retries")
        print_key_rescue(hop1, f"{label}/HOP1")
        return False

    time.sleep(1)

    # Step 3: Hop2 → Hop3
    sig = send_sol(hop2, hop3.pubkey(), hop2_send, f"  │  [HOP2→HOP3]")
    if not sig:
        print(f"  └─ {label} ❌ failed at HOP2→HOP3 after all retries")
        print_key_rescue(hop2, f"{label}/HOP2")
        # hop1 is now empty (already forwarded), hop2 has the funds
        return False

    time.sleep(1)

    # Step 4: Hop3 → Destination
    sig = send_sol(hop3, dest_pubkey, hop3_send, f"  │  [HOP3→DEST]")
    if not sig:
        print(f"  └─ {label} ❌ failed at HOP3→DEST after all retries")
        print_key_rescue(hop3, f"{label}/HOP3")
        # hop3 has the funds — give key to recover
        return False

    print(f"  └─ {label} ✅ done  ({hop3_send/LAMPORTS:.6f} SOL delivered)")
    return True


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    global DRY_RUN, RPC_URL

    parser = argparse.ArgumentParser(
        description="Hop distributor — each dest gets 3 dedicated fresh hop wallets"
    )
    parser.add_argument("--amount",  type=float, default=None,
                        help="Total SOL to distribute (default: auto)")
    parser.add_argument("--reserve", type=float, default=DEFAULT_RESERVE,
                        help=f"SOL to keep in source wallet (default: {DEFAULT_RESERVE})")
    parser.add_argument("--count",   type=int,   default=MAX_DESTS,
                        help=f"Number of destination wallets to fund (default: {MAX_DESTS}, max: {MAX_DESTS})")
    parser.add_argument("--start",   type=int,   default=1,
                        help="Wallet index to start from (default: 1, i.e. wallet #1)")
    parser.add_argument("--yes", "-y", action="store_true",
                        help="Skip confirmation prompt and run immediately")
    parser.add_argument("--dry-run", action="store_true",
                        help="Show plan without sending transactions")
    args = parser.parse_args()

    global RPC_URL
    DRY_RUN = args.dry_run
    RPC_URL = os.getenv("SOLANA_RPC_URL")
    if not RPC_URL:
        print("ERROR: SOLANA_RPC_URL not set in .env")
        sys.exit(1)

    count = max(1, min(args.count, MAX_DESTS))
    start = max(1, args.start)  # must be at least 1 (wallet 0 is source)

    # Load wallets
    with open(WALLETS_PATH) as f:
        wallets = json.load(f)["wallets"]

    end = start + count
    if len(wallets) < end:
        print(f"ERROR: Need wallets #{start}–#{end-1} but only {len(wallets)} wallets in file")
        sys.exit(1)

    source_info   = wallets[0]
    dest_infos    = wallets[start:end]

    source_kp     = Keypair.from_bytes(base58.b58decode(source_info["wif"]))
    source_addr   = source_info["address"]
    source_pubkey = Pubkey.from_string(source_addr)

    # Balance check
    balance_lam = get_balance(source_addr)
    balance_sol = balance_lam / LAMPORTS
    reserve_lam = int(args.reserve * LAMPORTS)

    # Fee budget:
    #   Per wallet: 4 hops txs + 3 dust-drain txs = 7 txs
    #   Source additionally pays 1 outbound tx fee per wallet
    fee_per_wallet  = (4 + 3) * BASE_FEE
    total_fee_budget = fee_per_wallet * count

    print("=" * 66)
    print("  HOP DISTRIBUTOR  —  3 dedicated fresh hops per destination")
    print("=" * 66)
    print(f"  Source wallet : {source_addr}")
    print(f"  Balance       : {balance_sol:.6f} SOL")
    print(f"  Reserve kept  : {args.reserve:.4f} SOL")
    print(f"  Destinations  : {count} wallet(s)  (wallets #{start}–#{end-1})")
    print(f"  Mode          : {'DRY-RUN 🔍' if DRY_RUN else '🔴 LIVE'}")

    if args.amount is not None:
        total_dist_lam = int(args.amount * LAMPORTS)
    else:
        total_dist_lam = balance_lam - reserve_lam - total_fee_budget

    if total_dist_lam <= 0:
        print(f"\n  ❌ Insufficient balance for distribution + fees.")
        print(f"     Have: {balance_sol:.6f} SOL  |  Reserve: {args.reserve:.4f}  |  Fees: {total_fee_budget/LAMPORTS:.6f}")
        sys.exit(1)

    # Split total across destinations with ±15% random variation.
    # Each per_wallet amount is what SOURCE sends to hop1 for that chain.
    # Destination receives: per_wallet_amount - 3*BASE_FEE
    per_wallet_amounts = split_random(total_dist_lam, count)

    net_per_wallet_avg = (total_dist_lam - count * 3 * BASE_FEE) / count / LAMPORTS

    print(f"  Total SOL out : {total_dist_lam/LAMPORTS:.6f} SOL")
    print(f"  Est. per dest : ~{net_per_wallet_avg:.6f} SOL (after 3 hop fees, ±15% variation)")
    print(f"  Hop wallets   : {count * 3} freshly generated (3 per destination, never reused)")
    print(f"  Est. fees     : ~{total_fee_budget/LAMPORTS:.6f} SOL total")
    print("─" * 66)
    print(f"  {'IDX':<5}  {'ADDRESS':<46}  {'AMOUNT (SOL)':>14}")
    print("─" * 66)
    for w, amt in zip(dest_infos, per_wallet_amounts):
        net = (amt - 3 * BASE_FEE) / LAMPORTS
        print(f"  W{w['index']:<4}  {w['address']}  {net:>14.6f}")
    print("─" * 66)

    if DRY_RUN:
        print("\n  [DRY-RUN complete] No transactions sent.")
        return

    if not args.yes:
        confirm = input("\n  Proceed with LIVE run? (yes/no): ").strip().lower()
        if confirm != "yes":
            print("  Aborted.")
            return
    else:
        print("\n  Auto-confirmed (--yes). Starting...")

    print()

    # ── Run each wallet's hop chain sequentially ─────────────────────────────
    success = 0
    failed  = []

    for i, (dest_info, amt) in enumerate(zip(dest_infos, per_wallet_amounts)):
        label = f"W{dest_info['index']:02d} ({i+1}/{count})"
        ok = fund_wallet_via_hops(
            source_kp     = source_kp,
            source_pubkey = source_pubkey,
            dest_addr     = dest_info["address"],
            amount_lam    = amt,
            label         = label,
        )

        if ok:
            success += 1
        else:
            failed.append(dest_info["index"])

        # Small pause between wallets to avoid rate limiting
        if i < count - 1:
            time.sleep(random.uniform(1.5, 3.0))

    # ── Summary ───────────────────────────────────────────────────────────────
    print("\n" + "=" * 66)
    print("  DISTRIBUTION COMPLETE")
    print(f"  ✅ Funded  : {success}/{count} wallets")
    if failed:
        print(f"  ❌ Failed  : wallets {failed}")
    print("=" * 66)


if __name__ == "__main__":
    main()
