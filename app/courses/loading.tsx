export default function Loading() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header skeleton */}
        <div className="mb-12 animate-pulse">
          <div className="h-10 bg-zinc-800 rounded w-64 mb-4"></div>
          <div className="h-4 bg-zinc-800 rounded w-96"></div>
        </div>

        {/* Filters skeleton */}
        <div className="mb-8 flex gap-4 animate-pulse">
          <div className="h-10 bg-zinc-800 rounded w-32"></div>
          <div className="h-10 bg-zinc-800 rounded w-32"></div>
          <div className="h-10 bg-zinc-800 rounded w-32"></div>
        </div>

        {/* Course grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden animate-pulse">
              <div className="aspect-video bg-zinc-800"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
                <div className="h-4 bg-zinc-800 rounded"></div>
                <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-zinc-800 rounded w-16"></div>
                  <div className="h-8 bg-zinc-800 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
