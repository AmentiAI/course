#!/usr/bin/env python3
"""
Multi-wallet pump orchestrator.
Runs 20 wallets with different trading behaviors to create organic-looking
volume on a pump.fun bonding curve (or graduated pump-amm) token.

Usage:
    python bot.py <TOKEN_MINT> [--slippage 25] [--pool pump] [--count 7] [--wallet 3] [--dry-run]
"""

import os
import sys
import json
import time
import random
import argparse
import threading
import requests
import base58
from typing import Optional
from dotenv import load_dotenv
from solders.keypair import Keypair
from solders.transaction import VersionedTransaction
from solders.signature import Signature as Sig
from solana.rpc.api import Client
from solana.rpc.types import TxOpts

load_dotenv()

# ── Constants ────────────────────────────────────────────────
API_URL      = "https://pumpportal.fun/api/trade-local"
PRIORITY_FEE = 0.0005   # SOL
SOL_RESERVE  = 0.01     # Keep enough for ~2 sell TX fees
WALLETS_PATH = os.path.join(os.path.dirname(__file__), "wallets.json")
SELL_ALL_SIGNAL = os.path.join(os.path.dirname(__file__), "SELL_ALL")

# Global start time — threads reference this for coordinated timing
SCRIPT_START = None
DRY_RUN      = False


def sell_all_triggered() -> bool:
    """Returns True if the SELL_ALL signal file exists."""
    return os.path.exists(SELL_ALL_SIGNAL)


def fire_sell_no_wait(wallet_info: dict, token: str, slippage: int,
                      pool: str, rpc_url: str):
    """
    Fire a 100% sell TX immediately — no confirmation wait.
    Used by the rapid sell-all watcher for maximum speed.
    """
    addr = wallet_info["address"]
    idx  = wallet_info["index"]
    try:
        keypair  = Keypair.from_bytes(base58.b58decode(wallet_info["wif"]))
        client   = Client(rpc_url)
        tx_bytes = build_tx(addr, "sell", token, "100%", False, slippage, pool)
        if not tx_bytes:
            print(f"  [W{idx:02d}] ⚠️  Sell TX build failed (no tokens?)")
            return
        tx     = VersionedTransaction.from_bytes(tx_bytes)
        signed = VersionedTransaction(tx.message, [keypair])
        result = client.send_transaction(
            signed, opts=TxOpts(skip_preflight=True, preflight_commitment="processed")
        )
        sig = str(result.value) if hasattr(result, "value") else str(result)
        print(f"  [W{idx:02d}] 🔥 RAPID SELL → {sig[:20]}...")
    except Exception as e:
        print(f"  [W{idx:02d}] Rapid sell error: {e}")


def sell_all_watcher(wallets: list, token: str, slippage: int,
                     pool: str, rpc_url: str):
    """
    Background watcher — polls for SELL_ALL signal every 0.2s.
    When triggered: fires sells in parallel batches of 5 per second.
    Bypasses individual wallet loops for instant coordinated exit.
    """
    while not sell_all_triggered():
        time.sleep(0.2)

    print(f"\n{'🚨' * 10}")
    print(f"  SELL_ALL TRIGGERED — dumping {len(wallets)} wallets at 5/sec")
    print(f"{'🚨' * 10}\n")

    batch_size = 5
    for i in range(0, len(wallets), batch_size):
        batch   = wallets[i:i + batch_size]
        threads = []
        for w in batch:
            t = threading.Thread(
                target=fire_sell_no_wait,
                args=(w, token, slippage, pool, rpc_url),
                daemon=True,
            )
            t.start()
            threads.append(t)
        for t in threads:
            t.join(timeout=15)
        if i + batch_size < len(wallets):
            time.sleep(1)  # 1 second gap → 5 wallets/sec rate

    print(f"\n  ✅ All {len(wallets)} sell orders fired")


def scaled_buy_pct(sol: float) -> float:
    """
    Buy percentage scaled by wallet balance — bigger wallets swing harder.
      >= 0.15 SOL  →  22–35%
      >= 0.10 SOL  →  18–28%
      >= 0.05 SOL  →  14–22%
       < 0.05 SOL  →  10–18%
    """
    if sol >= 0.15:
        return random.uniform(0.22, 0.35)
    elif sol >= 0.10:
        return random.uniform(0.18, 0.28)
    elif sol >= 0.05:
        return random.uniform(0.14, 0.22)
    else:
        return random.uniform(0.10, 0.18)


# ── Shared Helpers ───────────────────────────────────────────

