"use client";

import { getSupabaseBrowserClient } from "@dtr/shared";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthSession } from "@/components/auth/use-auth-session";
import { PageBreadcrumb } from "@/components/navigation/page-breadcrumb";

import { AttendanceActions } from "./attendance-actions";
import { DashboardHeader } from "./dashboard-header";
import { DashboardNav } from "./dashboard-nav";
import { DashboardNextSteps } from "./dashboard-next-steps";
import { DashboardShell } from "./dashboard-shell";
import { DashboardSummaryCards } from "./dashboard-summary-cards";

export function DashboardPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const { loading, session } = useAuthSession();
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/auth");
    }
  }, [loading, router, session]);

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
      <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-600">
        Loading dashboard...
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardShell>
      <DashboardNav signingOut={signingOut} onSignOut={handleSignOut} />
      <PageBreadcrumb />
      <DashboardHeader userEmail={session.user.email ?? "Your account"} />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <DashboardSummaryCards />
          <AttendanceActions />
        </div>

        <DashboardNextSteps error={error} />
      </section>
    </DashboardShell>
  );
}
