export default function Loading() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header skeleton */}
        <div className="mb-12 animate-pulse">
          <div className="h-8 bg-zinc-800 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-zinc-800 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content skeleton */}
          <div className="lg:col-span-2 space-y-4 animate-pulse">
            <div className="aspect-video bg-zinc-800 rounded-xl"></div>
            <div className="h-6 bg-zinc-800 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-zinc-800 rounded"></div>
              <div className="h-4 bg-zinc-800 rounded"></div>
              <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="animate-pulse">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
              <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
              <div className="h-10 bg-zinc-800 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-zinc-800 rounded"></div>
                <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
