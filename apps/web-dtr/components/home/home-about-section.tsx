export function HomeAboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-y border-slate-200 bg-white"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-16 lg:grid-cols-3 lg:px-10">
        <div>
          <p className="text-sm font-bold uppercase text-blue-600">About</p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal">
            Built for daily attendance work.
          </h2>
        </div>
        <div className="lg:col-span-2">
          <p className="text-lg leading-8 text-slate-600">
            DTR is being shaped as a practical employee timekeeping system:
            simple login, clear time-in and time-out actions, attendance
            records, admin review, and future mobile support.
          </p>
        </div>
      </div>
    </section>
  );
}
