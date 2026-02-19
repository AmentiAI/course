"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Zap, Mail, Lock, ArrowRight } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleConfigured, setGoogleConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/google-status")
      .then((r) => r.json())
      .then((d) => setGoogleConfigured(d.configured))
      .catch(() => setGoogleConfigured(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push(redirect);
    }
  };

  const handleGoogle = async () => {
    if (!googleConfigured) {
      setError("Google sign-in isn't configured yet — please use email & password for now.");
      return;
    }
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: redirect });
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-9 w-9 rounded-xl bg-purple-600 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Skill<span className="text-purple-400">Mint</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-zinc-500 text-sm">Sign in to continue learning</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
          {/* Google Sign In */}
          <div className="relative group">
            <button
              onClick={handleGoogle}
              disabled={googleLoading || googleConfigured === false}
              title={googleConfigured === false ? "Google sign-in coming soon — use email & password" : ""}
              className={`w-full flex items-center justify-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all mb-6 ${
                googleConfigured === false
                  ? "border-zinc-800 bg-zinc-900 text-zinc-600 cursor-not-allowed"
                  : "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white disabled:opacity-50"
              }`}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill={googleConfigured === false ? "#555" : "#4285F4"}
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill={googleConfigured === false ? "#555" : "#34A853"}
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill={googleConfigured === false ? "#555" : "#FBBC05"}
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill={googleConfigured === false ? "#555" : "#EA4335"}
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {googleLoading
                ? "Connecting..."
                : googleConfigured === false
                ? "Google Sign-in (Coming Soon)"
                : "Continue with Google"}
            </button>
            {googleConfigured === false && (
              <p className="text-xs text-zinc-600 text-center -mt-4 mb-4">
                Use email & password below
              </p>
            )}
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-zinc-900 px-3 text-zinc-600">or sign in with email</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl bg-zinc-800 border border-zinc-700 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-zinc-800 border border-zinc-700 py-3 pl-10 pr-10 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPass ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-3 text-sm font-semibold text-white transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-purple-500/20"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b]" />}>
      <SignInForm />
    </Suspense>
  );
}
