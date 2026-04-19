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
              A modern online academy delivering structured, career-focused
              education taught by expert practitioners.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
              <Mail className="h-4 w-4 text-[#98753f]" />
              <a
                href="mailto:admissions@skillmint.courses"
                className="hover:text-[#0a2540] transition-colors"
              >
                admissions@skillmint.courses
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-4">
              Academics
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/courses" className="hover:text-[#0a2540] transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/bundles" className="hover:text-[#0a2540] transition-colors">
                  Curricula
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="hover:text-[#0a2540] transition-colors">
                  Faculty
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-4">
              Admissions
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/admissions" className="hover:text-[#0a2540] transition-colors">
                  How to Apply
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="hover:text-[#0a2540] transition-colors">
                  Enroll
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-[#0a2540] transition-colors">
                  Start Dates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-4">
              Student Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/dashboard" className="hover:text-[#0a2540] transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="hover:text-[#0a2540] transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@skillmint.courses"
                  className="hover:text-[#0a2540] transition-colors"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540] mb-4">
              Institution
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
            &copy; {new Date().getFullYear()} SkillMint Online Academy. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            SkillMint.Courses &middot; Educational content &middot; Not financial advice
          </p>
        </div>
      </div>
    </footer>
  );
}
