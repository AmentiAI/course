"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, GraduationCap, Mail, Lock, ArrowRight } from "lucide-react";

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

    const res = await signIn("credentials", { email, password, redirect: false });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push(redirect);
    }
  };

  const handleGoogle = async () => {
    if (!googleConfigured) {
      setError("Google sign-in isn't configured yet — please use email & password.");
      return;
    }
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: redirect });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 hero-backdrop" />

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-10 group">
            <div className="h-10 w-10 rounded-md bg-[#0a2540] flex items-center justify-center border border-[#b08d57]/40 group-hover:scale-105 transition-transform">
              <GraduationCap className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-serif text-xl font-bold text-[#0a2540] tracking-tight">
                SkillMint
              </span>
              <span className="text-[9px] font-semibold tracking-[0.22em] uppercase text-[#98753f]">
                Online Academy
              </span>
            </div>
          </Link>
          <p className="academic-label mb-3">Student Portal</p>
          <h1 className="font-serif text-4xl font-bold text-[#0a2540] tracking-tight mb-3">
            Student Sign In.
          </h1>
          <p className="text-slate-600 text-[15px] leading-relaxed">
            Access your programs, coursework, and credentials.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-8">
          <button
            onClick={handleGoogle}
            disabled={googleLoading || googleConfigured === false}
            title={googleConfigured === false ? "Google sign-in coming soon" : ""}
            className={`w-full flex items-center justify-center gap-3 rounded-md border px-4 py-3 text-sm font-semibold transition-all mb-6 ${
              googleConfigured === false
                ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                : "border-slate-200 bg-white hover:bg-[#fafaf9] text-slate-700 hover:border-[#b08d57] disabled:opacity-50"
            }`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill={googleConfigured === false ? "#cbd5e1" : "#4285F4"} d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill={googleConfigured === false ? "#cbd5e1" : "#34A853"} d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill={googleConfigured === false ? "#cbd5e1" : "#FBBC05"} d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill={googleConfigured === false ? "#cbd5e1" : "#EA4335"} d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {googleLoading
              ? "Connecting…"
              : googleConfigured === false
              ? "Google sign-in coming soon"
              : "Continue with Google"}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-[#98753f] font-bold uppercase tracking-[0.22em] text-[10px]">
                or with Email
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-[#0a2540] mb-2 uppercase tracking-[0.18em]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="student@example.com"
                  className="w-full rounded-md bg-white border border-slate-200 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#0a2540]/15 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#0a2540] mb-2 uppercase tracking-[0.18em]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-md bg-white border border-slate-200 py-3 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#0a2540]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0a2540]"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-4 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? "Signing in…" : "Sign In to Portal"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-600 mt-6">
          New to SkillMint?{" "}
          <Link
            href="/auth/signup"
            className="text-[#98753f] hover:text-[#0a2540] font-semibold transition-colors"
          >
            Create a Student Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SignInForm />
    </Suspense>
  );
}
