"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  Heart,
  GraduationCap,
  Users,
  ScrollText,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  price: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  link: string | null;
  createdAt: string;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function SkillMintLogo({ size = 34 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <img
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        className="object-contain"
      />
    </span>
  );
}

const NAV_LINKS = [
  { href: "/courses", label: "Programs" },
  { href: "/instructors", label: "Faculty" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(searchQuery, 250);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then((r) => r.json())
      .then((d) => setSearchResults(d.results || []))
      .catch(() => setSearchResults([]));
  }, [debouncedQuery]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((d) => {
        setNotifications(d.notifications || []);
        setUnreadCount(d.unreadCount || 0);
      })
      .catch(() => {});
  }, [session]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocus(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markNotificationsRead = async () => {
    if (unreadCount === 0) return;
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationId: "all" }),
    });
    setNotifications((n) => n.map((x) => ({ ...x, read: true })));
    setUnreadCount(0);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocus(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-[72px] items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="SkillMint home"
          >
            <SkillMintLogo size={34} />
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-base font-semibold tracking-tight text-[#0a2540]">
                SkillMint
              </span>
              <span className="text-[9px] font-semibold tracking-[0.22em] uppercase text-[#98753f]">
                Online Academy
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 shrink-0">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13.5px] font-medium text-slate-700 hover:text-[#0a2540] transition-colors"
              >
                {l.label}
              </Link>
            ))}
            {session && (
              <Link
                href="/dashboard"
                className="text-[13.5px] font-medium text-slate-700 hover:text-[#0a2540] transition-colors"
              >
                Student Portal
              </Link>
            )}
          </div>

          {/* Search (desktop) */}
          <div
            ref={searchRef}
            className="hidden md:flex flex-1 max-w-xs mx-2 relative"
          >
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                placeholder="Search programs"
                className="w-full rounded-md bg-[#fafaf9] border border-slate-200 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#0a2540]/15 transition"
              />
            </form>
            {searchFocus && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-md bg-white border border-slate-200 shadow-xl shadow-slate-900/10 overflow-hidden z-50">
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    href={`/courses/${result.slug}`}
                    onClick={() => {
                      setSearchFocus(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#fafaf9] transition-colors"
                  >
                    <img
                      src={result.thumbnail}
                      alt=""
                      className="h-9 w-14 rounded object-cover shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {result.category} · ${result.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              className="md:hidden p-2 text-slate-600 hover:text-[#0a2540] rounded-md hover:bg-slate-100"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {session ? (
              <>
                {/* Notifications */}
                <div ref={notifRef} className="relative">
                  <button
                    onClick={() => {
                      setNotifOpen(!notifOpen);
                      if (!notifOpen) markNotificationsRead();
                    }}
                    className="relative p-2 text-slate-600 hover:text-[#0a2540] transition-colors rounded-md hover:bg-slate-100"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#b08d57] flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>
                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-80 rounded-md bg-white border border-slate-200 shadow-xl shadow-slate-900/10 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#0a2540]">
                          Notifications
                        </span>
                        {unreadCount > 0 && (
                          <span className="text-[10px] font-bold tracking-wider uppercase text-[#98753f] bg-[#f5ecd7] px-2 py-0.5 rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {notifications.length === 0 ? (
                        <div className="px-4 py-10 text-center text-sm text-slate-500">
                          No notifications
                        </div>
                      ) : (
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`flex gap-3 px-4 py-3 border-b border-slate-100 last:border-b-0 ${
                                !n.read ? "bg-[#fafaf9]" : ""
                              }`}
                            >
                              <div className="h-8 w-8 rounded-md bg-[#0a2540] flex items-center justify-center shrink-0 mt-0.5">
                                <ScrollText className="h-4 w-4 text-white" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-900">
                                  {n.title}
                                </p>
                                <p className="text-xs text-slate-600 leading-snug mt-0.5 line-clamp-2">
                                  {n.message}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                  {new Date(n.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div ref={userRef} className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-full bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 text-sm transition-colors"
                  >
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt=""
                        className="h-7 w-7 rounded-full ring-2 ring-white"
                      />
                    ) : (
                      <div className="h-7 w-7 rounded-full bg-[#0a2540] flex items-center justify-center text-xs font-bold text-white ring-2 ring-white">
                        {session.user.name?.[0]?.toUpperCase() ?? "U"}
                      </div>
                    )}
                    <span className="hidden md:block font-medium text-slate-700 max-w-[120px] truncate">
                      {session.user.name?.split(" ")[0] ?? "Me"}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-60 rounded-md bg-white border border-slate-200 shadow-xl shadow-slate-900/10 py-1.5 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-[#0a2540] truncate">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {session.user.email}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-[#fafaf9] hover:text-[#0a2540] transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 text-slate-400" />
                        Student Portal
                      </Link>
                      <Link
                        href="/dashboard/wishlist"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-[#fafaf9] hover:text-[#0a2540] transition-colors"
                      >
                        <Heart className="h-4 w-4 text-slate-400" />
                        Saved Programs
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-[#fafaf9] hover:text-[#0a2540] transition-colors"
                      >
                        <User className="h-4 w-4 text-slate-400" />
                        Profile
                      </Link>
                      {session.user.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#0a2540] hover:bg-[#f5ecd7] transition-colors"
                        >
                          <Shield className="h-4 w-4" />
                          Administration
                        </Link>
                      )}
                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            signOut({ callbackUrl: "/" });
                          }}
                          className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:text-[#7a1f1f] hover:bg-rose-50 transition-colors"
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
              <div className="flex items-center gap-2.5">
                <Link
                  href="/auth/signin"
                  className="hidden sm:block text-sm font-medium text-slate-700 hover:text-[#0a2540] transition-colors px-2 py-1.5"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-[13px] font-semibold tracking-wide bg-[#0a2540] hover:bg-[#123258] text-white px-5 py-2.5 rounded-md transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              className="lg:hidden p-2 text-slate-600 hover:text-[#0a2540] rounded-md hover:bg-slate-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden pb-3" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                autoFocus
                placeholder="Search programs"
                className="w-full rounded-md bg-[#fafaf9] border border-slate-200 py-2.5 pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#0a2540]/15"
              />
            </form>
            {searchFocus && searchResults.length > 0 && (
              <div className="mt-2 rounded-md bg-white border border-slate-200 shadow-xl overflow-hidden">
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    href={`/courses/${result.slug}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchFocus(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#fafaf9] transition-colors border-b border-slate-100 last:border-0"
                  >
                    <img
                      src={result.thumbnail}
                      alt=""
                      className="h-8 w-12 rounded object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-slate-500">{result.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 space-y-1">
            <Link
              href="/courses"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-slate-700 hover:text-[#0a2540] hover:bg-[#fafaf9] rounded-md"
            >
              <BookOpen className="h-4 w-4 text-slate-400" />
              Programs
            </Link>
            <Link
              href="/instructors"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-slate-700 hover:text-[#0a2540] hover:bg-[#fafaf9] rounded-md"
            >
              <Users className="h-4 w-4 text-slate-400" />
              Faculty
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-slate-700 hover:text-[#0a2540] hover:bg-[#fafaf9] rounded-md"
            >
              <GraduationCap className="h-4 w-4 text-slate-400" />
              About
            </Link>
            {session ? (
              <>
                <div className="border-t border-slate-100 mt-3 pt-3">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-slate-700 hover:text-[#0a2540] hover:bg-[#fafaf9] rounded-md"
                  >
                    <LayoutDashboard className="h-4 w-4 text-slate-400" />
                    Student Portal
                  </Link>
                  <Link
                    href="/dashboard/wishlist"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-slate-700 hover:text-[#0a2540] hover:bg-[#fafaf9] rounded-md"
                  >
                    <Heart className="h-4 w-4 text-slate-400" />
                    Saved Programs
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-slate-700 hover:text-[#0a2540] hover:bg-[#fafaf9] rounded-md"
                  >
                    <User className="h-4 w-4 text-slate-400" />
                    Profile
                  </Link>
                  {session.user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-[#0a2540] hover:bg-[#f5ecd7] rounded-md"
                    >
                      <Shield className="h-4 w-4" />
                      Administration
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex w-full items-center gap-3 px-3 py-3 text-sm font-medium text-slate-600 hover:text-[#7a1f1f] hover:bg-rose-50 rounded-md"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-slate-100 mt-3 pt-3 space-y-1">
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3 text-sm font-medium text-slate-700 hover:text-[#0a2540] hover:bg-[#fafaf9] rounded-md"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3 text-sm font-semibold text-white bg-[#0a2540] hover:bg-[#123258] rounded-md text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
