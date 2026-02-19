"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  "Web3 & Crypto",
  "AI & Automation",
  "Trading",
  "E-Commerce",
  "Social Media",
  "Freelancing",
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

  if (sortOnly) {
    return (
      <select
        value={current.sort || "popular"}
        onChange={(e) => updateFilter("sort", e.target.value)}
        className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 focus:border-purple-500 focus:outline-none"
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
      <div className="flex gap-2 overflow-x-auto pb-1">
        <select
          value={current.category || "all"}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="shrink-0 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 focus:border-purple-500 focus:outline-none"
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
          className="shrink-0 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 focus:border-purple-500 focus:outline-none"
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
          className="shrink-0 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 focus:border-purple-500 focus:outline-none"
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

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-6">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-zinc-400" />
        <span className="text-sm font-semibold text-white">Filters</span>
      </div>

      {/* Category */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
          Category
        </h3>
        <div className="space-y-1.5">
          <button
            onClick={() => updateFilter("category", undefined)}
            className={`block w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${
              !current.category
                ? "bg-purple-600/20 text-purple-300"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => updateFilter("category", cat)}
              className={`block w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${
                current.category === cat
                  ? "bg-purple-600/20 text-purple-300"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Level */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
          Level
        </h3>
        <div className="space-y-1.5">
          <button
            onClick={() => updateFilter("level", undefined)}
            className={`block w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${
              !current.level
                ? "bg-purple-600/20 text-purple-300"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            All Levels
          </button>
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => updateFilter("level", lvl)}
              className={`block w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${
                current.level === lvl
                  ? "bg-purple-600/20 text-purple-300"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {lvl.charAt(0) + lvl.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
          Sort By
        </h3>
        <div className="space-y-1.5">
          {SORTS.map((s) => (
            <button
              key={s.value}
              onClick={() => updateFilter("sort", s.value)}
              className={`block w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${
                (current.sort || "popular") === s.value
                  ? "bg-purple-600/20 text-purple-300"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
