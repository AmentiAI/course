"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Shield,
  User,
  Menu,
  X,
  Zap,
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-[#09090b]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 group-hover:bg-purple-500 transition-colors">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Skill<span className="text-purple-400">Mint</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/courses"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Browse Courses
            </Link>
            {session && (
              <Link
                href="/dashboard"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                My Learning
              </Link>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-6">
            <form
              action="/courses"
              method="get"
              className="relative w-full"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                name="q"
                placeholder="Search courses..."
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 py-2 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </form>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Mobile search toggle */}
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </button>

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden md:flex relative p-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <Bell className="h-5 w-5" />
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-1.5 text-sm hover:border-zinc-600 transition-colors"
                  >
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt=""
                        className="h-6 w-6 rounded-full"
                      />
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">
                        {session.user.name?.[0]?.toUpperCase() ?? "U"}
                      </div>
                    )}
                    <span className="hidden md:block text-zinc-300 max-w-[120px] truncate">
                      {session.user.name?.split(" ")[0] ?? "Me"}
                    </span>
                    <ChevronDown className="h-3 w-3 text-zinc-500" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl py-1 z-50">
                      <div className="px-4 py-2 border-b border-zinc-800">
                        <p className="text-sm font-medium text-white truncate">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                          {session.user.email}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                      {session.user.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-purple-400 hover:bg-zinc-800 transition-colors"
                        >
                          <Shield className="h-4 w-4" />
                          Admin Panel
                        </Link>
                      )}
                      <div className="border-t border-zinc-800 mt-1">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            signOut({ callbackUrl: "/" });
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/signin"
                  className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-sm bg-purple-600 hover:bg-purple-500 text-white px-4 py-1.5 rounded-lg transition-colors font-medium"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <form action="/courses" method="get" className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                name="q"
                placeholder="Search courses..."
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 py-2 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
              />
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-zinc-800 py-3 space-y-1">
            <Link
              href="/courses"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg"
            >
              Browse Courses
            </Link>
            {session && (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg"
              >
                My Learning
              </Link>
            )}
            {!session && (
              <>
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm text-purple-400 hover:bg-zinc-800 rounded-lg font-medium"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
