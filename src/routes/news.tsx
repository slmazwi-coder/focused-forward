import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "./about";
import awards from "@/assets/awards.jpg";
import rugby from "@/assets/rugby.jpg";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — Focused Combined School" },
      { name: "description", content: "The latest news, results and events from Focused Combined School in Matatiele." },
    ],
  }),
  component: News,
});

const stories = [
  {
    img: awards,
    tag: "Recognition",
    date: "National finals",
    title: "Focused learners take national honours in Road Safety competition",
    body: "Our team brought home R30,000 and the national trophy in the RTMC Road Safety Schools Debate — proof that classroom rigour translates beyond academics.",
  },
  {
    img: rugby,
    tag: "Rugby",
    date: "Bergview 7s · 2024",
    title: "First Team lift the cup at the inaugural Bergview 7s",
    body: "An unbeaten run on the day saw our First Team crowned champions at Bergview College's first invitational 7s tournament.",
  },
  {
    img: awards,
    tag: "Academics",
    date: "Matric · 2024",
    title: "97.4% matric pass rate — among the top in Alfred Nzo",
    body: "38 of 39 candidates passed, continuing a four-year streak of results that puts Focused alongside the most established schools in the region.",
  },
];

function News() {
  return (
    <>
      <PageHero eyebrow="News & events" title="What's happening at Focused." subtitle="Results, fixtures, awards and the moments that make up a year in the life of our school." />

      <section className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => (
          <article key={s.title} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={s.img} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <span className="rounded-full bg-crimson/10 px-2 py-0.5 font-semibold text-crimson">{s.tag}</span>
                <span>{s.date}</span>
              </div>
              <h3 className="mt-3 font-display text-xl leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
