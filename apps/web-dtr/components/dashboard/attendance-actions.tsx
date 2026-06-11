const attendanceActions = [
  {
    title: "Time In",
    description: "Start your attendance record for today.",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-950 hover:bg-emerald-100",
  },
  {
    title: "Time Out",
    description: "Close your attendance record when your shift ends.",
    className: "border-slate-200 bg-white text-slate-950 hover:bg-blue-50",
  },
];

export function AttendanceActions() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold uppercase text-blue-600">Attendance</p>
        <h2 className="text-2xl font-bold tracking-normal text-slate-950">
          Daily actions
        </h2>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {attendanceActions.map((item) => (
          <button
            key={item.title}
            type="button"
            className={`rounded-2xl border p-5 text-left transition ${item.className}`}
          >
            <span className="text-base font-bold">{item.title}</span>
            <span className="mt-2 block text-sm leading-6 opacity-80">
              {item.description}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
