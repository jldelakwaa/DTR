import Link from "next/link";

const highlights = [
  {
    title: "Employee attendance",
    description: "Time in, time out, and daily logs in one place.",
  },
  {
    title: "Admin control",
    description: "Manage people, permissions, and reports cleanly.",
  },
  {
    title: "Mobile ready",
    description: "The same backend will power Expo later.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#28405f_0%,_#0c111b_40%,_#060910_100%)] text-zinc-50">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-10 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <section className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
              DTR web app
            </div>

            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Attendance and access, built for web now and mobile later.
              </h1>
              <p className="max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
                Start with a clean login flow, move into a simple dashboard
                after sign-in, and grow into employee and admin tools without
                changing the backend shape.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-slate-950 transition hover:bg-zinc-200"
              >
                Login / Sign up
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Go to dashboard
              </Link>
            </div>
          </section>

          <section className="grid gap-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur-xl"
              >
                <div className="text-sm font-medium text-cyan-200">
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {item.description}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
