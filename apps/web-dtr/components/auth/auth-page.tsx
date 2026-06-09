"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AuthForm } from "./auth-form";
import { AuthShell } from "./auth-shell";
import { useAuthSession } from "./use-auth-session";

export function AuthPage() {
  const router = useRouter();
  const { loading, session } = useAuthSession();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [router, session]);

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 text-zinc-200">
        Connecting to Supabase...
      </main>
    );
  }

  return (
    <AuthShell>
      <AuthForm />
    </AuthShell>
  );
}
