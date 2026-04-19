'use client';

import { useState, useEffect } from 'react';
import { Bitcoin, Loader2, Check, AlertCircle, ExternalLink, Wallet, CreditCard, ShieldCheck, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLaserEyes } from '@omnisat/lasereyes';

interface PaymentOptionsProps {
  courseId: string;
  coursePrice: number;
  courseSlug: string;
}

type PaymentMethod = 'paypal' | 'bitcoin';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
const PAYPAL_ENABLED = PAYPAL_CLIENT_ID.length > 0;

export default function PaymentOptions({
  courseId,
  coursePrice,
  courseSlug,
}: PaymentOptionsProps) {
  const router = useRouter();
  const [method, setMethod] = useState<PaymentMethod>('paypal');
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  const [showWalletPicker, setShowWalletPicker] = useState(false);

  const { connect: connectBTC, address: btcAddress, sendBTC, connected: btcConnected } = useLaserEyes();

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
    } catch (err) {
      console.error('Failed to fetch prices:', err);
    }
  };

  const calculateSatsAmount = (): number => {
    if (!btcPrice) return 0;
    const btcAmount = coursePrice / btcPrice;
    return Math.ceil(btcAmount * 100000000);
  };

  const handleConnectWallet = async (walletType: string) => {
    setLoading(true);
    setError(null);
    setShowWalletPicker(false);

    try {
      await connectBTC(walletType as any);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      setLoading(false);
    }
  };

  const handleBitcoinPayment = async () => {
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

      const txid = await sendBTC(paymentAddress, satsAmount);
      setTxHash(txid);
      await verifyBitcoinPayment(txid, paymentAddress, satsAmount);
    } catch (err: any) {
      if (err.message?.includes('User rejected')) {
        setError('Transaction cancelled');
      } else {
        setError(err.message || 'Failed to process Bitcoin payment');
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyBitcoinPayment = async (txid: string, payAddr: string, expectedSats: number) => {
    setVerifying(true);
    setError(null);

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
          setTimeout(() => router.push(`/learn/${courseSlug}`), 2000);
          return true;
        } else if (data.error?.includes('not found')) {
          return false;
        } else {
          throw new Error(data.error || 'Verification failed');
        }
      } catch (err: any) {
        if (attempt < maxAttempts - 1) return false;
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
        const delay = Math.min(2000 * Math.pow(2, attempt), 30000);
        await new Promise((resolve) => setTimeout(resolve, delay));
        attempt++;
      } catch (err: any) {
        setError(err.message);
        setVerifying(false);
        return;
      }
    }
    setError('Verification timeout. Contact support with transaction ID: ' + txid);
    setVerifying(false);
  };

  // PayPal flow — creates order via server route, then captures after approval.
  const handlePayPalCheckout = async () => {
    if (!PAYPAL_ENABLED) {
      setError('PayPal is not yet configured. Add your PayPal credentials to enable card payments.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create PayPal order');

      // In a real integration this would hand off to the PayPal hosted approval URL,
      // or render the PayPal Buttons SDK. For the stub we redirect to approval URL.
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        throw new Error('Missing PayPal approval URL');
      }
    } catch (err: any) {
      setError(err.message || 'PayPal checkout failed');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] p-7 text-center">
        <div className="h-12 w-12 rounded-full bg-[#dcfce7] border border-[#bbf7d0] flex items-center justify-center mx-auto mb-4">
          <Check className="h-6 w-6 text-[#14532d]" strokeWidth={3} />
        </div>
        <h3 className="font-serif text-xl font-bold text-[#0a2540] mb-1 tracking-tight">Payment Confirmed.</h3>
        <p className="text-sm text-slate-600 mb-4">
          Enrollment is complete. Redirecting to the Student Portal...
        </p>
        {txHash && (
          <a
            href={`https://mempool.space/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#98753f] hover:text-[#0a2540]"
          >
            View transaction <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    );
  }

  const wallets = [
    { id: 'unisat', name: 'Unisat Wallet' },
    { id: 'xverse', name: 'Xverse' },
    { id: 'leather', name: 'Leather (Hiro)' },
    { id: 'okx', name: 'OKX Wallet' },
    { id: 'magiceden', name: 'Magic Eden' },
  ];

  return (
    <div className="space-y-6">
      {/* Method toggle */}
      <div className="grid grid-cols-2 gap-2 rounded-md bg-[#fafaf9] border border-slate-200 p-1">
        <button
          onClick={() => setMethod('paypal')}
          className={`flex items-center justify-center gap-2 rounded py-2.5 text-sm font-semibold tracking-wide transition-all ${
            method === 'paypal'
              ? 'bg-white text-[#0a2540] border border-slate-200'
              : 'text-slate-600 hover:text-[#0a2540]'
          }`}
        >
          <CreditCard className="h-4 w-4" />
          PayPal / Card
        </button>
        <button
          onClick={() => setMethod('bitcoin')}
          className={`flex items-center justify-center gap-2 rounded py-2.5 text-sm font-semibold tracking-wide transition-all ${
            method === 'bitcoin'
              ? 'bg-white text-[#0a2540] border border-slate-200'
              : 'text-slate-600 hover:text-[#0a2540]'
          }`}
        >
          <Bitcoin className="h-4 w-4 text-orange-500" />
          Bitcoin
        </button>
      </div>

      {method === 'paypal' && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-md border border-slate-200 bg-white p-4">
            <div className="h-10 w-10 rounded-md bg-[#0070ba]/10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0070ba">
                <path d="M7.076 21.337H2.47a.64.64 0 0 1-.633-.74L4.944 1.52A.78.78 0 0 1 5.72.85h7.632c2.423 0 4.388.7 5.48 1.99 1.05 1.24 1.4 2.925.994 4.913-.04.196-.087.394-.14.594-1.103 4.225-4.156 5.694-8.006 5.694h-1.68a.94.94 0 0 0-.94.74l-1.08 6.842a.56.56 0 0 1-.55.465H7.076z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0a2540]">Pay with PayPal or card</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Secure checkout through PayPal. Supports all major credit and debit cards.
              </p>
            </div>
          </div>

          {!PAYPAL_ENABLED && (
            <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">PayPal integration pending setup</p>
                <p className="leading-relaxed">
                  Add <code className="bg-amber-100 px-1 py-0.5 rounded">NEXT_PUBLIC_PAYPAL_CLIENT_ID</code>,{' '}
                  <code className="bg-amber-100 px-1 py-0.5 rounded">PAYPAL_CLIENT_ID</code>, and{' '}
                  <code className="bg-amber-100 px-1 py-0.5 rounded">PAYPAL_SECRET</code> to your{' '}
                  <code className="bg-amber-100 px-1 py-0.5 rounded">.env</code> file to activate.
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handlePayPalCheckout}
            disabled={loading || !PAYPAL_ENABLED}
            className="w-full rounded-md bg-[#ffc439] hover:bg-[#f0b92f] disabled:bg-slate-200 disabled:text-slate-400 px-6 py-4 text-sm font-bold text-slate-900 transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting to PayPal...
              </>
            ) : (
              <>
                Continue with{' '}
                <svg viewBox="0 0 100 26" className="h-5" fill="currentColor">
                  <text x="0" y="20" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22">
                    <tspan fill="#253B80">Pay</tspan>
                    <tspan fill="#179BD7">Pal</tspan>
                  </text>
                </svg>
              </>
            )}
          </button>

          <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#14532d]" />
            Secured by PayPal &middot; Buyer protection included
          </p>
        </div>
      )}

      {method === 'bitcoin' && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-md border border-slate-200 bg-white p-4">
            <div className="h-10 w-10 rounded-md bg-orange-50 flex items-center justify-center shrink-0">
              <Bitcoin className="h-5 w-5 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0a2540]">Pay with Bitcoin</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {btcPrice ? (
                  <>
                    Live price: 1 BTC = ${btcPrice.toLocaleString()} USD &middot;{' '}
                    <span className="font-medium text-slate-700">
                      {calculateSatsAmount().toLocaleString()} sats required
                    </span>
                  </>
                ) : (
                  'Fetching live price...'
                )}
              </p>
            </div>
          </div>

          {showWalletPicker && (
            <div className="rounded-md border border-slate-200 bg-white p-4 space-y-1.5">
              <h4 className="text-sm font-bold text-[#0a2540] mb-2 flex items-center gap-2">
                <Wallet className="h-4 w-4 text-[#98753f]" /> Choose a Bitcoin wallet
              </h4>
              {wallets.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleConnectWallet(wallet.id)}
                  disabled={loading}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-md border border-slate-200 hover:border-[#b08d57] hover:bg-[#f5ecd7] transition-all disabled:opacity-50 text-sm font-medium text-slate-800"
                >
                  <span>{wallet.name}</span>
                  <span className="text-xs text-[#98753f]">Connect →</span>
                </button>
              ))}
              <button
                onClick={() => setShowWalletPicker(false)}
                className="mt-2 text-xs text-slate-500 hover:text-[#0a2540] w-full text-center pt-2 border-t border-slate-100"
              >
                Cancel
              </button>
            </div>
          )}

          {btcConnected && btcAddress && !showWalletPicker && (
            <div className="text-xs text-[#14532d] flex items-center gap-2 bg-[#dcfce7] border border-[#bbf7d0] rounded-md p-3">
              <Check className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                Connected: <span className="font-mono">{btcAddress.slice(0, 8)}...{btcAddress.slice(-6)}</span>
              </span>
            </div>
          )}

          {!showWalletPicker && (
            <button
              onClick={handleBitcoinPayment}
              disabled={loading || verifying || !btcPrice}
              className="w-full rounded-md bg-[#0a2540] hover:bg-[#123258] disabled:bg-slate-300 disabled:text-slate-500 px-6 py-4 text-sm font-semibold tracking-wide text-white transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {btcConnected ? 'Processing...' : 'Connecting...'}
                </>
              ) : verifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying on blockchain...
                </>
              ) : btcConnected ? (
                <>
                  <Bitcoin className="h-4 w-4" />
                  Pay {calculateSatsAmount().toLocaleString()} sats
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4" />
                  Connect Bitcoin wallet
                </>
              )}
            </button>
          )}

          {verifying && txHash && (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <Loader2 className="h-4 w-4 text-amber-700 animate-spin" />
                <span className="text-sm font-semibold text-amber-900">Waiting for confirmation</span>
              </div>
              <p className="text-xs text-amber-800">
                This usually takes 1–2 minutes. Don&apos;t close this page.
              </p>
              <a
                href={`https://mempool.space/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#98753f] hover:text-[#0a2540]"
              >
                Track on mempool.space <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-md bg-rose-50 border border-rose-200 p-3.5">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
          <p className="text-sm text-rose-800 leading-relaxed">{error}</p>
        </div>
      )}
    </div>
  );
}
