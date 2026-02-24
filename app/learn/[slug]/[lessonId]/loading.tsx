export default function Loading() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="animate-pulse">
          {/* Breadcrumb skeleton */}
          <div className="h-4 bg-zinc-800 rounded w-64 mb-8"></div>

          {/* Title skeleton */}
          <div className="h-8 bg-zinc-800 rounded w-3/4 mb-6"></div>

          {/* Content skeleton */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 mb-6">
            <div className="space-y-4">
              <div className="h-4 bg-zinc-800 rounded"></div>
              <div className="h-4 bg-zinc-800 rounded"></div>
              <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
              <div className="h-32 bg-zinc-800 rounded mt-6"></div>
              <div className="h-4 bg-zinc-800 rounded"></div>
              <div className="h-4 bg-zinc-800 rounded w-4/5"></div>
            </div>
          </div>

          {/* Navigation buttons skeleton */}
          <div className="flex gap-4">
            <div className="h-12 bg-zinc-800 rounded flex-1"></div>
            <div className="h-12 bg-zinc-800 rounded flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
