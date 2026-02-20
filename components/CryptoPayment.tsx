'use client';

import { useState, useEffect } from 'react';
import { Bitcoin, Loader2, Check, AlertCircle, ExternalLink, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLaserEyes } from '@omnisat/lasereyes';

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
  const [txHash, setTxHash] = useState<string>('');
  const [showWalletPicker, setShowWalletPicker] = useState(false);

  // Bitcoin wallet hooks
  const { connect: connectBTC, address: btcAddress, sendBTC, connected: btcConnected } = useLaserEyes();

  // Fetch crypto prices
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
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

  const calculateSatsAmount = (): number => {
    if (!btcPrice) return 0;
    const btcAmount = coursePrice / btcPrice;
    return Math.ceil(btcAmount * 100000000);
  };

  const calculateSolAmount = (): number => {
    if (!solPrice) return 0;
    return coursePrice / solPrice;
  };

  const handleConnectWallet = async (walletType: string) => {
    setLoading(true);
    setError(null);
    setShowWalletPicker(false);

    try {
      await connectBTC(walletType as any);
      setLoading(false);
    } catch (err: any) {
      console.error('Wallet connection error:', err);
      setError(err.message || 'Failed to connect wallet');
      setLoading(false);
    }
  };

  const handleBitcoinPayment = async () => {
    // If not connected, show wallet picker
    if (!btcConnected) {
      setShowWalletPicker(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const paymentAddress = process.env.NEXT_PUBLIC_BTC_PAYMENT_ADDRESS!;
      const satsAmount = calculateSatsAmount();

      if (satsAmount < 600) {
        setError('Payment amount too small. Minimum 600 sats required.');
        setLoading(false);
        return;
      }

      // Send BTC transaction
      const txid = await sendBTC(paymentAddress, satsAmount);
      console.log('Bitcoin transaction sent:', txid);
      setTxHash(txid);

      // Start verification
      await verifyBitcoinPayment(txid, paymentAddress, satsAmount);
    } catch (err: any) {
      console.error('Bitcoin payment error:', err);
      if (err.message?.includes('User rejected')) {
        setError('Transaction cancelled');
      } else {
        setError(err.message || 'Failed to process Bitcoin payment');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSolanaPayment = async () => {
    setError('Solana wallet integration coming soon. Please use Bitcoin for now.');
  };

  const verifyBitcoinPayment = async (txid: string, payAddr: string, expectedSats: number) => {
    setVerifying(true);
    setError(null);
    
    // Poll for confirmation with exponential backoff
    const maxAttempts = 20;
    let attempt = 0;
    
    const verify = async (): Promise<boolean> => {
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

        if (res.ok) {
          setSuccess(true);
          setTimeout(() => {
            router.push(`/learn/${courseSlug}`);
          }, 2000);
          return true;
        } else if (data.error?.includes('not found')) {
          // Transaction not in mempool yet, retry
          return false;
        } else {
          // Real error
          throw new Error(data.error || 'Verification failed');
        }
      } catch (err: any) {
        if (attempt < maxAttempts - 1) {
          return false; // Will retry
        }
        throw err;
      }
    };

    while (attempt < maxAttempts) {
      try {
        const verified = await verify();
        if (verified) {
          setVerifying(false);
          return;
        }
        
        // Wait before retry (exponential backoff: 2s, 4s, 8s, 16s, 30s max)
        const delay = Math.min(2000 * Math.pow(2, attempt), 30000);
        await new Promise(resolve => setTimeout(resolve, delay));
        attempt++;
      } catch (err: any) {
        setError(err.message);
        setVerifying(false);
        return;
      }
    }

    setError('Transaction verification timeout. Please contact support with your transaction ID: ' + txid);
    setVerifying(false);
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
            href={`https://mempool.space/tx/${txHash}`}
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

  const wallets = [
    { id: 'unisat', name: 'Unisat Wallet', icon: '🟠' },
    { id: 'xverse', name: 'Xverse', icon: '⚡' },
    { id: 'leather', name: 'Leather (Hiro)', icon: '🟤' },
    { id: 'okx', name: 'OKX Wallet', icon: '⚫' },
    { id: 'magiceden', name: 'Magic Eden', icon: '🔮' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Pay with Crypto</h3>

      {/* Live price display */}
      {btcPrice && (
        <div className="text-xs text-zinc-500 mb-2">
          Live price: 1 BTC = ${btcPrice.toLocaleString()} USD
        </div>
      )}

      {/* Wallet picker modal */}
      {showWalletPicker && (
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Choose Bitcoin Wallet
          </h4>
          <div className="space-y-2">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleConnectWallet(wallet.id)}
                disabled={loading}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 hover:border-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-2xl">{wallet.icon}</span>
                <span className="text-sm font-medium text-white">{wallet.name}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowWalletPicker(false)}
            className="mt-3 text-xs text-zinc-500 hover:text-zinc-300 w-full text-center"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Currency selection */}
      {!showWalletPicker && (
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
                {(coursePrice / btcPrice).toFixed(6)} BTC
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
                {calculateSolAmount().toFixed(4)} SOL
                <div className="text-zinc-600 text-[10px] mt-1">Coming soon</div>
              </div>
            ) : (
              <div className="text-xs text-zinc-500">Loading price...</div>
            )}
          </button>
        </div>
      )}

      {/* Wallet status */}
      {!showWalletPicker && selectedCrypto === 'BTC' && btcConnected && btcAddress && (
        <div className="text-xs text-green-400 flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg p-2">
          <Check className="h-3 w-3" />
          Wallet connected: {btcAddress.slice(0, 6)}...{btcAddress.slice(-4)}
        </div>
      )}

      {/* Payment button */}
      {!showWalletPicker && selectedCrypto === 'BTC' && (
        <button
          onClick={handleBitcoinPayment}
          disabled={loading || verifying}
          className="w-full rounded-xl bg-orange-600 hover:bg-orange-500 disabled:bg-orange-800 px-6 py-4 text-base font-semibold text-white transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {btcConnected ? 'Processing payment...' : 'Connecting...'}
            </>
          ) : verifying ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Verifying on blockchain...
            </>
          ) : btcConnected ? (
            <>
              <Bitcoin className="h-5 w-5" />
              Pay {calculateSatsAmount().toLocaleString()} sats
            </>
          ) : (
            <>
              <Wallet className="h-5 w-5" />
              Connect Bitcoin Wallet
            </>
          )}
        </button>
      )}

      {!showWalletPicker && selectedCrypto === 'SOL' && (
        <button
          onClick={handleSolanaPayment}
          disabled={true}
          className="w-full rounded-xl bg-purple-600/50 px-6 py-4 text-base font-semibold text-white cursor-not-allowed flex items-center justify-center gap-2"
        >
          Solana coming soon - Use Bitcoin
        </button>
      )}

      {/* Error message */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-900/10 p-4 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-sm text-red-300">{error}</div>
        </div>
      )}

      {/* Transaction pending */}
      {verifying && txHash && (
        <div className="rounded-lg border border-yellow-500/30 bg-yellow-900/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Loader2 className="h-4 w-4 text-yellow-400 animate-spin" />
            <span className="text-sm font-medium text-yellow-300">Waiting for confirmation...</span>
          </div>
          <p className="text-xs text-zinc-400 mb-2">
            This usually takes 1-2 minutes. Don't close this page.
          </p>
          <a
            href={`https://mempool.space/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
          >
            Track on mempool.space <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}

      {/* Info */}
      {!showWalletPicker && (
        <div className="text-xs text-zinc-500 space-y-1 bg-zinc-800/30 rounded-lg p-3">
          <p className="font-medium text-zinc-400 mb-2">How it works:</p>
          <p>1. Click "Connect Bitcoin Wallet"</p>
          <p>2. Choose your wallet (Unisat, Xverse, etc.)</p>
          <p>3. Sign the transaction in your wallet</p>
          <p>4. Wait 1-2 minutes for confirmation</p>
          <p>5. Instant access to the course!</p>
          <p className="text-zinc-600 mt-2">• Minimum: 600 sats • Prices update every 30s</p>
        </div>
      )}
    </div>
  );
}
