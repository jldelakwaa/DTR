"use client";

import { useAuthSession } from "@/components/auth/use-auth-session";

import { HomeAction } from "./home-action";
import { HomeShell } from "./home-shell";

export function HomePage() {
  const { loading, session } = useAuthSession();

  const actionHref = session ? "/dashboard" : "/auth";
  const actionLabel = loading
    ? "Checking session..."
    : session
      ? "Go to dashboard"
      : "Login / Sign up";

  return (
    <HomeShell
      action={
        <HomeAction href={actionHref} label={actionLabel} loading={loading} />
      }
    />
  );
}
