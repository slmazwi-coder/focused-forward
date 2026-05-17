import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "./about";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Focused Combined School, Matatiele" },
      { name: "description", content: "Visit, call or email Focused Combined School at 35 Taylor Street, Matatiele." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact" title="We'd love to hear from you." subtitle="Whether you're enquiring about admissions, fees or a school tour — get in touch." />

      <section className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <div className="space-y-5">
            <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <MapPin className="mt-0.5 text-primary" />
              <div>
                <div className="font-semibold">Visit us</div>
                <div className="text-sm text-muted-foreground">35 Taylor Street, Matatiele<br />Eastern Cape, 4730</div>
                <div className="mt-1 text-xs text-muted-foreground">Postal: P.O. Box 101, Matatiele, 4730</div>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <Phone className="mt-0.5 text-primary" />
              <div>
                <div className="font-semibold">Call</div>
                <a href="tel:+27397373679" className="text-sm text-muted-foreground hover:text-primary">039 737 3679</a>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <Mail className="mt-0.5 text-primary" />
              <div>
                <div className="font-semibold">Email</div>
                <a href="mailto:admin@focused.co.za" className="text-sm text-muted-foreground hover:text-primary">admin@focused.co.za</a>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-border">
            <iframe
              title="Focused Combined School map"
              src="https://www.google.com/maps?q=35+Taylor+Street,+Matatiele&output=embed"
              className="h-72 w-full"
              loading="lazy"
            />
          </div>
        </div>

        <form
          className="rounded-2xl border border-border bg-card p-8"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          <h2 className="font-display text-2xl">Send a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">We'll respond within one school day.</p>
          {sent ? (
            <div className="mt-6 rounded-lg bg-primary/10 p-6 text-sm text-primary">
              Thank you — your message has been sent. Our office will be in touch shortly.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea required rows={5} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
              </div>
              <button className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Send message
              </button>
            </div>
          )}
        </form>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}{required && <span className="text-crimson"> *</span>}</label>
      <input id={name} name={name} type={type} required={required}
        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
    </div>
  );
}
