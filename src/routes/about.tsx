import { createFileRoute } from "@tanstack/react-router";
import principal from "@/assets/principal.jpg";
import { useContent } from "@/lib/content-context";

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
  const c = useContent();
  return (
    <>
      <PageHero eyebrow="Our story" title={c("about.hero.title")} subtitle={c("about.hero.subtitle")} />

      <section className="container mx-auto grid gap-12 px-4 py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl">Mission</h2>
          <p className="mt-4 text-muted-foreground whitespace-pre-line">{c("about.mission")}</p>
          <h2 className="mt-12 font-display text-3xl">Vision</h2>
          <p className="mt-4 text-muted-foreground whitespace-pre-line">{c("about.vision")}</p>
          <h2 className="mt-12 font-display text-3xl">Ethos · Deo Volenté</h2>
          <p className="mt-4 text-muted-foreground whitespace-pre-line">{c("about.ethos")}</p>
        </div>
        <aside className="lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <img src={principal} alt="Principal" className="aspect-[4/5] w-full object-cover" />
            <div className="p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson">A word from the Principal</div>
              <p className="mt-3 text-sm text-muted-foreground whitespace-pre-line">{c("about.principal.quote")}</p>
              <div className="mt-4 font-display text-lg">{c("about.principal.name")}</div>
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
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80 whitespace-pre-line">{subtitle}</p>}
      </div>
    </section>
  );
}
