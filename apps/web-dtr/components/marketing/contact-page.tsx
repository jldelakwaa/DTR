import { MarketingPageShell } from "./marketing-page-shell";
import { ContactForm } from "./contact-form";

const contactMethods = [
  {
    label: "Email",
    value: "support@company.com",
    href: "mailto:support@company.com",
  },
  { label: "Office hours", value: "Monday to Friday, 9:00 AM to 6:00 PM" },
  {
    label: "Support focus",
    value: "Account access, attendance records, and admin setup",
  },
];

export function ContactPage() {
  return (
    <MarketingPageShell
      eyebrow="Contact"
      title="Need help with access or attendance setup?"
      description="Use this page as the temporary support point while the DTR app is still growing."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4">
            {contactMethods.map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-bold uppercase text-blue-600">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-3 block text-base font-semibold text-slate-950 transition hover:text-blue-700"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-3 text-base font-semibold text-slate-950">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </MarketingPageShell>
  );
}
