import Link from "next/link";

type DashboardNavProps = {
  signingOut: boolean;
  onSignOut: () => void;
};

export function DashboardNav({ signingOut, onSignOut }: DashboardNavProps) {
  return (
    <nav className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <Link href="/" className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-blue-600 text-xs font-black text-white shadow-sm">
          D
        </span>
        <span>
          <span className="block text-base font-bold text-slate-950">DTR</span>
          <span className="block text-xs font-medium text-slate-500">
            Dashboard
          </span>
        </span>
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:border-blue-200 hover:bg-blue-50"
        >
          Home
        </Link>
        <button
          type="button"
          onClick={onSignOut}
          disabled={signingOut}
          className="inline-flex h-10 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {signingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </nav>
  );
}
