import type { ReactNode } from "react";

type HomeShellProps = {
  action: ReactNode;
};

export function HomeShell({ action }: HomeShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#28405f_0%,_#0c111b_40%,_#060910_100%)] text-zinc-50">
      <nav className="flex items-center justify-end p-6">{action}</nav>
    </main>
  );
}
