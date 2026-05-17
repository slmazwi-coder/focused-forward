import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "./about";
import rugby from "@/assets/rugby.jpg";
import { useContent } from "@/lib/content-context";

export const Route = createFileRoute("/sports")({
  head: () => ({
    meta: [
      { title: "Sport — Focused Combined School" },
      { name: "description", content: "Rugby, hockey, soccer, cricket and athletics at Focused Combined School in Matatiele." },
    ],
  }),
  component: Sports,
});

const codes = [
  { name: "Rugby", body: "First Team cup winners at the inaugural Bergview 7s (2024). Active fixtures across the Alfred Nzo district." },
  { name: "Hockey", body: "Girls' and boys' teams competing against St Monica's, KEHS and St Patrick's College Kokstad." },
  { name: "Soccer", body: "Both boys' and girls' sides — strong fixture list across the district." },
  { name: "Cricket", body: "Friendly and league fixtures, including matches against St Monica's." },
  { name: "Athletics", body: "Regular participation in Matatiele SP Schools Athletics meetings." },
  { name: "Cultural", body: "Public speaking, choir and award-winning road safety advocacy at national level." },
];

function Sports() {
  const c = useContent();
  return (
    <>
      <PageHero eyebrow="Sport & culture" title={c("sports.hero.title")} subtitle={c("sports.hero.subtitle")} />

      <section className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-2">
        <img src={rugby} alt="Focused rugby team running drills" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl" />
        <div className="self-center">
          <h2 className="font-display text-3xl">{c("sports.intro.heading")}</h2>
          <p className="mt-4 text-muted-foreground whitespace-pre-line">
            {c("sports.intro.body")}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {codes.map((c) => (
            <div key={c.name} className="rounded-xl border border-border bg-card p-6 transition hover:border-crimson/40 hover:shadow-md">
              <div className="h-1 w-10 rounded-full bg-crimson" />
              <h3 className="mt-4 font-display text-2xl">{c.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
