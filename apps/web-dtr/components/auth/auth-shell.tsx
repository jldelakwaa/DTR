import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#2a3b52_0%,_#0c111b_35%,_#070b12_100%)] text-zinc-50">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-10 lg:px-10">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <section className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
              Auth
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Sign in to continue to your DTR dashboard.
              </h1>
              <p className="max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
                Use email and password for now. Once you’re in, the dashboard
                page will take over.
              </p>
            </div>
          </section>

          {children}
        </div>
      </div>
    </main>
  );
}
