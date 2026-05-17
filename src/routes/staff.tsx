import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "./about";

import pVanDerWatt from "@/assets/staff/p-van-der-watt.jpg";
import eVanRooyen from "@/assets/staff/e-van-rooyen.jpg";
import mScheepers from "@/assets/staff/m-scheepers.jpg";
import jJoubert from "@/assets/staff/j-joubert.jpg";
import tKani from "@/assets/staff/t-kani.jpg";
import pKhuphe from "@/assets/staff/p-khuphe.jpg";
import lKani from "@/assets/staff/l-kani.jpg";
import vMcgregor from "@/assets/staff/v-mcgregor.jpg";
import hScheepers from "@/assets/staff/h-scheepers.jpg";
import sVanDerWatt from "@/assets/staff/s-van-der-watt.jpg";
import wWessels from "@/assets/staff/w-wessels.jpg";
import pVollenhoven from "@/assets/staff/p-vollenhoven.jpg";
import david from "@/assets/staff/david.jpg";
import caswell from "@/assets/staff/caswell.jpg";
import kabi from "@/assets/staff/kabi.jpg";
import makananelo from "@/assets/staff/makananelo.jpg";
import thulani from "@/assets/staff/thulani.jpg";
import principal from "@/assets/principal.jpg";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Our Staff — Focused Combined School, Matatiele" },
      {
        name: "description",
        content:
          "Meet the dedicated teaching and support staff at Focused Combined School in Matatiele.",
      },
    ],
  }),
  component: Staff,
});

interface StaffMember {
  name: string;
  roles: string[];
  photo?: string;
  category: "leadership" | "teaching" | "support";
}

const staff: StaffMember[] = [
  { name: "Mr. L Van Rooyen", roles: ["Principal", "Mathematics"], photo: principal, category: "leadership" },
  { name: "Mr. P Van Der Watt", roles: ["Deputy Principal", "Mathematics Literacy"], photo: pVanDerWatt, category: "leadership" },
  { name: "Mrs. E Van Rooyen", roles: ["HOD", "Life Sciences", "Natural Science"], photo: eVanRooyen, category: "leadership" },
  { name: "Mr. M Scheepers", roles: ["HOD", "Mathematics"], photo: mScheepers, category: "leadership" },
  { name: "Mrs. J Joubert", roles: ["HOD", "Grade 2"], photo: jJoubert, category: "leadership" },
  { name: "Mrs. T Kani", roles: ["EMS", "Business Studies"], photo: tKani, category: "teaching" },
  { name: "Mr. P Khuphe", roles: ["Economics", "Accounting"], photo: pKhuphe, category: "teaching" },
  { name: "Mr. L Kani", roles: ["Physics", "Mathematics"], photo: lKani, category: "teaching" },
  { name: "Mrs. V McGregor", roles: ["Grade R", "Pre-School"], photo: vMcgregor, category: "teaching" },
  { name: "Mre. H Scheepers", roles: ["Afrikaans"], photo: hScheepers, category: "teaching" },
  { name: "Mrs. S Van Der Watt", roles: ["Grade 1"], photo: sVanDerWatt, category: "teaching" },
  { name: "Mrs. A Mkolokotho", roles: ["Technology", "Natural Science"], category: "teaching" },
  { name: "Mr. W Wessels", roles: ["History", "Geography"], photo: wWessels, category: "teaching" },
  { name: "Mrs. P Vollenhoven", roles: ["English"], photo: pVollenhoven, category: "teaching" },
  { name: "Miss T Heyneke", roles: ["Grade 3"], category: "teaching" },
  { name: "Mr. J Joubert", roles: ["LO", "Geography"], category: "teaching" },
  { name: "Miss L Sefoloko", roles: ["Life Skills"], category: "teaching" },
  { name: "Miss C James", roles: ["English"], category: "teaching" },
  { name: "Miss C Walstroom", roles: ["Afrikaans"], category: "teaching" },
  { name: "Mr. C Walstroom", roles: ["Mathematics", "Social Studies"], category: "teaching" },
  { name: "David", roles: ["Groundsman"], photo: david, category: "support" },
  { name: "Caswell", roles: ["Groundsman"], photo: caswell, category: "support" },
  { name: "Kabi", roles: ["Groundsman"], photo: kabi, category: "support" },
  { name: "Makananelo", roles: ["Groundswoman"], photo: makananelo, category: "support" },
  { name: "Thulani", roles: ["Groundsman"], photo: thulani, category: "support" },
];

function StaffCard({ member }: { member: StaffMember }) {
  const initials = member.name
    .replace(/^(Mr\.|Mrs\.|Miss|Mre\.)\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="group text-center">
      <div className="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full border-4 border-gold bg-primary shadow-lg transition group-hover:scale-105 group-hover:shadow-xl">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-gold">
            {initials}
          </div>
        )}
      </div>
      <h3 className="font-display text-lg">{member.name}</h3>
      <div className="mt-1 flex flex-wrap justify-center gap-1">
        {member.roles.map((role) => (
          <span
            key={role}
            className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary"
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  );
}

function Staff() {
  const leadership = staff.filter((s) => s.category === "leadership");
  const teaching = staff.filter((s) => s.category === "teaching");
  const support = staff.filter((s) => s.category === "support");

  return (
    <>
      <PageHero
        eyebrow="Our people"
        title="Meet the staff of Focused Combined School"
        subtitle="A dedicated team of educators and support staff committed to excellence in every classroom and on every field."
      />

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-center font-display text-3xl">
          School Leadership
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
          Principal, deputy principal and heads of department
        </p>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {leadership.map((m) => (
            <StaffCard key={m.name} member={m} />
          ))}
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-center font-display text-3xl">
            Teaching Staff
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
            Specialist educators across all phases and subjects
          </p>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {teaching.map((m) => (
              <StaffCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-center font-display text-3xl">Support Staff</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
          Keeping our campus clean, safe and beautiful
        </p>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {support.map((m) => (
            <StaffCard key={m.name} member={m} />
          ))}
        </div>
      </section>
    </>
  );
}
