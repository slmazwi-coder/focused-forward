import { createFileRoute } from "@tanstack/react-router";
import principal from "@/assets/principal.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Focused Combined School, Matatiele" },
      { name: "description", content: "An independent Grade R–12 school in Matatiele, Eastern Cape, founded on faith, focus and academic excellence." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="Our story" title="An independent school with conviction." subtitle="Focused Combined School educates learners from Grade R to Grade 12 in Matatiele, Eastern Cape — privately owned, fee-paying and answerable to the families we serve." />

      <section className="container mx-auto grid gap-12 px-4 py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl">Mission</h2>
          <p className="mt-4 text-muted-foreground">
            To equip every learner with a rigorous academic foundation, a strong moral compass
            and the confidence to take their place in the world. We do not chase fads. We teach
            children to read, to reason, to compete and to lead.
          </p>
          <h2 className="mt-12 font-display text-3xl">Vision</h2>
          <p className="mt-4 text-muted-foreground">
            To be the school of choice for families in Matatiele and the wider Alfred Nzo
            district — recognised for academic results, sporting depth and the character of our
            graduates.
          </p>
          <h2 className="mt-12 font-display text-3xl">Ethos · Deo Volenté</h2>
          <p className="mt-4 text-muted-foreground">
            Our motto, <em>Deo Volenté</em> — "God willing" — and our anchor verse, Proverbs 1:7,
            shape the daily life of the school. Faith and learning are taught as partners, not
            opposites.
          </p>
        </div>
        <aside className="lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <img src={principal} alt="Mr LLJ Van Rooyen, Principal" className="aspect-[4/5] w-full object-cover" />
            <div className="p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson">A word from the Principal</div>
              <p className="mt-3 text-sm text-muted-foreground">
                "At Focused, we know every child by name. Our results are not luck — they are the
                product of disciplined teaching and parents who partner with us. We invite you to
                visit, walk the corridors, and see for yourself."
              </p>
              <div className="mt-4 font-display text-lg">Mr LLJ Van Rooyen</div>
              <div className="text-xs text-muted-foreground">Principal</div>
            </div>
          </div>
        </aside>
      </section>

      <section className="bg-secondary/40">
        <div className="container mx-auto grid gap-6 px-4 py-16 md:grid-cols-3">
          {[
            { k: "Founded as", v: "Independent combined school" },
            { k: "Sector", v: "Private / Independent" },
            { k: "Phase", v: "Grade R – Grade 12" },
            { k: "Learners", v: "352 – 459" },
            { k: "Teachers", v: "19 – 20 specialists" },
            { k: "District", v: "Alfred Nzo West" },
          ].map((f) => (
            <div key={f.k} className="rounded-xl border border-border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson">{f.k}</div>
              <div className="mt-2 font-display text-xl">{f.v}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight sm:text-6xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">{subtitle}</p>}
      </div>
    </section>
  );
}
