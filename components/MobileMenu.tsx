"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, BookOpen, Bookmark, User, LogIn, LogOut, Users, FileText } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { SkillMintLogo } from "./Navbar";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/courses", label: "Programs", icon: BookOpen },
    { href: "/instructors", label: "Faculty", icon: Users },
    { href: "/admissions", label: "Admissions", icon: FileText },
    ...(session?.user
      ? [
          { href: "/dashboard/wishlist", label: "Saved Programs", icon: Bookmark },
          { href: "/dashboard", label: "Student Portal", icon: User },
        ]
      : []),
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-slate-600 hover:text-[#0a2540] transition-colors rounded-md hover:bg-[#fafaf9]"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0a2540]/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 w-[300px] bg-white border-l border-slate-200 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <SkillMintLogo size={30} />
              <div>
                <div className="font-serif font-bold text-[#0a2540] leading-none text-base tracking-tight">
                  SkillMint
                </div>
                <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-[#98753f] mt-0.5">
                  Online Academy
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-500 hover:text-[#0a2540] rounded-md hover:bg-[#fafaf9]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-[#f5ecd7] border border-[#e7d7b0] text-[#0a2540]"
                      : "text-slate-700 hover:text-[#0a2540] hover:bg-[#fafaf9]"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${isActive ? "text-[#98753f]" : ""}`}
                    strokeWidth={1.75}
                  />
                  <span className="text-sm font-semibold tracking-wide">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-200">
            {session?.user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2 py-2">
                  <div className="h-9 w-9 rounded-full bg-[#0a2540] border border-[#b08d57] flex items-center justify-center text-xs font-bold text-white tracking-wider">
                    {session.user.name?.[0]?.toUpperCase() || "S"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0a2540] truncate font-serif">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-slate-200 hover:border-[#b08d57] bg-white text-[#0a2540] transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-semibold tracking-wide">
                    Sign Out
                  </span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/auth/signin"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md border border-slate-200 hover:border-[#b08d57] bg-white text-[#0a2540] transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="text-sm font-semibold tracking-wide">
                    Sign In
                  </span>
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md bg-[#0a2540] hover:bg-[#123258] text-white transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm font-semibold tracking-wide">
                    Apply Now
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
