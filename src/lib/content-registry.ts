// Single source of truth for editable site content.
// Each entry: stable key + human label + default value + input type.
// Used by both the public pages (defaults / fallback) and the admin editor.

export type ContentField = {
  key: string;
  label: string;
  default: string;
  multiline?: boolean;
};

export type ContentSection = {
  id: string;
  title: string;
  fields: ContentField[];
};

export const CONTENT_SECTIONS: ContentSection[] = [
  {
    id: "home",
    title: "Home page",
    fields: [
      { key: "home.hero.eyebrow", label: "Hero eyebrow", default: "Deo Volenté · Since est." },
      { key: "home.hero.title", label: "Hero title", default: "Where Matatiele's most focused learners find their future.", multiline: true },
      { key: "home.hero.subtitle", label: "Hero subtitle", default: "An independent combined school in the heart of the Eastern Cape — educating Grade R to Grade 12 with discipline, faith and a 97–100% matric pass rate year after year.", multiline: true },
      { key: "home.hero.cta_primary", label: "Primary CTA label", default: "Apply for 2026" },
      { key: "home.hero.cta_secondary", label: "Secondary CTA label", default: "Our story" },
      { key: "home.hero.stat_value", label: "Hero stat value", default: "97.4%" },
      { key: "home.hero.stat_label", label: "Hero stat label", default: "Matric pass rate 2024" },
      { key: "home.pillars.eyebrow", label: "Pillars eyebrow", default: "What we stand for" },
      { key: "home.pillars.heading", label: "Pillars heading", default: "A school built around four things that matter." },
      { key: "home.feature.eyebrow", label: "Feature band eyebrow", default: "Sport at Focused" },
      { key: "home.feature.heading", label: "Feature band heading", default: "A school with a rich, active sporting life." },
      { key: "home.feature.body", label: "Feature band body", default: "From the rugby field to the hockey astro, our learners compete fiercely against the best in the Alfred Nzo district — including King Edward, Bergview and St Patrick's College Kokstad. We believe character is built as much on the field as in the classroom.", multiline: true },
      { key: "home.cta.heading", label: "Bottom CTA heading", default: "Applications for 2026 are now open." },
      { key: "home.cta.body", label: "Bottom CTA body", default: "Limited spaces in each grade. Visit the school, meet our principal and see why families across Matatiele choose Focused.", multiline: true },
    ],
  },
  {
    id: "about",
    title: "About page",
    fields: [
      { key: "about.hero.title", label: "Hero title", default: "An independent school with conviction." },
      { key: "about.hero.subtitle", label: "Hero subtitle", default: "Focused Combined School educates learners from Grade R to Grade 12 in Matatiele, Eastern Cape — privately owned, fee-paying and answerable to the families we serve.", multiline: true },
      { key: "about.mission", label: "Mission", default: "To equip every learner with a rigorous academic foundation, a strong moral compass and the confidence to take their place in the world. We do not chase fads. We teach children to read, to reason, to compete and to lead.", multiline: true },
      { key: "about.vision", label: "Vision", default: "To be the school of choice for families in Matatiele and the wider Alfred Nzo district — recognised for academic results, sporting depth and the character of our graduates.", multiline: true },
      { key: "about.ethos", label: "Ethos paragraph", default: 'Our motto, Deo Volenté — "God willing" — and our anchor verse, Proverbs 1:7, shape the daily life of the school. Faith and learning are taught as partners, not opposites.', multiline: true },
      { key: "about.principal.quote", label: "Principal quote", default: '"At Focused, we know every child by name. Our results are not luck — they are the product of disciplined teaching and parents who partner with us. We invite you to visit, walk the corridors, and see for yourself."', multiline: true },
      { key: "about.principal.name", label: "Principal name", default: "Mr LLJ Van Rooyen" },
    ],
  },
  {
    id: "academics",
    title: "Academics page",
    fields: [
      { key: "academics.hero.title", label: "Hero title", default: "Four phases. One standard: excellence." },
      { key: "academics.hero.subtitle", label: "Hero subtitle", default: "Our curriculum runs from Grade R through to Grade 12, with phase specialists at every level.", multiline: true },
      { key: "academics.results.heading", label: "Results heading", default: "Matric results" },
      { key: "academics.results.body", label: "Results body", default: "Among the top performers in the Alfred Nzo district, year after year.", multiline: true },
    ],
  },
  {
    id: "sports",
    title: "Sport page",
    fields: [
      { key: "sports.hero.title", label: "Hero title", default: "Compete. Belong. Become." },
      { key: "sports.hero.subtitle", label: "Hero subtitle", default: "Sport at Focused is not an extra — it is part of how we form character.", multiline: true },
      { key: "sports.intro.heading", label: "Intro heading", default: "A small school punching above its weight." },
      { key: "sports.intro.body", label: "Intro body", default: "Our learners line up against the largest and oldest schools in the region — King Edward (founded 1890), St Patrick's College Kokstad, Bergview and St Monica's — and hold their own. Trophies on the shelf, but more importantly, lessons in how to win and lose with dignity.", multiline: true },
    ],
  },
  {
    id: "news",
    title: "News page",
    fields: [
      { key: "news.hero.title", label: "Hero title", default: "What's happening at Focused." },
      { key: "news.hero.subtitle", label: "Hero subtitle", default: "Results, fixtures, awards and the moments that make up a year in the life of our school.", multiline: true },
      { key: "news.item1.tag", label: "Story 1 — tag", default: "Recognition" },
      { key: "news.item1.date", label: "Story 1 — date", default: "National finals" },
      { key: "news.item1.title", label: "Story 1 — title", default: "Focused learners take national honours in Road Safety competition" },
      { key: "news.item1.body", label: "Story 1 — body", default: "Our team brought home R30,000 and the national trophy in the RTMC Road Safety Schools Debate — proof that classroom rigour translates beyond academics.", multiline: true },
      { key: "news.item2.tag", label: "Story 2 — tag", default: "Rugby" },
      { key: "news.item2.date", label: "Story 2 — date", default: "Bergview 7s · 2024" },
      { key: "news.item2.title", label: "Story 2 — title", default: "First Team lift the cup at the inaugural Bergview 7s" },
      { key: "news.item2.body", label: "Story 2 — body", default: "An unbeaten run on the day saw our First Team crowned champions at Bergview College's first invitational 7s tournament.", multiline: true },
      { key: "news.item3.tag", label: "Story 3 — tag", default: "Academics" },
      { key: "news.item3.date", label: "Story 3 — date", default: "Matric · 2024" },
      { key: "news.item3.title", label: "Story 3 — title", default: "97.4% matric pass rate — among the top in Alfred Nzo" },
      { key: "news.item3.body", label: "Story 3 — body", default: "38 of 39 candidates passed, continuing a four-year streak of results that puts Focused alongside the most established schools in the region.", multiline: true },
    ],
  },
  {
    id: "admissions",
    title: "Admissions page",
    fields: [
      { key: "admissions.hero.title", label: "Hero title", default: "Become part of the Focused family." },
      { key: "admissions.hero.subtitle", label: "Hero subtitle", default: "Applications for 2026 are now open. Spaces are limited in each grade.", multiline: true },
      { key: "admissions.fees.heading", label: "Fees heading", default: "School fees" },
      { key: "admissions.fees.body", label: "Fees body", default: "As an independent school, Focused sets its own fee structure to fund the small classes, experienced teachers and facilities our families expect. Current fee schedules are provided on enquiry — please contact the office.", multiline: true },
      { key: "admissions.fees.phone", label: "Fees phone", default: "039 737 3679" },
      { key: "admissions.fees.email", label: "Fees email", default: "admin@focused.co.za" },
    ],
  },
  {
    id: "contact",
    title: "Contact page",
    fields: [
      { key: "contact.hero.title", label: "Hero title", default: "We'd love to hear from you." },
      { key: "contact.hero.subtitle", label: "Hero subtitle", default: "Whether you're enquiring about admissions, fees or a school tour — get in touch.", multiline: true },
      { key: "contact.address", label: "Street address", default: "35 Taylor Street, Matatiele\nEastern Cape, 4730", multiline: true },
      { key: "contact.postal", label: "Postal address", default: "Postal: P.O. Box 101, Matatiele, 4730" },
      { key: "contact.phone", label: "Phone", default: "039 737 3679" },
      { key: "contact.email", label: "Email", default: "admin@focused.co.za" },
    ],
  },
];

export const ALL_DEFAULTS: Record<string, string> = Object.fromEntries(
  CONTENT_SECTIONS.flatMap((s) => s.fields.map((f) => [f.key, f.default])),
);
