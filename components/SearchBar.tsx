"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  thumbnail: string;
  price: number;
  category: string;
  level: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchCourses = async () => {
      if (query.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.courses || []);
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchCourses, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleResultClick = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/courses/${slug}`);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses..."
          className="w-full pl-10 pr-10 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-zinc-500 text-sm">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((course) => (
                <button
                  key={course.id}
                  onClick={() => handleResultClick(course.slug)}
                  className="w-full flex gap-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors text-left"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-12 rounded object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white mb-0.5 line-clamp-1">
                      {course.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span>{course.category}</span>
                      <span>•</span>
                      <span>${course.price}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-zinc-500 text-sm">
              No courses found for &quot;{query}&quot;
            </div>
          ) : null}

          {results.length > 0 && (
            <div className="border-t border-zinc-800 p-2">
              <Link
                href={`/courses?search=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="block w-full text-center text-sm text-purple-400 hover:text-purple-300 py-2"
              >
                View all results →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
