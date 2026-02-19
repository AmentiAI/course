"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Compass, User } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/wishlist", label: "Saved", icon: BookOpen },
  { href: "/courses", label: "Explore", icon: Compass },
  { href: "/profile", label: "Profile", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-zinc-800 bg-[#09090b]/95 backdrop-blur-md">
      <div className="flex items-center justify-around py-2 px-2 safe-area-pb">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors min-w-[60px] ${
                isActive
                  ? "text-purple-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "text-purple-400" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
