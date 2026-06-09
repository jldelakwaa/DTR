import Link from "next/link";

type HomeActionProps = {
  href: string;
  label: string;
  loading?: boolean;
};

export function HomeAction({ href, label, loading = false }: HomeActionProps) {
  return (
    <Link
      href={href}
      aria-busy={loading}
      className={`inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-slate-950 transition ${
        loading
          ? "pointer-events-none cursor-wait opacity-70"
          : "hover:bg-zinc-200"
      }`}
    >
      {label}
    </Link>
  );
}
