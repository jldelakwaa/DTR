type DashboardNextStepsProps = {
  error?: string;
};

const nextSteps = [
  "Add attendance records to Supabase.",
  "Protect employee and admin routes.",
  "Add profile and role tables.",
  "Build the mobile app on the same auth flow.",
];

export function DashboardNextSteps({ error }: DashboardNextStepsProps) {
  return (
    <aside className="space-y-4">
      <section className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
        <p className="text-sm font-bold uppercase text-emerald-300">
          Next steps
        </p>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-200">
          {nextSteps.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 size-1.5 rounded-full bg-blue-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}
    </aside>
  );
}
