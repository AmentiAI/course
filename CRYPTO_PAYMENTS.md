# Crypto Payments Implementation

## Overview
This platform supports Bitcoin (BTC) and Solana (SOL) payments using wallet connect and on-chain verification.

## Features

### Bitcoin Payment Flow
1. **Price Calculation**: Real-time BTC/USD price from CoinGecko API
2. **Wallet Connect**: Uses LaserEyes for Bitcoin wallet connection (supports Unisat, Xverse, Leather, etc.)
3. **Payment**: User signs transaction in their wallet
4. **Mempool Verification**: Backend checks mempool.space API for transaction
5. **Dust Protection**: Rejects UTXOs smaller than 600 sats
6. **Enrollment**: User gets instant access once transaction appears in mempool

### Solana Payment Flow
1. **Price Calculation**: Real-time SOL/USD price from CoinGecko API
2. **Wallet Connect**: Uses Solana Wallet Adapter (Phantom, Solflare, etc.)
3. **Payment**: User approves transaction in their wallet
4. **On-Chain Verification**: Backend fetches transaction from Solana RPC and verifies amount
5. **Enrollment**: User gets instant access after transaction confirmation

## Security Features

### Double-Spend Protection
- `txHash` is unique in the Payment table
- Backend rejects if transaction ID already used
- Prevents the same payment from enrolling multiple times

### Amount Verification
- Checks actual on-chain payment amount
- Allows 1% tolerance for price fluctuation during payment
- Rejects insufficient payments

### Bitcoin Dust Limit
- Minimum payment: 600 sats
- Prevents spam with tiny UTXOs

## Environment Variables

### Required
```env
# Payment addresses (where users send crypto)
NEXT_PUBLIC_BTC_PAYMENT_ADDRESS="bc1q..."
NEXT_PUBLIC_SOL_PAYMENT_ADDRESS="..."

# Solana RPC endpoint
NEXT_PUBLIC_SOLANA_RPC="https://api.mainnet-beta.solana.com"
# Or use paid RPC for better reliability:
# NEXT_PUBLIC_SOLANA_RPC="https://mainnet.helius-rpc.com/?api-key=YOUR_KEY"
```

## API Endpoints

### `GET /api/crypto/prices`
- Returns current BTC and SOL prices in USD
- Caches prices for 30 seconds
- Used for calculating payment amounts

### `POST /api/crypto/verify-btc`
```json
{
  "txid": "bitcoin_transaction_id",
  "courseId": "course_id",
  "expectedAmount": 12500,  // in sats
  "paymentAddress": "bc1q..."
}
```
- Fetches transaction from mempool.space
- Verifies payment to correct address
- Checks amount meets minimum (600 sats)
- Creates enrollment and payment record

### `POST /api/crypto/verify-sol`
```json
{
  "signature": "solana_transaction_signature",
  "courseId": "course_id",
  "expectedAmount": 0.05,  // in SOL
  "paymentAddress": "..."
}
```
- Fetches transaction from Solana RPC
- Verifies payment amount
- Creates enrollment and payment record

## Database Schema

### Enrollment
```prisma
model Enrollment {
  paymentMethod String?  // "bitcoin" | "solana" | "stripe"
  paymentStatus String?  // "completed" | "pending"
}
```

### Payment
```prisma
model Payment {
  txHash         String  @unique  // Prevents double-spend
  currency       String            // "BTC" | "SOL"
  chain          String?           // "bitcoin" | "solana"
  amount         Float             // BTC: sats, SOL: SOL amount
  usdAmount      Float?            // Course price in USD
  paymentAddress String?           // Where user sent payment
  status         PaymentStatus     // PENDING | CONFIRMED | FAILED
  confirmedAt    DateTime?
}
```

## Wallet Support

### Bitcoin
- Unisat Wallet
- Xverse Wallet
- Leather Wallet
- OKX Wallet
- Magic Eden Wallet
- Any wallet compatible with LaserEyes

### Solana
- Phantom
- Solflare
- Backpack
- Ledger
- Trezor
- Any wallet compatible with Solana Wallet Adapter

## Testing

### Bitcoin (Testnet)
1. Change mempool API to `https://mempool.space/testnet/api/`
2. Use testnet wallet
3. Get testnet BTC from faucet
4. Update `NEXT_PUBLIC_BTC_PAYMENT_ADDRESS` to testnet address

### Solana (Devnet)
1. Update `NEXT_PUBLIC_SOLANA_RPC` to devnet RPC
2. Use devnet wallet
3. Airdrop devnet SOL
4. Update `NEXT_PUBLIC_SOL_PAYMENT_ADDRESS` to devnet address

## Production Deployment

### Vercel Environment Variables
Add these in Vercel dashboard:
```
NEXT_PUBLIC_BTC_PAYMENT_ADDRESS="your_mainnet_address"
NEXT_PUBLIC_SOL_PAYMENT_ADDRESS="your_mainnet_address"
NEXT_PUBLIC_SOLANA_RPC="https://api.mainnet-beta.solana.com"
```

### Monitoring
- Check Payment table for successful transactions
- Monitor mempool/blockchain for incoming payments
- Set up alerts for failed verifications

## Troubleshooting

### "Transaction not found in mempool"
- Transaction may not be broadcast yet
- Try again after a few seconds
- Check if user actually sent the transaction

### "Insufficient payment"
- Price may have changed during payment
- 1% tolerance is allowed
- User may need to send a bit more

### "This transaction has already been used"
- Double-spend attempt detected
- Or user refreshed checkout page after successful payment
- Check Enrollment table for existing enrollment

## Future Improvements
- [ ] Add transaction status polling (auto-refresh)
- [ ] Support for more cryptocurrencies (USDC, USDT)
- [ ] Lightning Network for faster Bitcoin payments
- [ ] Refund mechanism for overpayments
- [ ] Payment history page for users
