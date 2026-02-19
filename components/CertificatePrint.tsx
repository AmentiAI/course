"use client";

import { Printer } from "lucide-react";

export default function CertificatePrint() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-5 py-2.5 text-sm font-medium text-white transition-all"
    >
      <Printer className="h-4 w-4" />
      Print / Save PDF
    </button>
  );
}
