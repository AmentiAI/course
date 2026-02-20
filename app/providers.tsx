"use client";

import { SessionProvider } from "next-auth/react";
import WalletProvider from "@/lib/WalletProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WalletProvider>
        {children}
      </WalletProvider>
    </SessionProvider>
  );
}