def get_sol_balance(rpc_url: str, address: str) -> float:
    """RPC getBalance → SOL (float)."""
    payload = {
        "jsonrpc": "2.0", "id": 1,
        "method": "getBalance",
        "params": [address],
    }
    try:
        resp = requests.post(rpc_url, json=payload, timeout=10)
        if resp.ok:
            lamports = resp.json().get("result", {}).get("value", 0)
            return lamports / 1e9
    except Exception:
        pass
    return 0.0


def get_token_balance(rpc_url: str, address: str, mint: str) -> tuple:
    """Return (raw_amount, ui_amount) for token in wallet."""
    payload = {
        "jsonrpc": "2.0", "id": 1,
        "method": "getTokenAccountsByOwner",
        "params": [address, {"mint": mint}, {"encoding": "jsonParsed"}],
    }
    try:
        resp = requests.post(rpc_url, json=payload, timeout=10)
        if resp.ok:
            for acct in resp.json().get("result", {}).get("value", []):
                try:
                    ta  = acct["account"]["data"]["parsed"]["info"]["tokenAmount"]
                    raw = int(ta["amount"])
                    ui  = float(ta.get("uiAmountString", "0"))
                    return raw, ui
                except Exception:
                    continue
    except Exception:
        pass
    return 0, 0.0


def build_tx(wallet_addr: str, action: str, token: str, amount,
             denom_in_sol: bool, slippage: int, pool: str) -> Optional[bytes]:
    """Get serialized TX bytes from PumpPortal API."""
    payload = {
        "publicKey":        wallet_addr,
        "action":           action,
        "mint":             token,
        "amount":           amount,
        "denominatedInSol": "true" if denom_in_sol else "false",
        "slippage":         slippage,
        "priorityFee":      PRIORITY_FEE,
        "pool":             pool,
    }
    try:
        resp = requests.post(API_URL, json=payload, timeout=15)
        if resp.status_code == 200:
            return resp.content
        return None
    except Exception:
        return None


def sign_send_confirm(client: Client, keypair: Keypair, tx_bytes: bytes,
                      prefix: str) -> Optional[str]:
    """Sign, send, and poll for confirmation. Returns signature or None."""
    try:
        tx     = VersionedTransaction.from_bytes(tx_bytes)
        signed = VersionedTransaction(tx.message, [keypair])
        result = client.send_transaction(
            signed, opts=TxOpts(skip_preflight=False, preflight_commitment="confirmed")
        )
        sig = str(result.value) if hasattr(result, "value") else str(result)
        print(f"  {prefix} TX sent: {sig[:16]}...")

        # Poll confirmation
        time.sleep(3)
        for _ in range(20):
            try:
                obj    = Sig.from_string(sig)
                status = client.get_signature_statuses([obj])
                if hasattr(status, "value") and status.value and status.value[0]:
                    s = status.value[0]
                    if s.err:
                        print(f"  {prefix} TX failed on-chain: {s.err}")
                        return None
                    if s.confirmation_status:
                        return sig
            except Exception:
                pass
            time.sleep(2)
        print(f"  {prefix} TX confirmation timeout")
        return sig  # Return sig anyway, may have landed
    except Exception as e:
        print(f"  {prefix} Send error: {e}")
        return None


def do_buy(client: Client, keypair: Keypair, wallet_addr: str, token: str,
           sol_amount: float, slippage: int, pool: str, prefix: str) -> Optional[str]:
    """Build + sign + send a buy TX."""
    if DRY_RUN:
        print(f"  {prefix} [DRY-RUN] BUY {sol_amount:.4f} SOL")
        return "dry-run"

    tx_bytes = build_tx(wallet_addr, "buy", token, sol_amount, True, slippage, pool)
    if not tx_bytes:
        print(f"  {prefix} Buy TX build failed")
        return None
    print(f"  {prefix} BUY {sol_amount:.4f} SOL")
    return sign_send_confirm(client, keypair, tx_bytes, prefix)


def do_sell(client: Client, keypair: Keypair, wallet_addr: str, token: str,
            pct_str: str, slippage: int, pool: str, prefix: str) -> Optional[str]:
    """Build + sign + send a sell TX (percentage string like '25%' or '100%')."""
    if DRY_RUN:
        print(f"  {prefix} [DRY-RUN] SELL {pct_str}")
        return "dry-run"

    tx_bytes = build_tx(wallet_addr, "sell", token, pct_str, False, slippage, pool)
    if not tx_bytes:
        print(f"  {prefix} Sell TX build failed")
        return None
    print(f"  {prefix} SELL {pct_str}")
    return sign_send_confirm(client, keypair, tx_bytes, prefix)


