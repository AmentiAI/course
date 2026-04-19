export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-slate-200 bg-slate-50/50 px-4 py-14 animate-pulse">
        <div className="mx-auto max-w-7xl">
          <div className="h-3 bg-slate-200 rounded w-48 mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              <div className="flex gap-2">
                <div className="h-6 bg-slate-200 rounded-full w-28" />
                <div className="h-6 bg-slate-200 rounded-full w-20" />
              </div>
              <div className="h-12 bg-slate-200 rounded w-5/6" />
              <div className="h-5 bg-slate-200 rounded w-full" />
              <div className="h-5 bg-slate-200 rounded w-3/4" />
            </div>
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                <div className="aspect-video bg-slate-100" />
                <div className="p-6 space-y-4">
                  <div className="h-10 bg-slate-200 rounded w-1/2" />
                  <div className="h-11 bg-slate-200 rounded" />
                  <div className="h-10 bg-slate-200 rounded" />
                  <div className="space-y-2 pt-2">
                    <div className="h-3 bg-slate-200 rounded" />
                    <div className="h-3 bg-slate-200 rounded" />
                    <div className="h-3 bg-slate-200 rounded w-2/3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-64 mb-4" />
        <div className="rounded-2xl border border-slate-200 p-6 space-y-3">
          <div className="h-4 bg-slate-200 rounded" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
          <div className="h-4 bg-slate-200 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}
