import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "./about";
import awards from "@/assets/awards.jpg";
import rugby from "@/assets/rugby.jpg";
import { useContent } from "@/lib/content-context";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — Focused Combined School" },
      { name: "description", content: "The latest news, results and events from Focused Combined School in Matatiele." },
    ],
  }),
  component: News,
});

function News() {
  const c = useContent();
  const stories = [
    { img: awards, tag: c("news.item1.tag"), date: c("news.item1.date"), title: c("news.item1.title"), body: c("news.item1.body") },
    { img: rugby, tag: c("news.item2.tag"), date: c("news.item2.date"), title: c("news.item2.title"), body: c("news.item2.body") },
    { img: awards, tag: c("news.item3.tag"), date: c("news.item3.date"), title: c("news.item3.title"), body: c("news.item3.body") },
  ];
  return (
    <>
      <PageHero eyebrow="News & events" title={c("news.hero.title")} subtitle={c("news.hero.subtitle")} />

      <section className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((s, i) => (
          <article key={i} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={s.img} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <span className="rounded-full bg-crimson/10 px-2 py-0.5 font-semibold text-crimson">{s.tag}</span>
                <span>{s.date}</span>
              </div>
              <h3 className="mt-3 font-display text-xl leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">{s.body}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
