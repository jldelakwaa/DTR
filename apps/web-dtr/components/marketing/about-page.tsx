import { MarketingPageShell } from "./marketing-page-shell";
import { AboutLocationSection } from "./about-location-section";

const values = [
  {
    title: "Clear attendance flow",
    description:
      "Employees should know exactly where to time in, time out, and review their records.",
  },
  {
    title: "Admin-ready structure",
    description:
      "The app is being shaped for roles, approvals, reports, and reliable audit trails.",
  },
  {
    title: "Shared foundation",
    description:
      "Web and future mobile screens should reuse the same rules, types, and validation.",
  },
];

export function AboutPage() {
  return (
    <MarketingPageShell
      eyebrow="About"
      title="A clean DTR system for daily attendance work."
      description="DTR is an attendance and access management app focused on simple employee actions, reliable records, and a structure that can grow into admin tools and mobile support."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <AboutLocationSection />
      </div>
    </MarketingPageShell>
  );
}
