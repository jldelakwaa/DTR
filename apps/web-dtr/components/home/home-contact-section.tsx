export function HomeContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p className="text-sm font-bold uppercase text-emerald-300">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal">
            Need help with access?
          </h2>
        </div>
        <a
          href="mailto:support@company.com"
          className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
        >
          support@company.com
        </a>
      </div>
    </section>
  );
}
