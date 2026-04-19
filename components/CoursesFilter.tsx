"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  "Web3 & Crypto",
  "Marketing & Social",
  "E-Commerce",
  "Tech & Development",
  "Tech & AI",
  "Finance & Investing",
  "Business",
  "Productivity & Tools",
];

const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

const SORTS = [
  { label: "Most Popular", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

interface Props {
  current: {
    q?: string;
    category?: string;
    level?: string;
    sort?: string;
  };
  mobile?: boolean;
  sortOnly?: boolean;
}

export default function CoursesFilter({ current, mobile, sortOnly }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/courses?${params.toString()}`);
  };

  const selectClass =
    "rounded-md border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 focus:border-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#0a2540]/15";

  if (sortOnly) {
    return (
      <select
        value={current.sort || "popular"}
        onChange={(e) => updateFilter("sort", e.target.value)}
        className={selectClass}
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    );
  }

  if (mobile) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        <select
          value={current.category || "all"}
          onChange={(e) => updateFilter("category", e.target.value)}
          className={`shrink-0 ${selectClass}`}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={current.level || "all"}
          onChange={(e) => updateFilter("level", e.target.value)}
          className={`shrink-0 ${selectClass}`}
        >
          <option value="all">All Levels</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l.charAt(0) + l.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <select
          value={current.sort || "popular"}
          onChange={(e) => updateFilter("sort", e.target.value)}
          className={`shrink-0 ${selectClass}`}
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  const optionClass = (active: boolean) =>
    `block w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
      active
        ? "bg-[#f5ecd7] text-[#0a2540] font-semibold border-l-2 border-[#b08d57] pl-2.5"
        : "text-slate-600 hover:text-[#0a2540] hover:bg-[#fafaf9]"
    }`;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-7">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <SlidersHorizontal className="h-4 w-4 text-[#98753f]" />
        <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0a2540]">
          Refine Catalog
        </span>
      </div>

      <div>
        <h3 className="text-[10px] font-bold text-[#98753f] uppercase tracking-[0.18em] mb-3">
          Category
        </h3>
        <div className="space-y-0.5">
          <button
            onClick={() => updateFilter("category", undefined)}
            className={optionClass(!current.category)}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => updateFilter("category", cat)}
              className={optionClass(current.category === cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-bold text-[#98753f] uppercase tracking-[0.18em] mb-3">
          Level
        </h3>
        <div className="space-y-0.5">
          <button
            onClick={() => updateFilter("level", undefined)}
            className={optionClass(!current.level)}
          >
            All Levels
          </button>
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => updateFilter("level", lvl)}
              className={optionClass(current.level === lvl)}
            >
              {lvl.charAt(0) + lvl.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
          Sort By
        </h3>
        <div className="space-y-0.5">
          {SORTS.map((s) => (
            <button
              key={s.value}
              onClick={() => updateFilter("sort", s.value)}
              className={optionClass((current.sort || "popular") === s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
