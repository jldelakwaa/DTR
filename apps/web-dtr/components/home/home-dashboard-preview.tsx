const stats = [
  { label: "Today", value: "Ready" },
  { label: "Status", value: "Secure" },
  { label: "Access", value: "Web" },
];

export function HomeDashboardPreview() {
  return (
    <div className="rounded-[2rem] border border-white bg-white p-4 shadow-2xl shadow-blue-950/10">
      <div className="rounded-[1.5rem] border border-slate-100 bg-slate-950 p-5 text-white">
        <DashboardPreviewHeader />
        <DashboardPreviewStats />
        <DashboardPreviewActions />
      </div>
    </div>
  );
}

function DashboardPreviewHeader() {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-5">
      <div>
        <p className="text-sm font-medium text-blue-200">Dashboard</p>
        <h2 className="mt-1 text-2xl font-semibold">Welcome back</h2>
      </div>
      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-medium text-emerald-200">
        Online
      </span>
    </div>
  );
}

function DashboardPreviewStats() {
  return (
    <div className="grid gap-3 py-5 sm:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <p className="text-xs font-medium uppercase text-blue-200">
            {item.label}
          </p>
          <p className="mt-2 text-lg font-semibold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function DashboardPreviewActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        className="rounded-2xl bg-emerald-500 p-5 text-left text-slate-950 transition hover:bg-emerald-400"
      >
        <span className="text-sm font-semibold">Time In</span>
        <span className="mt-2 block text-sm text-emerald-950">
          Start today&apos;s record.
        </span>
      </button>
      <button
        type="button"
        className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
      >
        <span className="text-sm font-semibold">Time Out</span>
        <span className="mt-2 block text-sm text-zinc-300">
          End your shift cleanly.
        </span>
      </button>
    </div>
  );
}
