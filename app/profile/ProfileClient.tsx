"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function ProfileClient({ referralUrl }: { referralUrl: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="w-full flex items-center justify-center gap-2 rounded-md border border-[#b08d57] bg-white hover:bg-[#f5ecd7] px-4 py-2.5 text-sm font-semibold tracking-wide text-[#0a2540] transition-colors"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-[#14532d]" />
          <span className="text-[#14532d]">Copied to Clipboard</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy Referral Link
        </>
      )}
    </button>
  );
}
