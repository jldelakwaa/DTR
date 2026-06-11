const address =
  "20 NHA Comm'l & Ind'l Compound, Brgy. Gavino Maderan, Luzon Avenue, General Mariano Alvarez, 4117 Cavite";

const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  address,
)}&output=embed`;

export function AboutLocationSection() {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="p-6">
          <p className="text-sm font-bold uppercase text-blue-600">Location</p>
          <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
            Visit our listed office area.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{address}</p>
        </div>

        <iframe
          title="DTR office location map"
          src={mapUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-80 w-full border-0 lg:h-full"
          allowFullScreen
        />
      </div>
    </section>
  );
}
