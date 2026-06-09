"use client";

import { getSupabaseBrowserClient } from "@dtr/shared";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AuthSession = {
  user: {
    email?: string | null;
  };
} | null;

export default function DashboardPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [session, setSession] = useState<AuthSession>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    void supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        const nextSession = (data.session as AuthSession) ?? null;
        setSession(nextSession);
        setLoading(false);

        if (!nextSession) {
          router.replace("/auth");
        }
      })
      .catch((authError: unknown) => {
        if (!active) return;
        setError(
          authError instanceof Error
            ? authError.message
            : "Failed to read your session.",
        );
        setLoading(false);
        router.replace("/auth");
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      const normalized = (nextSession as AuthSession) ?? null;
      setSession(normalized);
      setLoading(false);

      if (!normalized) {
        router.replace("/auth");
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  const handleSignOut = async () => {
    setSigningOut(true);
    setError("");

    try {
      const { error: signOutError } = await supabase.auth.signOut({
        scope: "local",
      });

      if (signOutError) {
        setError(signOutError.message);
        return;
      }

      router.replace("/");
    } catch (signOutException) {
      setError(
        signOutException instanceof Error
          ? signOutException.message
          : "Something went wrong while signing out.",
      );
    } finally {
      setSigningOut(false);
    }
  };

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 text-zinc-200">
        Loading dashboard...
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#24354e_0%,_#0b1019_40%,_#060910_100%)] text-zinc-50">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 lg:px-10">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
              Dashboard
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white">
              Welcome back
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </header>

        <section className="grid flex-1 gap-6 py-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur-xl">
              <p className="text-sm text-cyan-200">Signed in as</p>
              <p className="mt-2 text-xl font-medium text-white">
                {session.user.email ?? "Your account"}
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                Auth is working. This is where employee tools, attendance logs,
                and admin data will eventually live.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Today", value: "0 / 1" },
                { label: "Status", value: "Ready" },
                { label: "Role", value: "Employee" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="text-xs uppercase tracking-[0.24em] text-cyan-300">
                    {item.label}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-left transition hover:bg-cyan-400/15"
              >
                <div className="text-sm font-medium text-cyan-100">Time In</div>
                <div className="mt-1 text-sm text-cyan-50/80">
                  Start your attendance log for today.
                </div>
              </button>

              <button
                type="button"
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
              >
                <div className="text-sm font-medium text-white">Time Out</div>
                <div className="mt-1 text-sm text-zinc-300">
                  Close your session when the day ends.
                </div>
              </button>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur-xl">
              <div className="text-sm uppercase tracking-[0.28em] text-cyan-300">
                Next steps
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-300">
                <li>• Add attendance records to Supabase.</li>
                <li>• Protect employee/admin routes.</li>
                <li>• Add profile and roles tables.</li>
                <li>• Build the mobile app on the same auth flow.</li>
              </ul>
            </div>

            {error ? (
              <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            ) : null}
          </aside>
        </section>
      </div>
    </main>
  );
}
