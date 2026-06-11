import type { ReactNode } from "react";

import { HomeAboutSection } from "./home-about-section";
import { HomeContactSection } from "./home-contact-section";
import { HomeHero } from "./home-hero";
import { HomeNav } from "./home-nav";

type HomeShellProps = {
  actions: (options: { compact: boolean }) => ReactNode;
};

export function HomeShell({ actions }: HomeShellProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section
        id="home"
        className="relative overflow-hidden bg-[linear-gradient(135deg,_#ffffff_0%,_#eff6ff_46%,_#dbeafe_100%)]"
      >
        <HomeNav actions={actions} />
        <HomeHero />
      </section>

      <HomeAboutSection />
      <HomeContactSection />
    </main>
  );
}
