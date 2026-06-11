import Link from "next/link";

import { PageBreadcrumb } from "@/components/navigation/page-breadcrumb";

import { HomeDashboardPreview } from "./home-dashboard-preview";

export function HomeHero() {
  return (
    <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-6 pb-14 pt-40 lg:grid-cols-[1fr_0.9fr] lg:px-10">
      <div className="max-w-3xl space-y-8">
        <PageBreadcrumb />

        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
          <span className="size-2 rounded-full bg-emerald-500" />
          Attendance dashboard
        </div>

        <div className="space-y-5">
          <h1 className="text-5xl font-bold leading-tight tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
            DTR
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Track daily time records with a clear employee dashboard, simple
            access, and a clean system ready for attendance history, reports,
            and admin tools.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/register"
            className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-700"
          >
            Create account
          </Link>
          <a
            href="#about"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-950 transition hover:border-blue-200 hover:bg-blue-50"
          >
            View details
          </a>
        </div>
      </div>

      <HomeDashboardPreview />
    </div>
  );
}
