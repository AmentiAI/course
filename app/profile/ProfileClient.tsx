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
      className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 text-sm text-zinc-300 hover:text-white transition-all"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-400" />
          <span className="text-green-400">Copied!</span>
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
