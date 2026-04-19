import { NextRequest, NextResponse } from "next/server";

let priceCache: { btc: number; timestamp: number } | null = null;
const CACHE_DURATION = 30_000;

export async function GET(_req: NextRequest) {
  try {
    const now = Date.now();

    if (priceCache && now - priceCache.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        btc: priceCache.btc,
        cached: true,
      });
    }

    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
      { next: { revalidate: 30 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }

    const data = await response.json();
    const btcPrice = data.bitcoin?.usd;

    if (!btcPrice) {
      throw new Error("Invalid price data");
    }

    priceCache = {
      btc: btcPrice,
      timestamp: now,
    };

    return NextResponse.json({
      btc: btcPrice,
      cached: false,
    });
  } catch (error) {
    console.error("Price fetch error:", error);

    if (priceCache) {
      return NextResponse.json({
        btc: priceCache.btc,
        cached: true,
        stale: true,
      });
    }

    return NextResponse.json(
      { error: "Failed to fetch crypto prices" },
      { status: 500 }
    );
  }
}
