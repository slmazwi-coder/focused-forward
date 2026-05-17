import { createFileRoute, Link } from "@tanstack/react-router";
import awards from "@/assets/awards.jpg";
import rugby from "@/assets/rugby.jpg";
import { ArrowRight, GraduationCap, Trophy, Users, Sparkles } from "lucide-react";
import { useContent } from "@/lib/content-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Focused Combined School — Independent Grade R–12 in Matatiele" },
      { name: "description", content: "Independent combined school in Matatiele with a 97–100% matric pass rate, active sport and a values-led education from Grade R to Grade 12." },
    ],
  }),
  component: Home,
});

function Home() {
  const c = useContent();
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto grid items-center gap-12 px-4 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              <Sparkles size={14} /> {c("home.hero.eyebrow")}
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              {c("home.hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/85 whitespace-pre-line">
              {c("home.hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/admissions" className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground transition hover:brightness-95">
                {c("home.hero.cta_primary")} <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10">
                {c("home.hero.cta_secondary")}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl bg-gold/30 blur-2xl" />
              <img src={awards} alt="Focused learners celebrating a national award" className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl ring-1 ring-primary-foreground/20" />
              <div className="absolute -bottom-5 -left-5 rounded-xl bg-background px-5 py-4 text-foreground shadow-xl ring-1 ring-border">
                <div className="font-display text-3xl text-primary">{c("home.hero.stat_value")}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c("home.hero.stat_label")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary/50">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-10 md:grid-cols-4">
          {[
            { v: "Gr R–12", l: "Combined phase" },
            { v: "459", l: "Learners & growing" },
            { v: "23:1", l: "Learner : teacher" },
            { v: "100%", l: "2021–23 matric pass" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl text-primary md:text-4xl">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson">{c("home.pillars.eyebrow")}</p>
          <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">{c("home.pillars.heading")}</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: GraduationCap, title: "Academic rigour", body: "A demanding curriculum across Foundation, Intermediate, Senior and FET phases — taught by experienced specialists." },
            { icon: Trophy, title: "Competitive sport", body: "Rugby, hockey, soccer, cricket and athletics — including a First Team cup at the Bergview 7s." },
            { icon: Users, title: "Small classes", body: "A 23:1 learner-to-teacher ratio means every child is known, seen and supported." },
            { icon: Sparkles, title: "Faith & values", body: "Anchored in Proverbs 1:7 — the fear of the Lord is the beginning of knowledge." },
          ].map((p) => (
            <div key={p.title} className="group rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <p.icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature band */}
      <section className="bg-secondary/40">
        <div className="container mx-auto grid items-center gap-12 px-4 py-20 lg:grid-cols-2">
          <img src={rugby} alt="Focused rugby team training" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson">{c("home.feature.eyebrow")}</p>
            <h2 className="mt-3 font-display text-4xl">{c("home.feature.heading")}</h2>
            <p className="mt-5 text-muted-foreground whitespace-pre-line">
              {c("home.feature.body")}
            </p>
            <Link to="/sports" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-crimson">
              Explore our sport programme <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-4xl sm:text-5xl">
            {c("home.cta.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80 whitespace-pre-line">
            {c("home.cta.body")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/admissions" className="rounded-md bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground hover:brightness-95">Start an application</Link>
            <Link to="/contact" className="rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10">Book a tour</Link>
          </div>
        </div>
      </section>
    </>
  );
}
