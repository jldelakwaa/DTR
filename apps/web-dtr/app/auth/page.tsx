"use client";

import { getSupabaseBrowserClient } from "@dtr/shared";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "signIn" | "signUp";

type AuthSession = {
  user: {
    email?: string | null;
  };
} | null;

type FormState = {
  email: string;
  password: string;
};

export default function AuthPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [session, setSession] = useState<AuthSession>(null);
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    void supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        setSession((data.session as AuthSession) ?? null);
        setLoading(false);
      })
      .catch((authError: unknown) => {
        if (!active) return;
        setError(
          authError instanceof Error
            ? authError.message
            : "Failed to read your session.",
        );
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession((nextSession as AuthSession) ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [router, session]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");
    setStatus("");

    try {
      if (mode === "signIn") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (signInError) {
          setError(signInError.message);
          return;
        }

        setStatus("Welcome back. Redirecting to dashboard...");
        router.replace("/dashboard");
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session) {
        setStatus("Account created. Redirecting to dashboard...");
        router.replace("/dashboard");
      } else {
        setStatus("Account created. Check your email, then sign in.");
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong while signing in.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 text-zinc-200">
        Connecting to Supabase...
      </main>
    );
  }

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

          <section className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-6">
            <div className="rounded-2xl border border-white/10 bg-[#0c1320]/90 p-6">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
                    Authentication
                  </p>
                  <h2 className="text-2xl font-semibold text-white">
                    {mode === "signIn" ? "Sign in" : "Create account"}
                  </h2>
                </div>

                <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signIn");
                      setError("");
                      setStatus("");
                    }}
                    className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                      mode === "signIn"
                        ? "bg-white text-slate-950"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signUp");
                      setError("");
                      setStatus("");
                    }}
                    className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                      mode === "signUp"
                        ? "bg-white text-slate-950"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    Sign up
                  </button>
                </div>

                <label className="block space-y-2">
                  <span className="text-sm text-zinc-300">Email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-300/60 focus:bg-white/[0.08]"
                    placeholder="employee@company.com"
                    required
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm text-zinc-300">Password</span>
                  <input
                    type="password"
                    autoComplete={
                      mode === "signIn" ? "current-password" : "new-password"
                    }
                    value={form.password}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-300/60 focus:bg-white/[0.08]"
                    placeholder="••••••••"
                    required
                  />
                </label>

                {error ? (
                  <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                    {error}
                  </div>
                ) : null}

                {status ? (
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                    {status}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-slate-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? "Working..."
                    : mode === "signIn"
                      ? "Sign in"
                      : "Create account"}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
