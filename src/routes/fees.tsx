import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "./about";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Upload,
  FileText,
  CreditCard,
  Building2,
  Calculator,
  Check,
  AlertCircle,
} from "lucide-react";

export const Route = createFileRoute("/fees")({
  head: () => ({
    meta: [
      { title: "School Fees — Focused Combined School" },
      {
        name: "description",
        content:
          "School fees, banking details, and payment information for Focused Combined School.",
      },
    ],
  }),
  component: FeesPage,
});

interface FeeRow {
  grade: string;
  stationery: number | null;
  textbooks: number | null;
  monthlyFee11: number;
  monthlyFee10: number;
  annualFee: number;
}

const FEE_DATA: FeeRow[] = [
  {
    grade: "Pre-K",
    stationery: null,
    textbooks: null,
    monthlyFee11: 818.18,
    monthlyFee10: 900,
    annualFee: 9000,
  },
  {
    grade: "Grade R",
    stationery: null,
    textbooks: null,
    monthlyFee11: 818.18,
    monthlyFee10: 900,
    annualFee: 9000,
  },
  {
    grade: "Grade 1",
    stationery: null,
    textbooks: null,
    monthlyFee11: 1200,
    monthlyFee10: 1320,
    annualFee: 13200,
  },
  {
    grade: "Grade 2",
    stationery: null,
    textbooks: null,
    monthlyFee11: 1200,
    monthlyFee10: 1320,
    annualFee: 13200,
  },
  {
    grade: "Grade 3",
    stationery: null,
    textbooks: null,
    monthlyFee11: 1200,
    monthlyFee10: 1320,
    annualFee: 13200,
  },
  {
    grade: "Grade 4",
    stationery: 600,
    textbooks: 830,
    monthlyFee11: 1265.45,
    monthlyFee10: 1392,
    annualFee: 13920,
  },
  {
    grade: "Grade 5",
    stationery: 600,
    textbooks: 1000,
    monthlyFee11: 1265.45,
    monthlyFee10: 1392,
    annualFee: 13920,
  },
  {
    grade: "Grade 6",
    stationery: 600,
    textbooks: 1000,
    monthlyFee11: 1265.45,
    monthlyFee10: 1392,
    annualFee: 13920,
  },
  {
    grade: "Grade 7",
    stationery: 600,
    textbooks: 1650,
    monthlyFee11: 1265.45,
    monthlyFee10: 1392,
    annualFee: 13920,
  },
  {
    grade: "Grade 8",
    stationery: 600,
    textbooks: 1740,
    monthlyFee11: 1625.45,
    monthlyFee10: 1788,
    annualFee: 17880,
  },
  {
    grade: "Grade 9",
    stationery: 600,
    textbooks: 2040,
    monthlyFee11: 1625.45,
    monthlyFee10: 1788,
    annualFee: 17880,
  },
  {
    grade: "Grade 10",
    stationery: null,
    textbooks: null,
    monthlyFee11: 1625.45,
    monthlyFee10: 1788,
    annualFee: 17880,
  },
  {
    grade: "Grade 11",
    stationery: null,
    textbooks: null,
    monthlyFee11: 1625.45,
    monthlyFee10: 1788,
    annualFee: 17880,
  },
  {
    grade: "Grade 12",
    stationery: null,
    textbooks: null,
    monthlyFee11: 1625.45,
    monthlyFee10: 1788,
    annualFee: 17880,
  },
];

