"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bookmark, Compass, User } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Portal", icon: Home },
  { href: "/dashboard/wishlist", label: "Saved", icon: Bookmark },
  { href: "/courses", label: "Catalog", icon: Compass },
  { href: "/profile", label: "Account", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-slate-200 bg-white">
      <div className="flex items-center justify-around py-2 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-md transition-colors min-w-[60px] ${
                isActive ? "text-[#0a2540]" : "text-slate-500 hover:text-[#0a2540]"
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${isActive ? "text-[#98753f]" : ""}`}
                strokeWidth={1.75}
              />
              <span
                className={`text-[10px] font-bold tracking-[0.12em] uppercase ${
                  isActive ? "text-[#0a2540]" : ""
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
