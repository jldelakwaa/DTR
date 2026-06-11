"use client";

import { useAuthSession } from "@/components/auth/use-auth-session";

import { HomeAction } from "./home-action";
import { HomeShell } from "./home-shell";

export function HomePage() {
  const { loading, session } = useAuthSession();

  return (
    <HomeShell
      actions={({ compact }) =>
        session ? (
          <HomeAction
            href="/dashboard"
            label={loading ? "Checking..." : "Dashboard"}
            compact={compact}
            loading={loading}
          />
        ) : (
          <>
            <HomeAction
              href="/auth"
              label={loading ? "Checking..." : "Login"}
              compact={compact}
              variant="secondary"
              loading={loading}
            />
            <HomeAction href="/register" label="Register" compact={compact} />
          </>
        )
      }
    />
  );
}