# ── Role Behaviors ───────────────────────────────────────────

def run_general(client: Client, keypair: Keypair, wallet_addr: str,
                token: str, slippage: int, pool: str, prefix: str, rpc_url: str):
    """General wallet: buy loop for ~60s, then 30% chance sell 25% + rebuy 5%."""
    end_time = time.time() + 60

    while time.time() < end_time:
        if sell_all_triggered():
            print(f"  {prefix} ⚠️  SELL_ALL signal — dumping 100%")
            do_sell(client, keypair, wallet_addr, token, "100%", slippage, pool, prefix)
            return

        sol        = get_sol_balance(rpc_url, wallet_addr)
        buy_pct    = scaled_buy_pct(sol)
        buy_amount = round(sol * buy_pct, 4)

        if sol - buy_amount < SOL_RESERVE:
            print(f"  {prefix} Low SOL ({sol:.4f}), skipping buy")
            time.sleep(random.uniform(5, 10))
            continue

        do_buy(client, keypair, wallet_addr, token, buy_amount, slippage, pool, prefix)

        remaining = end_time - time.time()
        if remaining <= 0:
            break
        delay = min(random.uniform(2, 22), remaining)
        time.sleep(delay)

    if sell_all_triggered():
        print(f"  {prefix} ⚠️  SELL_ALL signal — dumping 100%")
        do_sell(client, keypair, wallet_addr, token, "100%", slippage, pool, prefix)
        return

    # After loop: 30% chance to sell 25% then buy back with 5% of SOL
    if random.random() < 0.30:
        print(f"  {prefix} === END SELL 25% ===")
        do_sell(client, keypair, wallet_addr, token, "25%", slippage, pool, prefix)
        time.sleep(2)
        sol   = get_sol_balance(rpc_url, wallet_addr)
        rebuy = round(sol * 0.05, 4)
        if rebuy > SOL_RESERVE:
            print(f"  {prefix} === REBUY {rebuy:.4f} SOL (5%) ===")
            do_buy(client, keypair, wallet_addr, token, rebuy, slippage, pool, prefix)

    print(f"  {prefix} Done")


def run_dump_rebuy(client: Client, keypair: Keypair, wallet_addr: str,
                   token: str, slippage: int, pool: str, prefix: str, rpc_url: str):
    """Dump-Rebuy: normal buys, then at 2min mark sell-all and rebuy 20%."""
    dump_time = SCRIPT_START + 120

    while time.time() < dump_time:
        if sell_all_triggered():
            print(f"  {prefix} ⚠️  SELL_ALL signal — dumping 100%")
            do_sell(client, keypair, wallet_addr, token, "100%", slippage, pool, prefix)
            return

        sol        = get_sol_balance(rpc_url, wallet_addr)
        buy_pct    = scaled_buy_pct(sol)
        buy_amount = round(sol * buy_pct, 4)

        if sol - buy_amount < SOL_RESERVE:
            print(f"  {prefix} Low SOL ({sol:.4f}), skipping buy")
            time.sleep(random.uniform(5, 10))
            continue

        sig = do_buy(client, keypair, wallet_addr, token, buy_amount, slippage, pool, prefix)

        if sig and random.random() < 0.30:
            time.sleep(random.uniform(1, 3))
            do_sell(client, keypair, wallet_addr, token, "25%", slippage, pool, prefix)

        remaining = dump_time - time.time()
        if remaining <= 0:
            break
        delay = min(random.uniform(2, 22), remaining)
        time.sleep(delay)

    print(f"  {prefix} === DUMP PHASE ===")
    do_sell(client, keypair, wallet_addr, token, "100%", slippage, pool, prefix)
    time.sleep(3)

    if sell_all_triggered():
        print(f"  {prefix} ⚠️  SELL_ALL active — skipping rebuy")
        return

    sol   = get_sol_balance(rpc_url, wallet_addr)
    rebuy = round(sol * 0.20, 4)
    if rebuy > SOL_RESERVE:
        print(f"  {prefix} === REBUY {rebuy:.4f} SOL ===")
        do_buy(client, keypair, wallet_addr, token, rebuy, slippage, pool, prefix)

    print(f"  {prefix} Done")


