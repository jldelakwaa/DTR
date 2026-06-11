type DashboardHeaderProps = {
  userEmail: string;
};

export function DashboardHeader({ userEmail }: DashboardHeaderProps) {
  return (
    <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold uppercase text-blue-600">Dashboard</p>
      <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Signed in as <span className="font-semibold">{userEmail}</span>
      </p>
    </header>
  );
}
