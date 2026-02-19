// Bitcoin/Ordinals data via Hiro API + Ordiscan

const HIRO_BASE = "https://api.hiro.so";
const ORDISCAN_BASE = "https://api.ordiscan.com/v1";

const hiroHeaders = {
  "x-hiro-api-key": process.env.HIRO_API_KEY ?? "",
};
const ordiscanHeaders = {
  Authorization: `Bearer ${process.env.ORDISCAN_API_KEY ?? ""}`,
};

// ─────────────────────────────────────────────
// ORDINALS: Get all holders of a collection
// ─────────────────────────────────────────────
export async function getOrdinalsHolders(inscriptionRange: {
  start: number;
  end: number;
}) {
  const holders: Record<string, string[]> = {}; // wallet -> [inscriptionIds]

  for (let i = inscriptionRange.start; i <= inscriptionRange.end; i++) {
    const res = await fetch(`${HIRO_BASE}/ordinals/v1/inscriptions/${i}`, {
      headers: hiroHeaders,
    });

    if (!res.ok) continue;

    const data = await res.json();
    const address = data.address;
    if (!address) continue;

    if (!holders[address]) holders[address] = [];
    holders[address].push(data.id);

    // Rate limit: Hiro allows ~50 req/sec
    if (i % 50 === 0) await sleep(1000);
  }

  return holders;
}

// ─────────────────────────────────────────────
// ORDINALS: Get collection sales from Ordiscan
// ─────────────────────────────────────────────
export async function getOrdinalsSales(collectionSlug: string, limit = 50) {
  const res = await fetch(
    `${ORDISCAN_BASE}/collection/${collectionSlug}/activity?limit=${limit}`,
    { headers: ordiscanHeaders }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return (data.data ?? []).map((sale: any) => ({
    tokenId: sale.inscription_id,
    fromWallet: sale.from,
    toWallet: sale.to,
    price: sale.price_sats / 1e8, // convert sats to BTC
    priceUsd: sale.price_usd,
    marketplace: sale.marketplace,
    txHash: sale.txid,
    occurredAt: new Date(sale.timestamp * 1000),
  }));
}

// ─────────────────────────────────────────────
// ORDINALS: Get collection floor price
// ─────────────────────────────────────────────
export async function getOrdinalsFloorPrice(collectionSlug: string) {
  const res = await fetch(
    `${ORDISCAN_BASE}/collection/${collectionSlug}`,
    { headers: ordiscanHeaders }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return {
    floorPrice: data.data?.floor_price_sats
      ? data.data.floor_price_sats / 1e8
      : null,
    volume24h: data.data?.volume_24h_sats
      ? data.data.volume_24h_sats / 1e8
      : null,
    holderCount: data.data?.owner_count ?? null,
    listedCount: data.data?.listed_count ?? null,
  };
}

// ─────────────────────────────────────────────
// BITCOIN: Get wallet data
// ─────────────────────────────────────────────
export async function getBitcoinWalletData(address: string) {
  const res = await fetch(
    `${HIRO_BASE}/extended/v1/address/${address}/balances`,
    { headers: hiroHeaders }
  );

  if (!res.ok) return null;

  const data = await res.json();
  const btcBalance = data.stx?.balance ? Number(data.stx.balance) / 1e8 : 0;

  // Get ordinals owned
  const ordinalsRes = await fetch(
    `${HIRO_BASE}/ordinals/v1/inscriptions?address=${address}&limit=20`,
    { headers: hiroHeaders }
  );

  const ordinalsData = ordinalsRes.ok ? await ordinalsRes.json() : { total: 0 };

  return {
    btcBalance,
    totalOrdinals: ordinalsData.total ?? 0,
  };
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Determine if a wallet is a whale (holds many ordinals or high value)
export function isWhaleWallet(data: {
  totalOrdinals: number;
  btcBalance: number;
}): boolean {
  return data.totalOrdinals >= 50 || data.btcBalance >= 1;
}