def run_partial_sell(client: Client, keypair: Keypair, wallet_addr: str,
                     token: str, slippage: int, pool: str, prefix: str, rpc_url: str):
    """Partial-Sell: normal buys, then at random 45-90s sell 50% and rebuy 15%."""
    trigger_delay = random.uniform(45, 90)
    trigger_time  = time.time() + trigger_delay
    triggered     = False
    end_time      = time.time() + 120

    while time.time() < end_time:
        if sell_all_triggered():
            print(f"  {prefix} ⚠️  SELL_ALL signal — dumping 100%")
            do_sell(client, keypair, wallet_addr, token, "100%", slippage, pool, prefix)
            return

        if not triggered and time.time() >= trigger_time:
            triggered = True
            print(f"  {prefix} === PARTIAL SELL 50% ===")
            do_sell(client, keypair, wallet_addr, token, "50%", slippage, pool, prefix)
            time.sleep(3)
            sol   = get_sol_balance(rpc_url, wallet_addr)
            rebuy = round(sol * 0.15, 4)
            if rebuy > SOL_RESERVE:
                print(f"  {prefix} === REBUY {rebuy:.4f} SOL ===")
                do_buy(client, keypair, wallet_addr, token, rebuy, slippage, pool, prefix)
            continue

        sol        = get_sol_balance(rpc_url, wallet_addr)
        buy_pct    = scaled_buy_pct(sol)
        buy_amount = round(sol * buy_pct, 4)

        if sol - buy_amount < SOL_RESERVE:
            print(f"  {prefix} Low SOL ({sol:.4f}), skipping buy")
            time.sleep(random.uniform(5, 10))
            continue

        sig = do_buy(client, keypair, wallet_addr, token, buy_amount, slippage, pool, prefix)

        if sig and random.random() < 0.30:
            time.sleep(random.uniform(1, 3))
            do_sell(client, keypair, wallet_addr, token, "25%", slippage, pool, prefix)

        remaining = end_time - time.time()
        if remaining <= 0:
            break
        delay = min(random.uniform(2, 22), remaining)
        time.sleep(delay)

    print(f"  {prefix} Done")


def run_micro_buyer(client: Client, keypair: Keypair, wallet_addr: str,
                    token: str, slippage: int, pool: str, prefix: str, rpc_url: str):
    """Micro-Buyer: small buys every 15s, occasional small sells. Runs ~3 min."""
    end_time = time.time() + 180

    while time.time() < end_time:
        if sell_all_triggered():
            print(f"  {prefix} ⚠️  SELL_ALL signal — dumping 100%")
            do_sell(client, keypair, wallet_addr, token, "100%", slippage, pool, prefix)
            return

        if random.random() < 0.15:
            do_sell(client, keypair, wallet_addr, token, "10%", slippage, pool, prefix)
        else:
            sol = get_sol_balance(rpc_url, wallet_addr)
            # Keep micro buys small — scaled by balance
            if sol >= 0.10:
                buy_amount = round(random.uniform(0.02, 0.05), 4)
            elif sol >= 0.05:
                buy_amount = round(random.uniform(0.01, 0.03), 4)
            else:
                buy_amount = round(random.uniform(0.005, 0.015), 4)

            if sol - buy_amount < SOL_RESERVE:
                print(f"  {prefix} Low SOL ({sol:.4f}), skipping")
                time.sleep(15)
                continue

            do_buy(client, keypair, wallet_addr, token, buy_amount, slippage, pool, prefix)

        time.sleep(15)

    print(f"  {prefix} Done (3min elapsed)")


# ── Role dispatch ────────────────────────────────────────────
ROLE_FNS = {
    "GENERAL": run_general,
    "DUMP":    run_dump_rebuy,
    "PARTIAL": run_partial_sell,
    "MICRO":   run_micro_buyer,
}


def wallet_thread(wallet_info: dict, role: str, token: str,
                  slippage: int, pool: str, rpc_url: str):
    """Entry point for each wallet thread."""
    idx    = wallet_info["index"]
    addr   = wallet_info["address"]
    pk     = wallet_info["wif"]
    prefix = f"[W{idx:02d}-{role}]"

    print(f"{prefix} Starting — {addr[:8]}...")

    keypair = Keypair.from_bytes(base58.b58decode(pk))
    client  = Client(rpc_url)

    sol = get_sol_balance(rpc_url, addr)
    print(f"  {prefix} SOL balance: {sol:.4f}")

    if sol < SOL_RESERVE and not DRY_RUN:
        print(f"  {prefix} Insufficient SOL, skipping")
        return

    fn = ROLE_FNS[role]
    try:
        fn(client, keypair, addr, token, slippage, pool, prefix, rpc_url)
    except Exception as e:
        print(f"  {prefix} ERROR: {e}")


# ── Main ─────────────────────────────────────────────────────

