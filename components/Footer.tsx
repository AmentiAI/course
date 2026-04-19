import Link from "next/link";
import { GraduationCap, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#fafaf9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="inline-flex items-center justify-center rounded-md bg-[#0a2540]"
                style={{ width: 34, height: 34 }}
                aria-hidden
              >
                <GraduationCap
                  className="text-white"
                  style={{ width: 18, height: 18 }}
                  strokeWidth={2.25}
                />
              </span>
              <span className="text-lg font-semibold tracking-tight text-[#0a2540]">
                SkillMint
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
              Self-paced online courses across Web2 and Web3 — AI, trading,
              e-commerce, marketing, development, and more.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
              <Mail className="h-4 w-4 text-[#98753f]" />
              <a
                href="mailto:hello@skillmint.online"
                className="hover:text-[#0a2540] transition-colors"
              >
                hello@skillmint.online
              </a>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://x.com/SkillMintLearn"
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label="Follow SkillMint on X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-[#0a2540] hover:border-[#b08d57] hover:text-[#98753f] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-4">
              Learn
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/courses" className="hover:text-[#0a2540] transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/bundles" className="hover:text-[#0a2540] transition-colors">
                  Bundles
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="hover:text-[#0a2540] transition-colors">
                  Instructors
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-4">
              Get Started
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/auth/signup" className="hover:text-[#0a2540] transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#0a2540] transition-colors">
                  Browse Courses
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/dashboard" className="hover:text-[#0a2540] transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="hover:text-[#0a2540] transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@skillmint.online"
                  className="hover:text-[#0a2540] transition-colors"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-[#0a2540] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#0a2540] transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#0a2540] transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} SkillMint. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            SkillMint.Online &middot; Educational content &middot; Not financial advice
          </p>
        </div>
      </div>
    </footer>
  );
}
