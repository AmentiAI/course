"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
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
  Heart,
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
  const debouncedQuery = useDebounce(searchQuery, 250);

  // Search autocomplete
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

  // Notifications
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

  // Close menus on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocus(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
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
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-[#09090b]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 group-hover:bg-purple-500 transition-colors">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Skill<span className="text-purple-400">Mint</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
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

          {/* Search Bar (desktop) */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-sm mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                placeholder="Search courses..."
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 py-2 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </form>
            {/* Autocomplete dropdown */}
            {searchFocus && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden z-50">
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    href={`/courses/${result.slug}`}
                    onClick={() => {
                      setSearchFocus(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition-colors"
                  >
                    <img
                      src={result.thumbnail}
                      alt=""
                      className="h-8 w-12 rounded object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm text-white truncate">{result.title}</p>
                      <p className="text-xs text-zinc-500">{result.category} · ${result.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile search toggle */}
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setSearchOpen(!searchOpen)}
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
                    className="relative p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>
                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-80 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="text-xs text-purple-400">{unreadCount} new</span>
                        )}
                      </div>
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-sm text-zinc-600">
                          No notifications yet
                        </div>
                      ) : (
                        <div className="max-h-72 overflow-y-auto">
                          {notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`flex gap-3 px-4 py-3 border-b border-zinc-800/50 last:border-b-0 ${
                                !n.read ? "bg-purple-900/10" : ""
                              }`}
                            >
                              <div className="h-7 w-7 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                <Zap className="h-3.5 w-3.5 text-purple-400" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-white">{n.title}</p>
                                <p className="text-xs text-zinc-500 leading-snug mt-0.5 line-clamp-2">
                                  {n.message}
                                </p>
                                <p className="text-xs text-zinc-700 mt-1">
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
                        href="/dashboard/wishlist"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        Wishlist
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
          <div className="md:hidden pb-3" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                autoFocus
                placeholder="Search courses..."
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 py-2 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
              />
            </form>
            {searchFocus && searchResults.length > 0 && (
              <div className="mt-1.5 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden">
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    href={`/courses/${result.slug}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchFocus(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition-colors border-b border-zinc-800/50 last:border-0"
                  >
                    <img
                      src={result.thumbnail}
                      alt=""
                      className="h-8 w-12 rounded object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm text-white truncate">{result.title}</p>
                      <p className="text-xs text-zinc-500">{result.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile slide-out menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-zinc-800 py-3 space-y-1">
            <Link
              href="/courses"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg"
            >
              <BookOpen className="h-4 w-4 text-zinc-500" />
              Browse Courses
            </Link>
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg"
                >
                  <LayoutDashboard className="h-4 w-4 text-zinc-500" />
                  My Dashboard
                </Link>
                <Link
                  href="/dashboard/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg"
                >
                  <Heart className="h-4 w-4 text-zinc-500" />
                  Wishlist
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg"
                >
                  <User className="h-4 w-4 text-zinc-500" />
                  Profile
                </Link>
                {session.user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-purple-400 hover:bg-zinc-800 rounded-lg"
                  >
                    <Shield className="h-4 w-4" />
                    Admin Panel
                  </Link>
                )}
                <div className="border-t border-zinc-800 mt-2 pt-2">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm text-purple-400 hover:bg-zinc-800 rounded-lg font-medium"
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
