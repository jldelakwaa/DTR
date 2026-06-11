"use client";

import { useState, type FormEvent } from "react";

const supportEmail = "support@company.com";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialFormState);

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ].join("\n");

    const params = new URLSearchParams({
      subject: form.subject || "DTR support inquiry",
      body,
    });

    window.location.href = `mailto:${supportEmail}?${params.toString()}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <p className="text-sm font-bold uppercase text-blue-600">Message</p>
        <h2 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
          Send an email inquiry.
        </h2>
      </div>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Name</span>
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            placeholder="Your name"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            placeholder="you@company.com"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Subject</span>
          <input
            value={form.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            placeholder="Account access help"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Message</span>
          <textarea
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="min-h-36 resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            placeholder="Tell us what you need help with."
            required
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Open email
      </button>
    </form>
  );
}
