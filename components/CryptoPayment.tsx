'use client';

import { useState, useEffect } from 'react';
import { Bitcoin, Loader2, Check, AlertCircle, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CryptoPaymentProps {
  courseId: string;
  coursePrice: number;
  courseSlug: string;
}

export default function CryptoPayment({ courseId, coursePrice, courseSlug }: CryptoPaymentProps) {
  const router = useRouter();
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'SOL' | null>(null);
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [solPrice, setSolPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [paymentAddress, setPaymentAddress] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');

  // Fetch crypto prices
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchPrices = async () => {
    try {
      const res = await fetch('/api/crypto/prices');
      const data = await res.json();
      setBtcPrice(data.btc);
      setSolPrice(data.sol);
    } catch (err) {
      console.error('Failed to fetch prices:', err);
    }
  };

  const calculateAmount = (crypto: 'BTC' | 'SOL'): number => {
    if (crypto === 'BTC' && btcPrice) {
      return coursePrice / btcPrice;
    }
    if (crypto === 'SOL' && solPrice) {
      return coursePrice / solPrice;
    }
    return 0;
  };

  const calculateSatsAmount = (): number => {
    if (!btcPrice) return 0;
    const btcAmount = coursePrice / btcPrice;
    return Math.ceil(btcAmount * 100000000); // Convert to sats
  };

  const handleBitcoinPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Dynamic import of LaserEyes
      const { useLaserEyes } = await import('@omnisat/lasereyes');
      const { connect, sendBTC, address } = useLaserEyes();

      // Connect wallet
      if (!address) {
        await connect();
      }

      // Generate payment address (in production, get this from your backend)
      const payAddr = process.env.NEXT_PUBLIC_BTC_PAYMENT_ADDRESS || 'YOUR_BTC_ADDRESS';
      setPaymentAddress(payAddr);

      const satsAmount = calculateSatsAmount();

      if (satsAmount < 600) {
        setError('Payment amount too small. Minimum 600 sats required.');
        setLoading(false);
        return;
      }

      // Send BTC
      const txid = await sendBTC(payAddr, satsAmount);
      setTxHash(txid);

      // Verify transaction
      await verifyBitcoinPayment(txid, payAddr, satsAmount);
    } catch (err: any) {
      console.error('Bitcoin payment error:', err);
      setError(err.message || 'Failed to process Bitcoin payment');
    } finally {
      setLoading(false);
    }
  };

  const handleSolanaPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Dynamic import of Solana wallet adapter
      const { useWallet } = await import('@solana/wallet-adapter-react');
      const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } = await import('@solana/web3.js');
      
      const { publicKey, sendTransaction, connected, connect } = useWallet();

      // Connect wallet if not connected
      if (!connected || !publicKey) {
        await connect();
        return;
      }

      // Generate payment address
      const payAddr = process.env.NEXT_PUBLIC_SOL_PAYMENT_ADDRESS || 'YOUR_SOL_ADDRESS';
      setPaymentAddress(payAddr);

      const solAmount = calculateAmount('SOL');
      const lamports = Math.round(solAmount * LAMPORTS_PER_SOL);

      // Create transaction
      const connection = new Connection(
        process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.mainnet-beta.solana.com',
        'confirmed'
      );

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(payAddr),
          lamports,
        })
      );

      // Send transaction
      const signature = await sendTransaction(transaction, connection);

      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed');
      setTxHash(signature);

      // Verify transaction
      await verifySolanaPayment(signature, payAddr, solAmount);
    } catch (err: any) {
      console.error('Solana payment error:', err);
      setError(err.message || 'Failed to process Solana payment');
    } finally {
      setLoading(false);
    }
  };

  const verifyBitcoinPayment = async (txid: string, payAddr: string, expectedSats: number) => {
    setVerifying(true);
    try {
      const res = await fetch('/api/crypto/verify-btc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txid,
          courseId,
          expectedAmount: expectedSats,
          paymentAddress: payAddr,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/learn/${courseSlug}`);
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setVerifying(false);
    }
  };

  const verifySolanaPayment = async (signature: string, payAddr: string, expectedSol: number) => {
    setVerifying(true);
    try {
      const res = await fetch('/api/crypto/verify-sol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signature,
          courseId,
          expectedAmount: expectedSol,
          paymentAddress: payAddr,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/learn/${courseSlug}`);
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setVerifying(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-xl border border-green-500/30 bg-green-900/10 p-6 text-center">
        <Check className="h-12 w-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Payment Confirmed!</h3>
        <p className="text-sm text-zinc-400 mb-4">
          You now have access to the course. Redirecting...
        </p>
        {txHash && (
          <a
            href={
              selectedCrypto === 'BTC'
                ? `https://mempool.space/tx/${txHash}`
                : `https://solscan.io/tx/${txHash}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
          >
            View transaction <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Pay with Crypto</h3>

      {/* Currency selection */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setSelectedCrypto('BTC')}
          disabled={!btcPrice || loading || verifying}
          className={`p-4 rounded-xl border transition-all ${
            selectedCrypto === 'BTC'
              ? 'border-orange-500 bg-orange-500/10'
              : 'border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Bitcoin className="h-5 w-5 text-orange-400" />
            <span className="font-semibold text-white">Bitcoin</span>
          </div>
          {btcPrice ? (
            <div className="text-xs text-zinc-400">
              {calculateAmount('BTC').toFixed(8)} BTC
              <br />({calculateSatsAmount().toLocaleString()} sats)
            </div>
          ) : (
            <div className="text-xs text-zinc-500">Loading price...</div>
          )}
        </button>

        <button
          onClick={() => setSelectedCrypto('SOL')}
          disabled={!solPrice || loading || verifying}
          className={`p-4 rounded-xl border transition-all ${
            selectedCrypto === 'SOL'
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
            <span className="font-semibold text-white">Solana</span>
          </div>
          {solPrice ? (
            <div className="text-xs text-zinc-400">
              {calculateAmount('SOL').toFixed(4)} SOL
            </div>
          ) : (
            <div className="text-xs text-zinc-500">Loading price...</div>
          )}
        </button>
      </div>

      {/* Payment button */}
      {selectedCrypto && (
        <button
          onClick={selectedCrypto === 'BTC' ? handleBitcoinPayment : handleSolanaPayment}
          disabled={loading || verifying}
          className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 px-6 py-4 text-base font-semibold text-white transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Connecting wallet...
            </>
          ) : verifying ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Verifying payment...
            </>
          ) : (
            `Pay ${calculateSatsAmount().toLocaleString()} sats with ${selectedCrypto === 'BTC' ? 'Bitcoin' : 'Solana'}`
          )}
        </button>
      )}

      {/* Error message */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-900/10 p-4 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-sm text-red-300">{error}</div>
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-zinc-500 space-y-1">
        <p>• Prices update every 30 seconds</p>
        <p>• Bitcoin payments require minimum 600 sats</p>
        <p>• Access granted after mempool confirmation</p>
      </div>
    </div>
  );
}
