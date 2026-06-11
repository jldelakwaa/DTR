"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type HomeNavProps = {
  actions: (options: { compact: boolean }) => ReactNode;
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 56;

export function HomeNav({ actions }: HomeNavProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateNavState = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateNavState);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-white/10 bg-slate-950/95 shadow-xl shadow-slate-950/15 backdrop-blur"
          : "border-white/10 bg-slate-950",
      )}
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 transition-all duration-300 lg:px-10",
          isScrolled ? "h-16" : "h-28",
        )}
      >
        <HomeLogo compact={isScrolled} />

        <div className="hidden items-center gap-8 text-sm font-medium text-white md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative py-2 transition after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-center after:rounded-full after:bg-blue-300 after:transition-transform after:duration-200 hover:text-blue-100 hover:after:scale-x-100",
                pathname === item.href
                  ? "text-blue-300 after:scale-x-100"
                  : "text-white after:scale-x-0",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2">
          {actions({ compact: isScrolled })}
        </div>
      </div>
    </nav>
  );
}

type HomeLogoProps = {
  compact: boolean;
};

function HomeLogo({ compact }: HomeLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span
        className={cn(
          "grid place-items-center bg-blue-600 font-black tracking-tight text-white shadow-lg shadow-blue-950/20 transition-all duration-300",
          compact ? "size-9 rounded-xl text-xs" : "size-14 rounded-2xl text-base",
        )}
      >
        D
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "font-bold tracking-tight text-white transition-all duration-300",
            compact ? "text-base" : "text-xl",
          )}
        >
          DTR
        </span>
        {!compact ? (
          <span className="hidden text-xs font-medium text-blue-100 sm:block">
            Daily Time Record
          </span>
        ) : null}
      </span>
    </Link>
  );
}
