export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-slate-200 bg-slate-50/50 px-4 py-12">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-3 bg-slate-200 rounded w-28 mb-3" />
          <div className="h-9 bg-slate-200 rounded w-72 mb-3" />
          <div className="h-4 bg-slate-200 rounded w-80" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0 animate-pulse">
            <div className="rounded-2xl bg-slate-100 h-[28rem]" />
          </aside>

          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-slate-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                    <div className="h-5 bg-slate-200 rounded" />
                    <div className="h-4 bg-slate-200 rounded w-5/6" />
                    <div className="flex justify-between items-center pt-3">
                      <div className="h-6 bg-slate-200 rounded w-14" />
                      <div className="h-7 bg-slate-200 rounded-full w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
