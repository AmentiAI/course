"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Bitcoin,
  Copy,
  Check,
  ChevronRight,
  Shield,
  Clock,
  BookOpen,
  ExternalLink,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  shortDesc: string;
  thumbnail: string;
  price: number;
  originalPrice?: number | null;
  slug: string;
  totalLessons: number;
  totalHours: number;
  level: string;
}

interface Props {
  course: Course;
  btcAddress: string;
  solAddress: string;
}

type PaymentTab = "crypto" | "card";
type Chain = "SOL" | "BTC";

export default function CheckoutClient({ course, btcAddress, solAddress }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<PaymentTab>("crypto");
  const [chain, setChain] = useState<Chain>("SOL");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [prices, setPrices] = useState<{ BTC: number; SOL: number }>({
    BTC: 0,
    SOL: 0,
  });

  useEffect(() => {
    // Fetch live crypto prices from Kraken
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.kraken.com/0/public/Ticker?pair=XBTUSD,SOLUSD"
        );
        const data = await res.json();
        const btcPrice = parseFloat(data.result?.XXBTZUSD?.c?.[0] || "0");
        const solPrice = parseFloat(data.result?.SOLUSD?.c?.[0] || "0");
        if (btcPrice > 0 && solPrice > 0) {
          setPrices({ BTC: btcPrice, SOL: solPrice });
        }
      } catch {
        // Fallback prices
        setPrices({ BTC: 95000, SOL: 180 });
      }
    };
    fetchPrices();
  }, []);

  const solAmount =
    prices.SOL > 0 ? (course.price / prices.SOL).toFixed(4) : "...";
  const btcAmount =
    prices.BTC > 0 ? (course.price / prices.BTC).toFixed(6) : "...";

  const currentAddress = chain === "SOL" ? solAddress : btcAddress;
  const currentAmount = chain === "SOL" ? solAmount : btcAmount;

  const copyAddress = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleVerify = async () => {
    if (!txHash.trim()) {
      setError("Please paste your transaction hash");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify-crypto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          txHash: txHash.trim(),
          chain,
          amountCrypto: currentAmount,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push(`/learn/${course.slug}`), 2000);
      } else {
        setError(data.error || "Verification failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">You&apos;re Enrolled!</h2>
          <p className="text-zinc-400 mb-6">
            Payment confirmed. Redirecting to your course...
          </p>
          <Link
            href={`/learn/${course.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition-all"
          >
            Start Learning Now
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/courses/${course.slug}`} className="text-sm text-zinc-500 hover:text-zinc-300 mb-3 inline-block">
            ← Back to course
          </Link>
          <h1 className="text-2xl font-bold text-white">Complete Your Purchase</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Payment Section */}
          <div className="lg:col-span-3">
            {/* Tab Selector */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTab("crypto")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all ${
                  tab === "crypto"
                    ? "bg-purple-600/20 border-purple-500 text-purple-300"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                }`}
              >
                <span className="text-base">◎₿</span>
                Crypto Payment
              </button>
              <button
                onClick={() => setTab("card")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all ${
                  tab === "card"
                    ? "bg-purple-600/20 border-purple-500 text-purple-300"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                }`}
              >
                <CreditCard className="h-4 w-4" />
                Card Payment
              </button>
            </div>

            {tab === "crypto" ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-lg font-semibold text-white mb-5">
                  Pay with Crypto
                </h2>

                {/* Chain Selector */}
                <div className="flex gap-2 mb-6">
                  {(["SOL", "BTC"] as Chain[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setChain(c)}
                      className={`flex-1 rounded-xl border py-2.5 text-sm font-medium transition-all ${
                        chain === c
                          ? "bg-purple-600/20 border-purple-500 text-purple-300"
                          : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                      }`}
                    >
                      {c === "SOL" ? "◎ Solana" : "₿ Bitcoin"}
                    </button>
                  ))}
                </div>

                {/* Amount to send */}
                <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4 mb-5">
                  <p className="text-xs text-zinc-500 mb-1">Amount to send</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-amber-400">
                      {currentAmount} {chain}
                    </span>
                    <span className="text-sm text-zinc-500">≈ ${course.price} USD</span>
                  </div>
                  {prices.SOL > 0 && (
                    <p className="text-xs text-zinc-600 mt-1">
                      Live price: 1 {chain} ={" "}
                      ${chain === "SOL" ? prices.SOL.toFixed(2) : prices.BTC.toFixed(0)} USD
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs text-zinc-500">
                      Send {chain} to this address:
                    </p>
                    <a
                      href={
                        chain === "SOL"
                          ? `https://explorer.solana.com/address/${solAddress}`
                          : `https://mempool.space/address/${btcAddress}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-600 hover:text-zinc-400 flex items-center gap-1"
                    >
                      View <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded-xl bg-zinc-800 border border-zinc-700 px-3 py-2.5 text-xs text-zinc-300 font-mono break-all">
                      {currentAddress}
                    </code>
                    <button
                      onClick={() => copyAddress(currentAddress, "addr")}
                      className="shrink-0 p-2.5 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition-colors"
                    >
                      {copied === "addr" ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4 text-zinc-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Steps */}
                <div className="rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-4 mb-5 text-sm text-zinc-400 space-y-2">
                  <p className="font-medium text-zinc-300">How to pay:</p>
                  <p>1. Send exactly <span className="text-amber-400 font-mono">{currentAmount} {chain}</span> to the address above</p>
                  <p>2. Copy your transaction hash from your wallet</p>
                  <p>3. Paste it below and click Verify Payment</p>
                  <p className="text-xs text-zinc-600">Allow 1-2 minutes for the transaction to confirm on-chain</p>
                </div>

                {/* TX Hash Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                    Transaction Hash (tx ID)
                  </label>
                  <input
                    type="text"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    placeholder={
                      chain === "SOL"
                        ? "5KyP8...abc123"
                        : "a1b2c3d4...abc"
                    }
                    className="w-full rounded-xl bg-zinc-800 border border-zinc-700 py-3 px-4 text-sm text-zinc-200 placeholder-zinc-600 font-mono focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400 mb-4">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleVerify}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-5 py-3.5 font-semibold text-white transition-all disabled:opacity-50"
                >
                  {loading ? "Verifying on-chain..." : "Verify Payment & Enroll"}
                  {!loading && <ChevronRight className="h-4 w-4" />}
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-lg font-semibold text-white mb-5">
                  Pay with Card
                </h2>
                <div className="rounded-xl bg-zinc-800 border border-dashed border-zinc-600 p-8 text-center">
                  <CreditCard className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                  <p className="text-zinc-400 font-medium mb-1">Stripe integration</p>
                  <p className="text-sm text-zinc-600">
                    Card payments are available. Configure your Stripe keys in the environment variables to enable card checkout.
                  </p>
                  <p className="mt-4 text-sm text-purple-400">
                    Use crypto payment to get started instantly! ◎
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden sticky top-20">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full aspect-video object-cover"
              />
              <div className="p-5">
                <h3 className="font-semibold text-white mb-1 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
                  {course.shortDesc}
                </p>

                {/* Course Meta */}
                <div className="space-y-2 mb-5 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 text-zinc-500" />
                    {course.totalLessons} lessons
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-zinc-500" />
                    {course.totalHours} hours content
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5 text-zinc-500" />
                    Lifetime access
                  </div>
                </div>

                {/* Price */}
                <div className="border-t border-zinc-800 pt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-zinc-500">Course price</span>
                    <span className="text-sm text-zinc-300">${course.price}</span>
                  </div>
                  {course.originalPrice && (
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-zinc-500">Discount</span>
                      <span className="text-sm text-green-400">
                        -${(course.originalPrice - course.price).toFixed(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-zinc-800">
                    <span className="font-semibold text-white">Total</span>
                    <span className="text-xl font-bold text-amber-400">
                      ${course.price}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-zinc-600 text-center flex items-center justify-center gap-1">
                  <Shield className="h-3 w-3" />
                  Secure payment · Instant access
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