const DISCOUNTS = [
  { children: "2 children", discount: "10%", note: "Applied to both children" },
  { children: "3 children", discount: "15%", note: "Applied to all 3 children" },
  { children: "4 or more", discount: "20%", note: "Applied to every child" },
];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatR(n: number) {
  return `R ${n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function FeesPage() {
  const [invoiceGrade, setInvoiceGrade] = useState("");
  const [invoiceChildren, setInvoiceChildren] = useState("1");
  const [invoicePaymentPlan, setInvoicePaymentPlan] = useState("11");
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptUploaded, setReceiptUploaded] = useState(false);

  const selectedFee = FEE_DATA.find((f) => f.grade === invoiceGrade);

  const getDiscount = (count: string) => {
    const n = Number(count);
    if (n >= 4) return 0.2;
    if (n === 3) return 0.15;
    if (n === 2) return 0.1;
    return 0;
  };

  const discount = getDiscount(invoiceChildren);
  const baseFee = selectedFee
    ? invoicePaymentPlan === "11"
      ? selectedFee.monthlyFee11
      : selectedFee.monthlyFee10
    : 0;
  const discountedFee = baseFee * (1 - discount);
  const annualFee = selectedFee ? selectedFee.annualFee * (1 - discount) : 0;
  const months = invoicePaymentPlan === "11" ? 11 : 10;

  const handleGenerateInvoice = () => {
    setInvoiceGenerated(true);
  };

  const handleUploadReceipt = () => {
    if (receiptFile) {
      setReceiptUploaded(true);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="School fees"
        title="Fee schedule & payments"
        subtitle="View the current fee structure, generate payment invoices, and submit payment receipts."
      />

      <section className="container mx-auto max-w-6xl px-4 py-8">
        <Tabs defaultValue="schedule">
          <TabsList className="mb-8 w-full flex-wrap">
            <TabsTrigger value="schedule">Fee Schedule</TabsTrigger>
            <TabsTrigger value="banking">Banking Details</TabsTrigger>
            <TabsTrigger value="invoice">Generate Invoice</TabsTrigger>
            <TabsTrigger value="payment">Make a Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl">Fee Schedule</CardTitle>
                <p className="text-sm text-muted-foreground">
                  School fees are calculated annually but may be paid monthly. January fees,
                  textbooks and stationery are due on the first day of school.
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Grade</TableHead>
                        <TableHead className="text-right">Stationery (once-off)</TableHead>
                        <TableHead className="text-right">Textbooks</TableHead>
                        <TableHead className="text-right">Monthly (11 months)</TableHead>
                        <TableHead className="text-right">Monthly (10 months)</TableHead>
                        <TableHead className="text-right">Annual Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {FEE_DATA.map((row) => (
                        <TableRow key={row.grade}>
                          <TableCell className="font-medium">{row.grade}</TableCell>
                          <TableCell className="text-right">
                            {row.stationery ? formatR(row.stationery) : "—"}
                          </TableCell>
                          <TableCell className="text-right">
                            {row.textbooks
                              ? formatR(row.textbooks)
                              : row.grade.startsWith("Grade 1") && !row.grade.includes("0")
                                ? "—"
                                : "See Column B"}
                          </TableCell>
                          <TableCell className="text-right">{formatR(row.monthlyFee11)}</TableCell>
                          <TableCell className="text-right">{formatR(row.monthlyFee10)}</TableCell>
                          <TableCell className="text-right font-semibold">
                            {formatR(row.annualFee)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-8">
                  <h3 className="font-display text-xl">Multi-child discount</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Applicable to school fees only (not textbooks or stationery).
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {DISCOUNTS.map((d) => (
                      <div
                        key={d.children}
                        className="rounded-xl border border-border bg-card p-4 text-center"
                      >
                        <div className="font-display text-2xl text-primary">{d.discount}</div>
                        <div className="mt-1 text-sm font-medium">{d.children}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{d.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="banking">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="font-display text-xl">Banking details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Account holder", value: "Focused High School" },
                      { label: "Bank", value: "First National Bank (FNB)" },
                      { label: "Account number", value: "62785724854" },
                      { label: "Branch code", value: "210554" },
                      { label: "Account type", value: "Cheque Account" },
                      { label: "Reference", value: "Learner surname + grade" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-3"
                      >
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-lg bg-gold/10 p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <p className="text-xs text-muted-foreground">
                        Please use your child's{" "}
                        <span className="font-medium">surname and grade</span> as the payment
                        reference (e.g. "Smith Gr7") to ensure correct allocation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="font-display text-xl">Payment options</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-xl border border-border p-4">
                      <h4 className="font-medium">EFT / Bank transfer</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Transfer directly from your bank using the details on the left. Use the
                        correct reference.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border p-4">
                      <h4 className="font-medium">Cash deposit</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Deposit cash at any FNB branch using the account details provided.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border p-4">
                      <h4 className="font-medium">Debit order</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Set up a monthly debit order through the school office. Contact{" "}
                        <span className="font-medium">admin@focused.co.za</span> for forms.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border p-4">
                      <h4 className="font-medium">School office</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Pay directly at the school office during business hours. Cash and card
                        accepted.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invoice">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-xl">Generate payment invoice</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Select the grade and payment plan to generate an invoice.
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Grade</Label>
                    <Select
                      value={invoiceGrade}
                      onValueChange={(v) => {
                        setInvoiceGrade(v);
                        setInvoiceGenerated(false);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {FEE_DATA.map((f) => (
                          <SelectItem key={f.grade} value={f.grade}>
                            {f.grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Number of children at school</Label>
                    <Select
                      value={invoiceChildren}
                      onValueChange={(v) => {
                        setInvoiceChildren(v);
                        setInvoiceGenerated(false);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["1", "2", "3", "4", "5"].map((n) => (
                          <SelectItem key={n} value={n}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Payment plan</Label>
                    <Select
                      value={invoicePaymentPlan}
                      onValueChange={(v) => {
                        setInvoicePaymentPlan(v);
                        setInvoiceGenerated(false);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="11">11 months (Jan–Nov)</SelectItem>
                        <SelectItem value="10">10 months (Jan–Oct)</SelectItem>
                        <SelectItem value="annual">Annual (once-off)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {invoiceGrade && (
                  <div className="mt-6">
                    <Button
                      onClick={handleGenerateInvoice}
                      className="bg-gold text-gold-foreground hover:bg-gold/90"
                    >
                      <Download size={16} /> Generate invoice
                    </Button>
                  </div>
                )}

                {invoiceGenerated && selectedFee && (
                  <div className="mt-8 rounded-xl border-2 border-primary/20 bg-card p-6">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <div>
                        <h3 className="font-display text-xl text-primary">
                          Focused Combined School
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          35 Taylor Street, Matatiele, 4730
                        </p>
                      </div>
                      <Badge variant="outline">Invoice</Badge>
                    </div>
                    <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                      <div>
                        <p className="text-muted-foreground">Invoice number</p>
                        <p className="font-medium">
                          INV-{new Date().getFullYear()}-{rand(1000, 9999)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Date</p>
                        <p className="font-medium">{new Date().toLocaleDateString("en-ZA")}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Grade</p>
                        <p className="font-medium">{selectedFee.grade}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Payment plan</p>
                        <p className="font-medium">
                          {invoicePaymentPlan === "annual" ? "Annual" : `${months} months`}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              School fees — {selectedFee.grade}
                              {invoicePaymentPlan !== "annual" && ` (per month × ${months})`}
                            </TableCell>
                            <TableCell className="text-right">
                              {invoicePaymentPlan === "annual"
                                ? formatR(selectedFee.annualFee)
                                : formatR(baseFee)}
                            </TableCell>
                          </TableRow>
                          {selectedFee.stationery && (
                            <TableRow>
                              <TableCell>Stationery fee (once-off)</TableCell>
                              <TableCell className="text-right">
                                {formatR(selectedFee.stationery)}
                              </TableCell>
                            </TableRow>
                          )}
                          {selectedFee.textbooks && (
                            <TableRow>
                              <TableCell>Textbooks (once-off)</TableCell>
                              <TableCell className="text-right">
                                {formatR(selectedFee.textbooks)}
                              </TableCell>
                            </TableRow>
                          )}
                          {discount > 0 && (
                            <TableRow>
                              <TableCell className="text-primary">
                                Multi-child discount ({invoiceChildren} children — {discount * 100}
                                %)
                              </TableCell>
                              <TableCell className="text-right text-primary">
                                {invoicePaymentPlan === "annual"
                                  ? `- ${formatR(selectedFee.annualFee * discount)}`
                                  : `- ${formatR(baseFee * discount)} / month`}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                      <div className="mt-4 flex items-center justify-between rounded-lg bg-primary/5 px-4 py-3">
                        <span className="font-display text-lg">
                          {invoicePaymentPlan === "annual" ? "Total due" : "Monthly amount"}
                        </span>
                        <span className="font-display text-2xl text-primary">
                          {invoicePaymentPlan === "annual"
                            ? formatR(annualFee)
                            : formatR(discountedFee)}
                        </span>
                      </div>
                      {invoicePaymentPlan !== "annual" && (
                        <p className="mt-2 text-right text-xs text-muted-foreground">
                          Annual total: {formatR(annualFee)}
                          {(selectedFee.stationery || selectedFee.textbooks) && (
                            <>
                              {" "}
                              +{" "}
                              {formatR(
                                (selectedFee.stationery ?? 0) + (selectedFee.textbooks ?? 0),
                              )}{" "}
                              (once-off fees)
                            </>
                          )}
                        </p>
                      )}
                    </div>
                    <div className="mt-6 rounded-lg bg-secondary/50 p-4 text-xs text-muted-foreground">
                      <p className="font-medium text-foreground">Payment details:</p>
                      <p>Account: Focused High School | FNB | 62785724854 | Branch: 210554</p>
                      <p>Reference: Learner surname + grade</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Upload className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-xl">Upload payment receipt</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Upload proof of payment for verification.
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {receiptUploaded ? (
                    <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-primary/30 bg-primary/5 p-8 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg">Receipt uploaded!</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Your proof of payment has been submitted. The school office will verify
                          and allocate your payment.
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setReceiptFile(null);
                          setReceiptUploaded(false);
                        }}
                      >
                        Upload another receipt
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Learner's full name</Label>
                        <Input placeholder="e.g. John Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label>Grade</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {FEE_DATA.map((f) => (
                              <SelectItem key={f.grade} value={f.grade}>
                                {f.grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Payment month</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "January",
                              "February",
                              "March",
                              "April",
                              "May",
                              "June",
                              "July",
                              "August",
                              "September",
                              "October",
                              "November",
                            ].map((m) => (
                              <SelectItem key={m} value={m}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Amount paid</Label>
                        <Input type="number" placeholder="e.g. 1625.45" />
                      </div>
                      <div className="space-y-2">
                        <Label>Upload proof of payment</Label>
                        <div className="flex items-center gap-3 rounded-lg border-2 border-dashed border-border p-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            {receiptFile ? (
                              <FileText className="h-5 w-5 text-primary" />
                            ) : (
                              <Upload className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            {receiptFile ? (
                              <p className="truncate text-sm font-medium">{receiptFile.name}</p>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                PDF, JPG or PNG (max 10MB)
                              </p>
                            )}
                          </div>
                          <label className="cursor-pointer rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium transition hover:bg-accent">
                            {receiptFile ? "Change" : "Choose file"}
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => setReceiptFile(e.target.files?.[0] ?? null)}
                            />
                          </label>
                        </div>
                      </div>
                      <Button
                        onClick={handleUploadReceipt}
                        disabled={!receiptFile}
                        className="w-full"
                      >
                        <Upload size={16} /> Submit proof of payment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-xl">Pay online</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Secure online payment coming soon.
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-border p-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                      <CreditCard className="h-7 w-7 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg">Online payments coming soon</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        We are working on integrating a secure online payment gateway. In the
                        meantime, please use EFT, cash deposit, or the school office.
                      </p>
                    </div>
                    <div className="rounded-lg bg-gold/10 p-3 text-left">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <p className="text-xs text-muted-foreground">
                          Contact <span className="font-medium">admin@focused.co.za</span> or call{" "}
                          <span className="font-medium">039 737 3679</span> for assistance with
                          payments.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
