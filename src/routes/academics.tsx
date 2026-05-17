import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "./about";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics — Focused Combined School" },
      { name: "description", content: "Foundation, Intermediate, Senior and FET phase curriculum at Focused Combined School in Matatiele." },
    ],
  }),
  component: Academics,
});

const phases = [
  {
    name: "Foundation Phase",
    grades: "Grade R – 3",
    body: "Literacy, numeracy and life skills taught in small groups by phase specialists. The years where curiosity is built.",
    subjects: ["Home Language", "First Additional Language", "Mathematics", "Life Skills"],
  },
  {
    name: "Intermediate Phase",
    grades: "Grade 4 – 6",
    body: "Children move into subject-based learning — building disciplined study habits that carry through high school.",
    subjects: ["English", "Afrikaans/IsiXhosa", "Mathematics", "Natural Sciences & Technology", "Social Sciences", "Life Skills"],
  },
  {
    name: "Senior Phase",
    grades: "Grade 7 – 9",
    body: "The bridge years. Learners explore the full breadth of the curriculum before subject choice in Grade 10.",
    subjects: ["English", "Afrikaans/IsiXhosa", "Mathematics", "Natural Sciences", "Social Sciences", "EMS", "Technology", "Creative Arts", "Life Orientation"],
  },
  {
    name: "FET Phase",
    grades: "Grade 10 – 12",
    body: "Matric-focused streams in Sciences, Commerce and Humanities. Consistently 97–100% pass rates.",
    subjects: ["Mathematics / Mathematical Literacy", "Physical Sciences", "Life Sciences", "Accounting", "Business Studies", "Economics", "Geography", "History", "Life Orientation"],
  },
];

function Academics() {
  return (
    <>
      <PageHero eyebrow="Academics" title="Four phases. One standard: excellence." subtitle="Our curriculum runs from Grade R through to Grade 12, with phase specialists at every level." />
      <section className="container mx-auto space-y-6 px-4 py-16">
        {phases.map((p, i) => (
          <article key={p.name} className="grid gap-6 rounded-2xl border border-border bg-card p-6 lg:grid-cols-12 lg:p-10">
            <div className="lg:col-span-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson">Phase 0{i + 1}</div>
              <h2 className="mt-2 font-display text-3xl">{p.name}</h2>
              <div className="mt-1 text-sm text-muted-foreground">{p.grades}</div>
            </div>
            <div className="lg:col-span-8">
              <p className="text-muted-foreground">{p.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.subjects.map((s) => (
                  <span key={s} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{s}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-2xl bg-primary p-10 text-primary-foreground">
          <h2 className="font-display text-3xl">Matric results</h2>
          <p className="mt-2 max-w-2xl text-primary-foreground/80">Among the top performers in the Alfred Nzo district, year after year.</p>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { y: "2024", v: "97.4%" },
              { y: "2023", v: "100%" },
              { y: "2022", v: "100%" },
              { y: "2021", v: "100%" },
            ].map((r) => (
              <div key={r.y} className="rounded-xl bg-primary-foreground/10 p-5">
                <div className="font-display text-4xl text-gold">{r.v}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/70">Class of {r.y}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
