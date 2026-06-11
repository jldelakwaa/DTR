const summaryItems = [
  { label: "Today", value: "0 / 1", helper: "Attendance logs" },
  { label: "Status", value: "Ready", helper: "Waiting for time in" },
  { label: "Role", value: "Employee", helper: "Standard access" },
];

export function DashboardSummaryCards() {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {summaryItems.map((item) => (
        <article
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-xs font-bold uppercase text-blue-600">
            {item.label}
          </p>
          <p className="mt-3 text-2xl font-bold text-slate-950">
            {item.value}
          </p>
          <p className="mt-1 text-sm text-slate-500">{item.helper}</p>
        </article>
      ))}
    </section>
  );
}
