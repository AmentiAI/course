import { NextRequest, NextResponse } from 'next/server';

// Cache prices for 30 seconds to avoid rate limits
let priceCache: { btc: number; sol: number; timestamp: number } | null = null;
const CACHE_DURATION = 30000; // 30 seconds

export async function GET(req: NextRequest) {
  try {
    const now = Date.now();

    // Return cached prices if still valid
    if (priceCache && now - priceCache.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        btc: priceCache.btc,
        sol: priceCache.sol,
        cached: true,
      });
    }

    // Fetch fresh prices from CoinGecko (free API, no key needed)
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana&vs_currencies=usd',
      { next: { revalidate: 30 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch prices');
    }

    const data = await response.json();
    const btcPrice = data.bitcoin?.usd;
    const solPrice = data.solana?.usd;

    if (!btcPrice || !solPrice) {
      throw new Error('Invalid price data');
    }

    // Update cache
    priceCache = {
      btc: btcPrice,
      sol: solPrice,
      timestamp: now,
    };

    return NextResponse.json({
      btc: btcPrice,
      sol: solPrice,
      cached: false,
    });
  } catch (error) {
    console.error('Price fetch error:', error);
    
    // Return cached data if available, even if expired
    if (priceCache) {
      return NextResponse.json({
        btc: priceCache.btc,
        sol: priceCache.sol,
        cached: true,
        stale: true,
      });
    }

    return NextResponse.json(
      { error: 'Failed to fetch crypto prices' },
      { status: 500 }
    );
  }
}
