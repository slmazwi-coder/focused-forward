import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "./about";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight, Upload, FileText, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply Online — Focused Combined School" },
      {
        name: "description",
        content: "Submit your application online to Focused Combined School in Matatiele.",
      },
    ],
  }),
  component: ApplyOnline,
});

const GRADES = [
  "Pre-K",
  "Grade R",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

const PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
];

const STEP_LABELS = [
  "Learner Info",
  "Contact & School",
  "Medical Info",
  "Parent/Guardian",
  "Spouse/Partner",
  "Documents & Declaration",
];

function FieldRow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`grid gap-4 sm:grid-cols-2 ${className}`}>{children}</div>;
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">
        {label}
        {required && <span className="text-crimson ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-1 py-6">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              i < current
                ? "bg-primary text-primary-foreground"
                : i === current
                  ? "bg-gold text-gold-foreground"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {i < current ? <Check size={14} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`mx-1 h-0.5 w-6 sm:w-10 ${i < current ? "bg-primary" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function ApplyOnline() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    gradeAppliedFor: "",
    highestGradePassed: "",
    yearPassed: "",
    surname: "",
    firstName: "",
    otherNames: "",
    initials: "",
    nickname: "",
    dob: "",
    gender: "",
    race: "",
    idNumber: "",
    citizenship: "",
    countryOfResidence: "",
    province: "",
    homeLanguage: "",
    religion: "",
    physicalAddress: "",
    postalAddress: "",
    homePhone: "",
    learnerCell: "",
    emergencyPhone: "",
    email: "",
    previousSchool: "",
    previousSchoolProvince: "",
    previousSchoolYear: "",
    isBoarder: "",
    deceasedParent: "",
    transportMode: "",
    medicalAidName: "",
    medicalAidNumber: "",
    medicalAidMainMember: "",
    doctorName: "",
    doctorTel: "",
    medicalConditions: "",
    counselingNeeds: "",
    dexterity: "",
    socialGrant: "",
    feeResponsiblePerson: "",
    feeResponsibleContact: "",
    feeResponsibleRelationship: "",
    feeResponsibleRegNo: "",
    otherChildrenCount: "",
    otherChild1: "",
    otherChild1Grade: "",
    otherChild2: "",
    otherChild2Grade: "",
    otherChild3: "",
    otherChild3Grade: "",
    parentTitle: "",
    parentInitials: "",
    parentSurname: "",
    parentGender: "",
    parentRace: "",
    parentHomeLanguage: "",
    parentIdNumber: "",
    parentOccupation: "",
    parentEmployer: "",
    parentWorkPhone: "",
    parentCellphone: "",
    parentEmail: "",
    parentRelationship: "",
    parentAccountPayer: "",
    parentLearnerResides: "",
    spouseTitle: "",
    spouseInitials: "",
    spouseSurname: "",
    spouseGender: "",
    spouseRace: "",
    spouseHomeLanguage: "",
    spouseIdNumber: "",
    spouseOccupation: "",
    spouseEmployer: "",
    spouseWorkPhone: "",
    spouseCellphone: "",
    spouseEmail: "",
    spouseRelationship: "",
    spouseAccountPayer: "",
    spouseLearnerResides: "",
    emergencyName1: "",
    emergencyRelationship1: "",
    emergencyPhone1: "",
    emergencyName2: "",
    emergencyRelationship2: "",
    emergencyPhone2: "",
    declarationAccepted: false,
  });

  const [files, setFiles] = useState<Record<string, File | null>>({
    parentId: null,
    birthCertificate: null,
    latestReport: null,
    immunisation: null,
    transferLetter: null,
    studyPermit: null,
    passport: null,
  });

  const set = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setFile = (key: string, file: File | null) =>
    setFiles((prev) => ({ ...prev, [key]: file }));

  const next = () => setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <>
        <PageHero
          eyebrow="Application submitted"
          title="Thank you for applying!"
          subtitle="Your application has been received and is under review."
        />
        <section className="container mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h2 className="font-display text-2xl">What happens next?</h2>
          <div className="mt-6 space-y-4 text-left">
            <div className="flex gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-gold-foreground">
                1
              </div>
              <div>
                <p className="font-medium">Application review</p>
                <p className="text-sm text-muted-foreground">
                  Our admissions team will review your application and supporting documents.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-gold-foreground">
                2
              </div>
              <div>
                <p className="font-medium">Interview invitation</p>
                <p className="text-sm text-muted-foreground">
                  Shortlisted candidates will receive an invitation for an interview with the
                  parent/guardian and learner.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-gold-foreground">
                3
              </div>
              <div>
                <p className="font-medium">Placement offer</p>
                <p className="text-sm text-muted-foreground">
                  Successful applicants will receive a formal offer of placement, subject to
                  available space.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-xl bg-primary/5 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="text-left text-sm">
                <p className="font-medium">R100 administration fee</p>
                <p className="text-muted-foreground">
                  Please note that a non-refundable R100 administration fee is required to process
                  your application. Visit the{" "}
                  <a href="/fees" className="font-medium text-primary underline">
                    Fees page
                  </a>{" "}
                  for payment details.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            For any enquiries, contact us at{" "}
            <span className="font-medium">admin@focused.co.za</span> or call{" "}
            <span className="font-medium">039 737 3679</span>.
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Apply online"
        title="Application for admission"
        subtitle="Complete the form below to apply for a place at Focused Combined School. All fields marked with * are required."
      />

      <section className="container mx-auto max-w-4xl px-4 py-8">
        <StepIndicator current={step} total={STEP_LABELS.length} />
        <div className="mb-4 text-center">
          <h2 className="font-display text-2xl">{STEP_LABELS[step]}</h2>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8">
            {step === 0 && (
              <div className="space-y-6">
                <FieldRow>
                  <Field label="Grade applied for" required>
                    <Select
                      value={form.gradeAppliedFor}
                      onValueChange={(v) => set("gradeAppliedFor", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {GRADES.map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Highest grade passed">
                    <Input
                      value={form.highestGradePassed}
                      onChange={(e) => set("highestGradePassed", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <Field label="Year when grade was passed">
                  <Input
                    value={form.yearPassed}
                    onChange={(e) => set("yearPassed", e.target.value)}
                    className="max-w-xs"
                  />
                </Field>
                <FieldRow>
                  <Field label="Surname" required>
                    <Input value={form.surname} onChange={(e) => set("surname", e.target.value)} />
                  </Field>
                  <Field label="First name" required>
                    <Input
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Other names">
                    <Input
                      value={form.otherNames}
                      onChange={(e) => set("otherNames", e.target.value)}
                    />
                  </Field>
                  <Field label="Initials">
                    <Input
                      value={form.initials}
                      onChange={(e) => set("initials", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Nickname">
                    <Input
                      value={form.nickname}
                      onChange={(e) => set("nickname", e.target.value)}
                    />
                  </Field>
                  <Field label="Date of birth" required>
                    <Input
                      type="date"
                      value={form.dob}
                      onChange={(e) => set("dob", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Gender" required>
                    <RadioGroup
                      value={form.gender}
                      onValueChange={(v) => set("gender", v)}
                      className="flex gap-6 pt-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="male" id="g-m" />
                        <Label htmlFor="g-m">Male</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="female" id="g-f" />
                        <Label htmlFor="g-f">Female</Label>
                      </div>
                    </RadioGroup>
                  </Field>
                  <Field label="Race">
                    <Input value={form.race} onChange={(e) => set("race", e.target.value)} />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="ID or Passport number" required>
                    <Input
                      value={form.idNumber}
                      onChange={(e) => set("idNumber", e.target.value)}
                    />
                  </Field>
                  <Field label="Citizenship">
                    <Input
                      value={form.citizenship}
                      onChange={(e) => set("citizenship", e.target.value)}
                      placeholder="e.g. South African"
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Country of residence">
                    <Input
                      value={form.countryOfResidence}
                      onChange={(e) => set("countryOfResidence", e.target.value)}
                    />
                  </Field>
                  <Field label="Province (if SA)">
                    <Select value={form.province} onValueChange={(v) => set("province", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROVINCES.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Home language">
                    <Input
                      value={form.homeLanguage}
                      onChange={(e) => set("homeLanguage", e.target.value)}
                    />
                  </Field>
                  <Field label="Religion">
                    <Input
                      value={form.religion}
                      onChange={(e) => set("religion", e.target.value)}
                    />
                  </Field>
                </FieldRow>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <Field label="Physical address" required>
                  <Textarea
                    value={form.physicalAddress}
                    onChange={(e) => set("physicalAddress", e.target.value)}
                    rows={3}
                  />
                </Field>
                <Field label="Postal address">
                  <Textarea
                    value={form.postalAddress}
                    onChange={(e) => set("postalAddress", e.target.value)}
                    rows={2}
                  />
                </Field>
                <FieldRow>
                  <Field label="Home telephone">
                    <Input
                      type="tel"
                      value={form.homePhone}
                      onChange={(e) => set("homePhone", e.target.value)}
                    />
                  </Field>
                  <Field label="Learner cellphone">
                    <Input
                      type="tel"
                      value={form.learnerCell}
                      onChange={(e) => set("learnerCell", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Emergency telephone" required>
                    <Input
                      type="tel"
                      value={form.emergencyPhone}
                      onChange={(e) => set("emergencyPhone", e.target.value)}
                    />
                  </Field>
                  <Field label="Email address" required>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Name of previous school">
                    <Input
                      value={form.previousSchool}
                      onChange={(e) => set("previousSchool", e.target.value)}
                    />
                  </Field>
                  <Field label="Province">
                    <Select
                      value={form.previousSchoolProvince}
                      onValueChange={(v) => set("previousSchoolProvince", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROVINCES.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Year left previous school">
                    <Input
                      value={form.previousSchoolYear}
                      onChange={(e) => set("previousSchoolYear", e.target.value)}
                    />
                  </Field>
                  <Field label="Boarder">
                    <RadioGroup
                      value={form.isBoarder}
                      onValueChange={(v) => set("isBoarder", v)}
                      className="flex gap-6 pt-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="b-y" />
                        <Label htmlFor="b-y">Yes</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="b-n" />
                        <Label htmlFor="b-n">No</Label>
                      </div>
                    </RadioGroup>
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Deceased parent">
                    <Select
                      value={form.deceasedParent}
                      onValueChange={(v) => set("deceasedParent", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="father">Father</SelectItem>
                        <SelectItem value="mother">Mother</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Mode of transport">
                    <Input
                      value={form.transportMode}
                      onChange={(e) => set("transportMode", e.target.value)}
                      placeholder="e.g. School bus, Private, Walk"
                    />
                  </Field>
                </FieldRow>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <FieldRow>
                  <Field label="Medical aid name">
                    <Input
                      value={form.medicalAidName}
                      onChange={(e) => set("medicalAidName", e.target.value)}
                    />
                  </Field>
                  <Field label="Medical aid number">
                    <Input
                      value={form.medicalAidNumber}
                      onChange={(e) => set("medicalAidNumber", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <Field label="Medical aid main member">
                  <Input
                    value={form.medicalAidMainMember}
                    onChange={(e) => set("medicalAidMainMember", e.target.value)}
                  />
                </Field>
                <FieldRow>
                  <Field label="Doctor name">
                    <Input
                      value={form.doctorName}
                      onChange={(e) => set("doctorName", e.target.value)}
                    />
                  </Field>
                  <Field label="Doctor telephone">
                    <Input
                      type="tel"
                      value={form.doctorTel}
                      onChange={(e) => set("doctorTel", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <Field label="Medical conditions">
                  <Textarea
                    value={form.medicalConditions}
                    onChange={(e) => set("medicalConditions", e.target.value)}
                    rows={3}
                    placeholder="List any known medical conditions, allergies, or medications"
                  />
                </Field>
                <Field label="Special problems requiring counselling">
                  <Textarea
                    value={form.counselingNeeds}
                    onChange={(e) => set("counselingNeeds", e.target.value)}
                    rows={2}
                  />
                </Field>
                <FieldRow>
                  <Field label="Dexterity of learner">
                    <RadioGroup
                      value={form.dexterity}
                      onValueChange={(v) => set("dexterity", v)}
                      className="flex flex-wrap gap-4 pt-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="right" id="d-r" />
                        <Label htmlFor="d-r">Right-handed</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="left" id="d-l" />
                        <Label htmlFor="d-l">Left-handed</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="ambidextrous" id="d-a" />
                        <Label htmlFor="d-a">Ambidextrous</Label>
                      </div>
                    </RadioGroup>
                  </Field>
                  <Field label="Do you receive a social grant?">
                    <RadioGroup
                      value={form.socialGrant}
                      onValueChange={(v) => set("socialGrant", v)}
                      className="flex gap-6 pt-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="sg-y" />
                        <Label htmlFor="sg-y">Yes</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="sg-n" />
                        <Label htmlFor="sg-n">No</Label>
                      </div>
                    </RadioGroup>
                  </Field>
                </FieldRow>
                <div className="rounded-xl border border-border bg-secondary/30 p-6">
                  <h3 className="font-display text-lg">Person responsible for school fees</h3>
                  <div className="mt-4 space-y-4">
                    <FieldRow>
                      <Field label="Full name" required>
                        <Input
                          value={form.feeResponsiblePerson}
                          onChange={(e) => set("feeResponsiblePerson", e.target.value)}
                        />
                      </Field>
                      <Field label="Contact number" required>
                        <Input
                          type="tel"
                          value={form.feeResponsibleContact}
                          onChange={(e) => set("feeResponsibleContact", e.target.value)}
                        />
                      </Field>
                    </FieldRow>
                    <FieldRow>
                      <Field label="Relationship to learner">
                        <Input
                          value={form.feeResponsibleRelationship}
                          onChange={(e) => set("feeResponsibleRelationship", e.target.value)}
                        />
                      </Field>
                      <Field label="Registration number">
                        <Input
                          value={form.feeResponsibleRegNo}
                          onChange={(e) => set("feeResponsibleRegNo", e.target.value)}
                        />
                      </Field>
                    </FieldRow>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-secondary/30 p-6">
                  <h3 className="font-display text-lg">Other children at this school</h3>
                  <div className="mt-4 space-y-4">
                    <Field label="Number of other children at this school">
                      <Select
                        value={form.otherChildrenCount}
                        onValueChange={(v) => set("otherChildrenCount", v)}
                      >
                        <SelectTrigger className="max-w-xs">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {["0", "1", "2", "3"].map((n) => (
                            <SelectItem key={n} value={n}>
                              {n}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    {Number(form.otherChildrenCount) >= 1 && (
                      <FieldRow>
                        <Field label="Child 1 name">
                          <Input
                            value={form.otherChild1}
                            onChange={(e) => set("otherChild1", e.target.value)}
                          />
                        </Field>
                        <Field label="Child 1 grade">
                          <Input
                            value={form.otherChild1Grade}
                            onChange={(e) => set("otherChild1Grade", e.target.value)}
                          />
                        </Field>
                      </FieldRow>
                    )}
                    {Number(form.otherChildrenCount) >= 2 && (
                      <FieldRow>
                        <Field label="Child 2 name">
                          <Input
                            value={form.otherChild2}
                            onChange={(e) => set("otherChild2", e.target.value)}
                          />
                        </Field>
                        <Field label="Child 2 grade">
                          <Input
                            value={form.otherChild2Grade}
                            onChange={(e) => set("otherChild2Grade", e.target.value)}
                          />
                        </Field>
                      </FieldRow>
                    )}
                    {Number(form.otherChildrenCount) >= 3 && (
                      <FieldRow>
                        <Field label="Child 3 name">
                          <Input
                            value={form.otherChild3}
                            onChange={(e) => set("otherChild3", e.target.value)}
                          />
                        </Field>
                        <Field label="Child 3 grade">
                          <Input
                            value={form.otherChild3Grade}
                            onChange={(e) => set("otherChild3Grade", e.target.value)}
                          />
                        </Field>
                      </FieldRow>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Primary parent or guardian information.
                </p>
                <FieldRow>
                  <Field label="Title">
                    <Select value={form.parentTitle} onValueChange={(v) => set("parentTitle", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Mr", "Mrs", "Ms", "Dr", "Rev", "Prof"].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Initials">
                    <Input
                      value={form.parentInitials}
                      onChange={(e) => set("parentInitials", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Surname" required>
                    <Input
                      value={form.parentSurname}
                      onChange={(e) => set("parentSurname", e.target.value)}
                    />
                  </Field>
                  <Field label="Gender">
                    <RadioGroup
                      value={form.parentGender}
                      onValueChange={(v) => set("parentGender", v)}
                      className="flex gap-6 pt-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="male" id="pg-m" />
                        <Label htmlFor="pg-m">Male</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="female" id="pg-f" />
                        <Label htmlFor="pg-f">Female</Label>
                      </div>
                    </RadioGroup>
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Race">
                    <Input
                      value={form.parentRace}
                      onChange={(e) => set("parentRace", e.target.value)}
                    />
                  </Field>
                  <Field label="Home language">
                    <Input
                      value={form.parentHomeLanguage}
                      onChange={(e) => set("parentHomeLanguage", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="ID or Passport number" required>
                    <Input
                      value={form.parentIdNumber}
                      onChange={(e) => set("parentIdNumber", e.target.value)}
                    />
                  </Field>
                  <Field label="Occupation">
                    <Input
                      value={form.parentOccupation}
                      onChange={(e) => set("parentOccupation", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Employer">
                    <Input
                      value={form.parentEmployer}
                      onChange={(e) => set("parentEmployer", e.target.value)}
                    />
                  </Field>
                  <Field label="Work telephone">
                    <Input
                      type="tel"
                      value={form.parentWorkPhone}
                      onChange={(e) => set("parentWorkPhone", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Cellphone" required>
                    <Input
                      type="tel"
                      value={form.parentCellphone}
                      onChange={(e) => set("parentCellphone", e.target.value)}
                    />
                  </Field>
                  <Field label="Email address">
                    <Input
                      type="email"
                      value={form.parentEmail}
                      onChange={(e) => set("parentEmail", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Relationship to learner" required>
                    <Input
                      value={form.parentRelationship}
                      onChange={(e) => set("parentRelationship", e.target.value)}
                      placeholder="e.g. Father, Mother, Guardian"
                    />
                  </Field>
                  <Field label="Account payer?">
                    <RadioGroup
                      value={form.parentAccountPayer}
                      onValueChange={(v) => set("parentAccountPayer", v)}
                      className="flex gap-6 pt-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="pa-y" />
                        <Label htmlFor="pa-y">Yes</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="pa-n" />
                        <Label htmlFor="pa-n">No</Label>
                      </div>
                    </RadioGroup>
                  </Field>
                </FieldRow>
                <Field label="Learner resides with this parent?">
                  <RadioGroup
                    value={form.parentLearnerResides}
                    onValueChange={(v) => set("parentLearnerResides", v)}
                    className="flex gap-6 pt-2"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="pr-y" />
                      <Label htmlFor="pr-y">Yes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="pr-n" />
                      <Label htmlFor="pr-n">No</Label>
                    </div>
                  </RadioGroup>
                </Field>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Spouse or partner information (if applicable).
                </p>
                <FieldRow>
                  <Field label="Title">
                    <Select value={form.spouseTitle} onValueChange={(v) => set("spouseTitle", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Mr", "Mrs", "Ms", "Dr", "Rev", "Prof"].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Initials">
                    <Input
                      value={form.spouseInitials}
                      onChange={(e) => set("spouseInitials", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Surname">
                    <Input
                      value={form.spouseSurname}
                      onChange={(e) => set("spouseSurname", e.target.value)}
                    />
                  </Field>
                  <Field label="Gender">
                    <RadioGroup
                      value={form.spouseGender}
                      onValueChange={(v) => set("spouseGender", v)}
                      className="flex gap-6 pt-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="male" id="sg-m" />
                        <Label htmlFor="sg-m">Male</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="female" id="sg-f" />
                        <Label htmlFor="sg-f">Female</Label>
                      </div>
                    </RadioGroup>
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Race">
                    <Input
                      value={form.spouseRace}
                      onChange={(e) => set("spouseRace", e.target.value)}
                    />
                  </Field>
                  <Field label="Home language">
                    <Input
                      value={form.spouseHomeLanguage}
                      onChange={(e) => set("spouseHomeLanguage", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="ID or Passport number">
                    <Input
                      value={form.spouseIdNumber}
                      onChange={(e) => set("spouseIdNumber", e.target.value)}
                    />
                  </Field>
                  <Field label="Occupation">
                    <Input
                      value={form.spouseOccupation}
                      onChange={(e) => set("spouseOccupation", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Employer">
                    <Input
                      value={form.spouseEmployer}
                      onChange={(e) => set("spouseEmployer", e.target.value)}
                    />
                  </Field>
                  <Field label="Work telephone">
                    <Input
                      type="tel"
                      value={form.spouseWorkPhone}
                      onChange={(e) => set("spouseWorkPhone", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Cellphone">
                    <Input
                      type="tel"
                      value={form.spouseCellphone}
                      onChange={(e) => set("spouseCellphone", e.target.value)}
                    />
                  </Field>
                  <Field label="Email address">
                    <Input
                      type="email"
                      value={form.spouseEmail}
                      onChange={(e) => set("spouseEmail", e.target.value)}
                    />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Relationship to learner">
                    <Input
                      value={form.spouseRelationship}
                      onChange={(e) => set("spouseRelationship", e.target.value)}
                    />
                  </Field>
                  <Field label="Account payer?">
                    <RadioGroup
                      value={form.spouseAccountPayer}
                      onValueChange={(v) => set("spouseAccountPayer", v)}
                      className="flex gap-6 pt-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="sa-y" />
                        <Label htmlFor="sa-y">Yes</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="sa-n" />
                        <Label htmlFor="sa-n">No</Label>
                      </div>
                    </RadioGroup>
                  </Field>
                </FieldRow>
                <Field label="Learner resides with this parent?">
                  <RadioGroup
                    value={form.spouseLearnerResides}
                    onValueChange={(v) => set("spouseLearnerResides", v)}
                    className="flex gap-6 pt-2"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="sr-y" />
                      <Label htmlFor="sr-y">Yes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="sr-n" />
                      <Label htmlFor="sr-n">No</Label>
                    </div>
                  </RadioGroup>
                </Field>
                <div className="rounded-xl border border-border bg-secondary/30 p-6">
                  <h3 className="font-display text-lg">Emergency contacts</h3>
                  <div className="mt-4 space-y-4">
                    <FieldRow className="sm:grid-cols-3">
                      <Field label="Emergency contact 1 name" required>
                        <Input
                          value={form.emergencyName1}
                          onChange={(e) => set("emergencyName1", e.target.value)}
                        />
                      </Field>
                      <Field label="Relationship to learner">
                        <Input
                          value={form.emergencyRelationship1}
                          onChange={(e) => set("emergencyRelationship1", e.target.value)}
                        />
                      </Field>
                      <Field label="Telephone number" required>
                        <Input
                          type="tel"
                          value={form.emergencyPhone1}
                          onChange={(e) => set("emergencyPhone1", e.target.value)}
                        />
                      </Field>
                    </FieldRow>
                    <FieldRow className="sm:grid-cols-3">
                      <Field label="Emergency contact 2 name">
                        <Input
                          value={form.emergencyName2}
                          onChange={(e) => set("emergencyName2", e.target.value)}
                        />
                      </Field>
                      <Field label="Relationship to learner">
                        <Input
                          value={form.emergencyRelationship2}
                          onChange={(e) => set("emergencyRelationship2", e.target.value)}
                        />
                      </Field>
                      <Field label="Telephone number">
                        <Input
                          type="tel"
                          value={form.emergencyPhone2}
                          onChange={(e) => set("emergencyPhone2", e.target.value)}
                        />
                      </Field>
                    </FieldRow>
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-secondary/30 p-6">
                  <h3 className="font-display text-lg">Required documents</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Upload the following documents. Accepted formats: PDF, JPG, PNG (max 10MB each).
                  </p>
                  <div className="mt-4 space-y-4">
                    {[
                      {
                        key: "parentId",
                        label: "Copy of IDs of both parents/guardian",
                        required: true,
                      },
                      {
                        key: "birthCertificate",
                        label: "Copy of child's birth certificate / ID",
                        required: true,
                      },
                      {
                        key: "latestReport",
                        label: "Latest report from previous school",
                        required: true,
                      },
                      {
                        key: "immunisation",
                        label: "Copy of immunisation records (Pre-K to Grade 3 only)",
                        required: false,
                      },
                      {
                        key: "transferLetter",
                        label: "Transfer letter & 4th term report (if transferring)",
                        required: false,
                      },
                      {
                        key: "studyPermit",
                        label: "Valid study permit (foreign students only)",
                        required: false,
                      },
                      {
                        key: "passport",
                        label: "Copy of passport (foreign students only)",
                        required: false,
                      },
                    ].map((doc) => (
                      <div
                        key={doc.key}
                        className="flex items-center gap-4 rounded-lg border border-border bg-card p-3"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          {files[doc.key] ? (
                            <FileText className="h-5 w-5 text-primary" />
                          ) : (
                            <Upload className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">
                            {doc.label}
                            {doc.required && <span className="text-crimson ml-0.5">*</span>}
                          </p>
                          {files[doc.key] && (
                            <p className="truncate text-xs text-muted-foreground">
                              {files[doc.key]!.name}
                            </p>
                          )}
                        </div>
                        <label className="cursor-pointer rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium transition hover:bg-accent">
                          {files[doc.key] ? "Change" : "Upload"}
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => setFile(doc.key, e.target.files?.[0] ?? null)}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
                  <h3 className="font-display text-lg">Declaration</h3>
                  <div className="mt-3 space-y-3 text-sm text-muted-foreground">
                    <p>
                      1. As the legal guardian/parent I agree to submit my child to a school with a
                      Christian ethos.
                    </p>
                    <p>
                      2. I hereby undertake to pay all school fees in advance at the beginning of
                      each month. I realise that a material breach of the contract will exist if I
                      fail to pay any fees on time and that all liabilities of the school to
                      accommodate my child will then cease to exist.
                    </p>
                    <p>
                      3. I undertake to ensure that my child attends school regularly and should my
                      child be absent from school for any reason, I shall notify the teacher, in
                      writing, stating the reason(s) for absence.
                    </p>
                    <p>
                      4. I hereby declare that the above information as supplied is accurate and
                      correct.
                    </p>
                  </div>
                  <div className="mt-4 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="declaration"
                      checked={form.declarationAccepted as boolean}
                      onChange={(e) => set("declarationAccepted", e.target.checked)}
                      className="mt-1 h-4 w-4 cursor-pointer rounded border-primary accent-primary"
                    />
                    <Label htmlFor="declaration" className="cursor-pointer text-sm font-medium">
                      I, the parent/guardian, agree to the above declarations and confirm that all
                      information provided is accurate and correct.
                    </Label>
                  </div>
                </div>

                <div className="rounded-xl bg-gold/10 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <p className="text-sm">
                      <span className="font-medium">R100 administration fee:</span> A non-refundable
                      R100 administration fee is required to process your application. Please visit
                      the{" "}
                      <a href="/fees" className="font-medium text-primary underline">
                        Fees page
                      </a>{" "}
                      for banking details.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              {step > 0 ? (
                <Button variant="outline" onClick={prev}>
                  <ChevronLeft size={16} /> Previous
                </Button>
              ) : (
                <div />
              )}
              {step < STEP_LABELS.length - 1 ? (
                <Button onClick={next}>
                  Next <ChevronRight size={16} />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!form.declarationAccepted}
                  className="bg-gold text-gold-foreground hover:bg-gold/90"
                >
                  Submit application
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
