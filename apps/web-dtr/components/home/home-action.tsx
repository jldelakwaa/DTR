import Link from "next/link";

import { cn } from "@/lib/utils";

type HomeActionProps = {
  href: string;
  label: string;
  compact?: boolean;
  variant?: "primary" | "secondary";
  loading?: boolean;
};

export function HomeAction({
  href,
  label,
  compact = false,
  variant = "primary",
  loading = false,
}: HomeActionProps) {
  const variantClassName =
    variant === "primary"
      ? "bg-blue-600 text-white shadow-lg shadow-blue-950/20 hover:bg-blue-700"
      : "border border-slate-200 bg-white text-slate-950 hover:border-blue-200 hover:bg-blue-50";

  return (
    <Link
      href={href}
      aria-busy={loading}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300",
        compact ? "h-9 px-4 text-xs" : "h-11 px-5 text-sm",
        variantClassName,
        loading && "pointer-events-none cursor-wait opacity-70",
      )}
    >
      {label}
    </Link>
  );
}
