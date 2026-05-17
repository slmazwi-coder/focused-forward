import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "./about";
import { Check } from "lucide-react";
import { useContent } from "@/lib/content-context";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Focused Combined School" },
      { name: "description", content: "How to apply to Focused Combined School in Matatiele — requirements, process and contacts." },
    ],
  }),
  component: Admissions,
});

const steps = [
  { n: "01", t: "Enquire", b: "Call the office on 039 737 3679 or email admin@focused.co.za to confirm space in your child's grade." },
  { n: "02", t: "Visit the school", b: "Tour the campus and meet our principal. Walking the corridors is the best way to know us." },
  { n: "03", t: "Submit the form", b: "Complete the application form and return it with the required documents to the school office." },
  { n: "04", t: "Interview & placement", b: "A short interview with parents and learner. Offers are made subject to space and reports." },
];

const reqs = [
  "Certified copy of learner's birth certificate / ID",
  "Certified copies of both parents' / guardians' IDs",
  "Most recent school report",
  "Transfer card from previous school (if applicable)",
  "Proof of residence",
  "Immunisation card (Grade R applicants)",
];

function Admissions() {
  const c = useContent();
  return (
    <>
      <PageHero eyebrow="Admissions" title={c("admissions.hero.title")} subtitle={c("admissions.hero.subtitle")} />

      <section className="container mx-auto grid gap-6 px-4 py-16 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
            <div className="font-display text-3xl text-gold">{s.n}</div>
            <h3 className="mt-3 font-display text-xl">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
          </div>
        ))}
      </section>

      <section className="container mx-auto grid gap-10 px-4 pb-16 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="font-display text-3xl">Required documents</h2>
          <ul className="mt-6 space-y-3">
            {reqs.map((r) => (
              <li key={r} className="flex gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check size={12} />
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
          <h2 className="font-display text-3xl">{c("admissions.fees.heading")}</h2>
          <p className="mt-4 text-primary-foreground/80 whitespace-pre-line">
            {c("admissions.fees.body")}
          </p>
          <div className="mt-8 space-y-2 text-sm">
            <div>📞 <span className="font-medium">{c("admissions.fees.phone")}</span></div>
            <div>✉️ <span className="font-medium">{c("admissions.fees.email")}</span></div>
          </div>
          <Link to="/contact" className="mt-8 inline-flex rounded-md bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground hover:brightness-95">
            Contact admissions
          </Link>
        </div>
      </section>
    </>
  );
}
