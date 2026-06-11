"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
  "/auth": "Login",
  "/register": "Register",
  "/dashboard": "Dashboard",
};

export function PageBreadcrumb() {
  const pathname = usePathname();
  const currentPage = routeLabels[pathname] ?? "Page";

  return (
    <nav aria-label="Breadcrumb" className="flex">
      <div className="inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
        <Link href="/" className="text-blue-700 transition hover:text-blue-800">
          DTR
        </Link>
        <span className="mx-2 text-slate-300">/</span>
        <span>{currentPage}</span>
      </div>
    </nav>
  );
}
