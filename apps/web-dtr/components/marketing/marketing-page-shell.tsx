"use client";

import type { ReactNode } from "react";

import { useAuthSession } from "@/components/auth/use-auth-session";
import { HomeAction } from "@/components/home/home-action";
import { HomeNav } from "@/components/home/home-nav";
import { PageBreadcrumb } from "@/components/navigation/page-breadcrumb";

type MarketingPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function MarketingPageShell({
  eyebrow,
  title,
  description,
  children,
}: MarketingPageShellProps) {
  const { loading, session } = useAuthSession();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <HomeNav
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

      <section className="bg-[linear-gradient(135deg,_#ffffff_0%,_#eff6ff_48%,_#dbeafe_100%)] px-6 pb-16 pt-44 lg:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <PageBreadcrumb />

          <p className="mt-8 text-sm font-bold uppercase text-blue-600">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {description}
          </p>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto w-full max-w-5xl">{children}</div>
      </section>
    </main>
  );
}
