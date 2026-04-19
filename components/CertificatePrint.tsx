"use client";

import { Printer } from "lucide-react";

export default function CertificatePrint() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 rounded-md bg-[#0a2540] hover:bg-[#123258] px-5 py-2.5 text-sm font-semibold tracking-wide text-white transition-colors"
    >
      <Printer className="h-4 w-4" />
      Print or Save PDF
    </button>
  );
}
