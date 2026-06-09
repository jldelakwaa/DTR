"use client";

import { Button } from "@/components/ui/button";
import { getSupabaseBrowserClient } from "@dtr/shared";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { AuthModeToggle } from "./auth-mode-toggle";

type AuthMode = "signIn" | "signUp";

type FormState = {
  email: string;
  password: string;
};

export function AuthForm() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetMessages = () => {
    setError("");
    setStatus("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);
    resetMessages();

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

  return (
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

          <AuthModeToggle
            mode={mode}
            onChange={setMode}
            onReset={resetMessages}
          />

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
              autoComplete={mode === "signIn" ? "current-password" : "new-password"}
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

          <Button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-slate-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Working..."
              : mode === "signIn"
                ? "Sign in"
                : "Create account"}
          </Button>
        </form>
      </div>
    </section>
  );
}