def main():
    global SCRIPT_START, DRY_RUN

    parser = argparse.ArgumentParser(description="Multi-wallet pump orchestrator")
    parser.add_argument("token",       help="Token mint address")
    parser.add_argument("--slippage",  type=int, default=25,
                        help="Slippage %% (default: 25)")
    parser.add_argument("--pool",      default="pump", choices=["pump", "pump-amm"],
                        help="Pool type (default: pump)")
    parser.add_argument("--count",     type=int, default=20,
                        help="Number of wallets to use (default: 20)")
    parser.add_argument("--wallet",    type=int, default=None,
                        help="Run a single specific wallet by index (overrides --count)")
    parser.add_argument("--dry-run",   action="store_true",
                        help="Print actions without sending TXs")
    args = parser.parse_args()

    DRY_RUN = args.dry_run

    # Clean up any stale SELL_ALL signal from a previous run
    if os.path.exists(SELL_ALL_SIGNAL):
        os.remove(SELL_ALL_SIGNAL)
        print("⚠️  Removed stale SELL_ALL signal file from previous run")

    rpc_url = os.getenv("SOLANA_RPC_URL")
    if not rpc_url:
        print("Missing SOLANA_RPC_URL in .env")
        sys.exit(1)

    # Load wallets
    with open(WALLETS_PATH) as f:
        wallets = json.load(f)["wallets"]

    # --wallet overrides --count: run just one specific wallet by index
    if args.wallet is not None:
        if args.wallet >= len(wallets):
            print(f"ERROR: --wallet {args.wallet} out of range (only {len(wallets)} wallets)")
            sys.exit(1)
        wallets = [wallets[args.wallet]]
        count   = 1
    else:
        count = max(1, min(args.count, len(wallets)))
        if args.count > len(wallets):
            print(f"Warning: --count {args.count} exceeds available wallets ({len(wallets)}), using {len(wallets)}")
        wallets = wallets[:count]

    # Assign roles proportionally
    # 20-wallet baseline: 14 GENERAL | 2 DUMP | 3 PARTIAL | 1 MICRO
    roles = {}
    if count >= 4:
        n_micro   = 1
        n_dump    = max(1, round(count * 0.10))
        n_partial = max(1, round(count * 0.15))
        n_general = count - n_micro - n_dump - n_partial
        if n_general < 1:
            n_general = 1
            n_partial = max(0, count - n_general - n_dump - n_micro)
        idx = 0
        for _ in range(n_general): roles[idx] = "GENERAL"; idx += 1
        for _ in range(n_dump):    roles[idx] = "DUMP";    idx += 1
        for _ in range(n_partial): roles[idx] = "PARTIAL"; idx += 1
        for _ in range(n_micro):   roles[idx] = "MICRO";   idx += 1
    else:
        for i in range(count):
            roles[i] = "GENERAL"

    role_counts  = {r: list(roles.values()).count(r) for r in set(roles.values())}
    role_summary = " | ".join(f"{v} {k}" for k, v in role_counts.items())

    mode = "[DRY-RUN] " if DRY_RUN else ""
    print("=" * 60)
    print(f"  {mode}MULTI-WALLET PUMP ORCHESTRATOR")
    print("=" * 60)
    print(f"  Token:    {args.token}")
    print(f"  Pool:     {args.pool}")
    print(f"  Slippage: {args.slippage}%")
    print(f"  Wallets:  {count}")
    print(f"  Roles:    {role_summary}")
    print("=" * 60)

    SCRIPT_START = time.time()

    # Launch sell-all watcher — fires 5 wallets/sec on SELL_ALL signal
    watcher = threading.Thread(
        target=sell_all_watcher,
        args=(wallets, args.token, args.slippage, args.pool, rpc_url),
        daemon=True,
    )
    watcher.start()

    threads = []

    for pos, w in enumerate(wallets):
        idx  = w["index"]
        role = roles[pos]
        t    = threading.Thread(
            target=wallet_thread,
            args=(w, role, args.token, args.slippage, args.pool, rpc_url),
            daemon=True,
        )
        threads.append(t)
        t.start()
        print(f"  Launched W{idx:02d} ({role})")
        time.sleep(3)  # 3-second stagger

    print(f"\nAll {count} threads launched. Waiting for completion...")

    for t in threads:
        t.join(timeout=240)

    elapsed = time.time() - SCRIPT_START
    print(f"\n{'=' * 60}")
    print(f"  ORCHESTRATOR COMPLETE — {elapsed:.1f}s elapsed")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
