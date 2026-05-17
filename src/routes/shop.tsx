import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "./about";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ShoppingCart,
  BookOpen,
  Shirt,
  Plus,
  Minus,
  Trash2,
  Check,
  AlertCircle,
} from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Uniform & Textbooks — Focused Combined School" },
      {
        name: "description",
        content: "Order school uniforms and textbooks online for Focused Combined School.",
      },
    ],
  }),
  component: ShopPage,
});

interface UniformItem {
  id: string;
  name: string;
  sizes: { label: string; price: number }[];
  grade12Only?: boolean;
}

const UNIFORM_ITEMS: UniformItem[] = [
  { id: "blazer", name: "Blazer", sizes: [{ label: "All sizes", price: 380 }] },
  { id: "cap", name: "Cap", sizes: [{ label: "One Size", price: 80 }] },
  { id: "dress-belt", name: "Dress Belt", sizes: [{ label: "All sizes", price: 15 }] },
  { id: "scarf", name: "School Scarf", sizes: [{ label: "One Size", price: 150 }] },
  { id: "tie", name: "School Tie", sizes: [{ label: "One Size", price: 50 }] },
  { id: "scrunchie", name: "Scrunchie", sizes: [{ label: "One Size", price: 15 }] },
  { id: "towelling", name: "Towelling Band", sizes: [{ label: "One Size", price: 6 }] },
  {
    id: "blouse-ss",
    name: "Blouse (Short Sleeve)",
    sizes: [
      { label: "5–12", price: 65 },
      { label: "13–102", price: 75 },
      { label: "107–117", price: 90 },
    ],
  },
  {
    id: "dress",
    name: "Dress",
    sizes: [
      { label: "5–12", price: 160 },
      { label: "13–19", price: 175 },
      { label: "17–20", price: 185 },
    ],
  },
  {
    id: "golf-shirt",
    name: "Golf Shirt",
    sizes: [
      { label: "KS–KL", price: 120 },
      { label: "KXL–M", price: 130 },
      { label: "L–XXL", price: 150 },
    ],
  },
  {
    id: "jersey-ls",
    name: "Jersey Green (Long Sleeve)",
    sizes: [
      { label: "24–30", price: 195 },
      { label: "32–42", price: 215 },
      { label: "44–48", price: 235 },
    ],
  },
  {
    id: "jersey-po",
    name: "Jersey Green (Pull-Over)",
    sizes: [
      { label: "24–30", price: 170 },
      { label: "32–42", price: 180 },
      { label: "44–48", price: 190 },
    ],
  },
  {
    id: "shirt-ls",
    name: "Shirt (Long Sleeve)",
    sizes: [
      { label: "5–15", price: 75 },
      { label: "92–102", price: 85 },
      { label: "107–117", price: 95 },
    ],
  },
  {
    id: "shirt-ss",
    name: "Shirt (Short Sleeve)",
    sizes: [
      { label: "5–15", price: 70 },
      { label: "92–102", price: 80 },
      { label: "107–117", price: 90 },
    ],
  },
  {
    id: "skirt",
    name: "Skirt",
    sizes: [
      { label: "28–32", price: 110 },
      { label: "34–40", price: 120 },
      { label: "42–48", price: 130 },
    ],
  },
  {
    id: "tracksuit",
    name: "Tracksuit",
    sizes: [
      { label: "KS–KL", price: 350 },
      { label: "KXL–M", price: 380 },
      { label: "L–XXL", price: 400 },
    ],
  },
  {
    id: "matric-jersey-ls",
    name: "White Matric Jersey (Long Sleeve)",
    sizes: [
      { label: "24–30", price: 195 },
      { label: "32–42", price: 215 },
      { label: "44–48", price: 235 },
    ],
    grade12Only: true,
  },
  {
    id: "matric-jersey-po",
    name: "White Matric Jersey (Pull-Over)",
    sizes: [
      { label: "24–30", price: 170 },
      { label: "32–42", price: 180 },
      { label: "44–48", price: 190 },
    ],
    grade12Only: true,
  },
  {
    id: "matric-tie",
    name: "Matric Tie",
    sizes: [{ label: "One Size", price: 50 }],
    grade12Only: true,
  },
  {
    id: "matric-scarf",
    name: "Matric Scarf",
    sizes: [{ label: "One Size", price: 150 }],
    grade12Only: true,
  },
];

interface TextbookItem {
  name: string;
  isbn: string;
  price: number;
}

interface GradeTextbooks {
  grade: string;
  total: number;
  books: TextbookItem[];
}

const TEXTBOOKS: GradeTextbooks[] = [
  {
    grade: "Grade 4",
    total: 830,
    books: [
      { name: "Afrikaans Sonder Grense LB", isbn: "9780636119895", price: 210 },
      { name: "Platinum Natural Science & Technology LB", isbn: "9780636135512", price: 160 },
      { name: "Oxf Successful Life Skills LB", isbn: "9780199048366", price: 130 },
      { name: "Platinum Social Sciences LB", isbn: "9780636083448", price: 160 },
      { name: "Platinum Mathematics LB", isbn: "9780636135338", price: 170 },
    ],
  },
  {
    grade: "Grade 5",
    total: 1000,
    books: [
      { name: "Afrikaans Sonder Grense LB", isbn: "9780636119901", price: 180 },
      { name: "Platinum English HL LB", isbn: "9780636136106", price: 190 },
      { name: "Platinum Mathematics LB", isbn: "9780636135345", price: 180 },
      { name: "Platinum Natural Science & Technology LB", isbn: "9780636135536", price: 150 },
      { name: "Oxf Successful Life Skills LB", isbn: "9780199059904", price: 130 },
      { name: "Platinum Social Sciences LB", isbn: "9780636091580", price: 170 },
    ],
  },
  {
    grade: "Grade 6",
    total: 1000,
    books: [
      { name: "Afrikaans Sonder Grense LB", isbn: "9780636119918", price: 190 },
      { name: "Platinum English HL LB", isbn: "9780636136113", price: 200 },
      { name: "Platinum Mathematics LB", isbn: "9780636135352", price: 170 },
      { name: "Platinum Natural Science & Technology LB", isbn: "9780636135567", price: 160 },
      { name: "Oxf Successful Life Skills LB", isbn: "9780199042388", price: 120 },
      { name: "Platinum Social Sciences LB", isbn: "9780636095410", price: 160 },
    ],
  },
  {
    grade: "Grade 7",
    total: 1650,
    books: [
      { name: "English in Context HL LB", isbn: "9780636064256", price: 200 },
      { name: "Platinum Mathematics LB", isbn: "9780636141407", price: 210 },
      { name: "Oxf Successful EMS LB", isbn: "9780195987675", price: 200 },
      { name: "Oxf Successful Life Orientation LB", isbn: "9780195997675", price: 170 },
      { name: "Platinum Social Sciences LB", isbn: "9780636140981", price: 200 },
      { name: "Platinum Natural Science LB", isbn: "9780636140899", price: 190 },
      { name: "Platinum Creative Arts LB", isbn: "9780636141087", price: 210 },
      { name: "Top Class Technology LB", isbn: "9781920604387", price: 130 },
      { name: "Metamorfose (Afrikaans FAL) LB", isbn: "n/a", price: 140 },
    ],
  },
  {
    grade: "Grade 8",
    total: 1740,
    books: [
      { name: "Platinum Mathematics", isbn: "9780636141445", price: 220 },
      { name: "Oxf Successful EMS LB", isbn: "9780199044658", price: 180 },
      { name: "Oxf Successful Life Orientation LB", isbn: "9780195997477", price: 180 },
      { name: "Platinum Social Sciences LB", isbn: "9780636141360", price: 190 },
      { name: "Platinum Natural Science LB", isbn: "9780636140912", price: 210 },
      { name: "Platinum Creative Arts LB", isbn: "9780636141125", price: 220 },
      { name: "Top Class Technology LB", isbn: "9781920604400", price: 140 },
      { name: "Metamorfose (Afrikaans FAL) LB", isbn: "n/a", price: 210 },
      { name: "English For Success", isbn: "9780199050697", price: 190 },
    ],
  },
  {
    grade: "Grade 9",
    total: 2040,
    books: [
      { name: "Platinum Mathematics", isbn: "9780636141452", price: 240 },
      { name: "Oxf Successful EMS LB", isbn: "9780199052493", price: 200 },
      { name: "Oxf Successful Life Orientation LB", isbn: "9780195996487", price: 190 },
      { name: "Platinum Social Sciences LB", isbn: "9780636141384", price: 220 },
      { name: "Platinum Natural Science LB", isbn: "9780636140929", price: 220 },
      { name: "Platinum Creative Arts LB", isbn: "9780636141131", price: 240 },
      { name: "Top Class Technology LB", isbn: "9781920604424", price: 130 },
      { name: "Metamorfose (Afrikaans FAL) LB", isbn: "n/a", price: 210 },
      { name: "Animal Farm", isbn: "9780636085251", price: 170 },
      { name: "English for Success", isbn: "9780199048182", price: 220 },
    ],
  },
  {
    grade: "Grade 10",
    total: 3050,
    books: [
      { name: "Classroom Maths LB", isbn: "9780796237262", price: 270 },
      { name: "Focus Business Studies LB", isbn: "9780636127029", price: 220 },
      { name: "Focus Economics LB", isbn: "9780636127135", price: 220 },
      { name: "Focus Geography LB", isbn: "9780636127388", price: 220 },
      { name: "Focus History LB", isbn: "9780636127401", price: 220 },
      { name: "Focus Life Orientation LB", isbn: "9780636127067", price: 190 },
      { name: "English in Context (HL) LB", isbn: "9780636071765", price: 200 },
      { name: "Top Class Accounting LB", isbn: "9780796044273", price: 230 },
      { name: "Platinum Maths Literacy LB", isbn: "9780636135833", price: 300 },
      { name: "Study & Master Physical Science LB", isbn: "9781107646346", price: 210 },
      { name: "Understanding Life Sciences LB", isbn: "9781920192228", price: 340 },
      { name: "The Mark", isbn: "9781928294023", price: 130 },
      { name: "Die Kind ('n Roman)", isbn: "9780636179394", price: 90 },
      { name: "Metamorfose (Afrikaans FAL) LB", isbn: "n/a", price: 210 },
    ],
  },
  {
    grade: "Grade 11",
    total: 3810,
    books: [
      { name: "Classroom Maths LB (CAPS Aligned)", isbn: "9780796243065", price: 370 },
      { name: "Focus Business Studies LB", isbn: "9780636135277", price: 300 },
      { name: "Focus Economics LB", isbn: "9780636135987", price: 300 },
      { name: "Focus Geography LB", isbn: "9780636103221", price: 310 },
      { name: "Focus History LB", isbn: "9780636111516", price: 310 },
      { name: "Focus Life Orientation LB", isbn: "9780636135291", price: 310 },
      { name: "English in Context HL LB", isbn: "9780636135260", price: 350 },
      { name: "Macbeth", isbn: "9780190407315", price: 100 },
      { name: "Things Fall Apart", isbn: "9780636179530", price: 90 },
      { name: "Top Class Accounting LB", isbn: "9780796044297", price: 220 },
      { name: "Platinum Maths Literacy LB", isbn: "9780636135833", price: 300 },
      { name: "Study & Master Physical Science LB", isbn: "9781107696686", price: 290 },
      { name: "Understanding Life Sciences LB", isbn: "9781920192266", price: 250 },
      { name: "Die Kruppel Engel", isbn: "9781431038722", price: 100 },
      { name: "Metamorfose (Afrikaans FAL) LB", isbn: "n/a", price: 210 },
    ],
  },
  {
    grade: "Grade 12",
    total: 4040,
    books: [
      { name: "Classroom Maths LB", isbn: "9780796248459", price: 400 },
      { name: "Platinum Business Studies LB", isbn: "9780636140127", price: 320 },
      { name: "Focus Economics LB", isbn: "9780636142121", price: 310 },
      { name: "Focus Geography LB", isbn: "9780636142244", price: 310 },
      { name: "Focus History LB", isbn: "9780636140844", price: 310 },
      { name: "Focus Life Orientation LB", isbn: "9780636141957", price: 300 },
      { name: "Top Class Accounting LB", isbn: "9781920605100", price: 280 },
      { name: "Platinum Maths Literacy LB", isbn: "9780636143357", price: 320 },
      { name: "Study & Master Physical Science LB", isbn: "9781107629394", price: 360 },
      { name: "Understanding Life Sciences LB", isbn: "9781920192280", price: 250 },
      { name: "English in Context HL LB", isbn: "9780636140028", price: 240 },
      { name: "Life of Pi", isbn: "9780199057603", price: 100 },
      { name: "Hamlet", isbn: "9780195995282", price: 170 },
      { name: "Metamorfose (Afrikaans FAL) LB", isbn: "n/a", price: 210 },
      { name: "Fiela se Kind die Drama", isbn: "9780624073635", price: 160 },
    ],
  },
];

interface CartItem {
  type: "uniform" | "textbook";
  id: string;
  name: string;
  size?: string;
  price: number;
  quantity: number;
  grade?: string;
}

function formatR(n: number) {
  return `R ${n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerGrade, setCustomerGrade] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [isGrade12, setIsGrade12] = useState(false);

  const addUniformToCart = (item: UniformItem, sizeLabel: string, price: number) => {
    const cartId = `${item.id}-${sizeLabel}`;
    setCart((prev) => {
      const existing = prev.find((c) => c.id === cartId && c.type === "uniform");
      if (existing) {
        return prev.map((c) =>
          c.id === cartId && c.type === "uniform" ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [
        ...prev,
        { type: "uniform", id: cartId, name: item.name, size: sizeLabel, price, quantity: 1 },
      ];
    });
  };

  const addTextbookSetToCart = (gradeBooks: GradeTextbooks) => {
    setCart((prev) => {
      const newItems: CartItem[] = [];
      for (const book of gradeBooks.books) {
        const cartId = `book-${book.isbn}-${gradeBooks.grade}`;
        const existing = prev.find((c) => c.id === cartId);
        if (!existing) {
          newItems.push({
            type: "textbook",
            id: cartId,
            name: book.name,
            price: book.price,
            quantity: 1,
            grade: gradeBooks.grade,
          });
        }
      }
      return [...prev, ...newItems];
    });
  };

  const addSingleBookToCart = (book: TextbookItem, grade: string) => {
    const cartId = `book-${book.isbn}-${grade}`;
    setCart((prev) => {
      const existing = prev.find((c) => c.id === cartId);
      if (existing) return prev;
      return [
        ...prev,
        { type: "textbook", id: cartId, name: book.name, price: book.price, quantity: 1, grade },
      ];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c))
        .filter((c) => c.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const uniformTotal = cart
    .filter((c) => c.type === "uniform")
    .reduce((sum, c) => sum + c.price * c.quantity, 0);
  const textbookTotal = cart
    .filter((c) => c.type === "textbook")
    .reduce((sum, c) => sum + c.price * c.quantity, 0);

  const handleSubmitOrder = () => {
    setOrderSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (orderSubmitted) {
    return (
      <>
        <PageHero
          eyebrow="Order placed"
          title="Thank you for your order!"
          subtitle="Your uniform and textbook order has been submitted."
        />
        <section className="container mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h2 className="font-display text-2xl">Order summary</h2>
          <div className="mt-6 rounded-xl border border-border bg-card p-6 text-left">
            <div className="space-y-2 text-sm">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} {item.size && `(${item.size})`} × {item.quantity}
                  </span>
                  <span className="font-medium">{formatR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-border pt-4">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-xl text-primary">{formatR(cartTotal)}</span>
            </div>
          </div>
          <div className="mt-6 rounded-xl bg-gold/10 p-4 text-left">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div className="text-sm">
                <p className="font-medium">Payment required</p>
                <p className="text-muted-foreground">
                  Please pay via EFT or at the school office. Visit the{" "}
                  <a href="/fees" className="font-medium text-primary underline">
                    Fees page
                  </a>{" "}
                  for banking details. Use your child's name as the reference.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Your order will be prepared once payment is confirmed. Collection is from the school
            office.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Enquiries: <span className="font-medium">admin@focused.co.za</span> |{" "}
            <span className="font-medium">039 737 3679</span>
          </p>
        </section>
      </>
    );
  }

  const displayedUniforms = UNIFORM_ITEMS.filter((item) => !item.grade12Only || isGrade12);

  return (
    <>
      <PageHero
        eyebrow="School shop"
        title="Uniform & textbook orders"
        subtitle="Order school uniforms and textbooks online. Select items, choose sizes and quantities, then submit your order."
      />

      <section className="container mx-auto max-w-7xl px-4 py-8">
        <Tabs defaultValue="uniform">
          <TabsList className="mb-8 w-full">
            <TabsTrigger value="uniform" className="gap-2">
              <Shirt size={16} /> Uniforms
            </TabsTrigger>
            <TabsTrigger value="textbooks" className="gap-2">
              <BookOpen size={16} /> Textbooks
            </TabsTrigger>
            <TabsTrigger value="cart" className="gap-2">
              <ShoppingCart size={16} /> Cart
              {cart.length > 0 && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-[10px]">{cart.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="uniform">
            <div className="mb-6 flex items-center gap-4">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
                <input
                  type="checkbox"
                  checked={isGrade12}
                  onChange={(e) => setIsGrade12(e.target.checked)}
                  className="h-4 w-4 cursor-pointer accent-primary"
                />
                <span className="text-sm font-medium">Show Grade 12 (Matric) items</span>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {displayedUniforms.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      {item.grade12Only && <Badge variant="secondary">Gr 12 only</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {item.sizes.map((size) => (
                        <div
                          key={size.label}
                          className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
                        >
                          <div>
                            <span className="text-sm">{size.label}</span>
                            <span className="ml-2 font-medium text-primary">
                              {formatR(size.price)}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addUniformToCart(item, size.label, size.price)}
                          >
                            <Plus size={14} /> Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="textbooks">
            <div className="mb-6">
              <Label className="mb-2 block text-sm">Select grade to view textbooks</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="Choose a grade" />
                </SelectTrigger>
                <SelectContent>
                  {TEXTBOOKS.map((g) => (
                    <SelectItem key={g.grade} value={g.grade}>
                      {g.grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedGrade &&
              (() => {
                const gradeBooks = TEXTBOOKS.find((g) => g.grade === selectedGrade);
                if (!gradeBooks) return null;
                return (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="font-display text-xl">
                            {gradeBooks.grade} textbooks
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {gradeBooks.books.length} books — Total: {formatR(gradeBooks.total)}
                          </p>
                        </div>
                        <Button
                          onClick={() => addTextbookSetToCart(gradeBooks)}
                          className="bg-gold text-gold-foreground hover:bg-gold/90"
                        >
                          <Plus size={16} /> Add all to cart
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Book</TableHead>
                            <TableHead>ISBN</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="w-20" />
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gradeBooks.books.map((book) => {
                            const inCart = cart.some(
                              (c) => c.id === `book-${book.isbn}-${gradeBooks.grade}`,
                            );
                            return (
                              <TableRow key={book.isbn}>
                                <TableCell className="font-medium">{book.name}</TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                  {book.isbn}
                                </TableCell>
                                <TableCell className="text-right">{formatR(book.price)}</TableCell>
                                <TableCell>
                                  {inCart ? (
                                    <Badge variant="secondary">
                                      <Check size={12} /> Added
                                    </Badge>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => addSingleBookToCart(book, gradeBooks.grade)}
                                    >
                                      <Plus size={14} />
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                );
              })()}

            {!selectedGrade && (
              <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-border p-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
                <div>
                  <h3 className="font-display text-lg">Select a grade above</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose a grade to view the required textbook list with prices and ISBNs.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cart">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-border p-12 text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                <div>
                  <h3 className="font-display text-lg">Your cart is empty</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Browse the Uniforms and Textbooks tabs to add items.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-display text-xl">
                        Your cart ({cart.length} {cart.length === 1 ? "item" : "items"})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {cart.filter((c) => c.type === "uniform").length > 0 && (
                          <>
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                              <Shirt size={14} /> Uniforms
                            </h4>
                            {cart
                              .filter((c) => c.type === "uniform")
                              .map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                                >
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Size: {item.size}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-7 w-7"
                                      onClick={() => updateQuantity(item.id, -1)}
                                    >
                                      <Minus size={12} />
                                    </Button>
                                    <span className="w-8 text-center text-sm font-medium">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-7 w-7"
                                      onClick={() => updateQuantity(item.id, 1)}
                                    >
                                      <Plus size={12} />
                                    </Button>
                                  </div>
                                  <span className="w-20 text-right text-sm font-medium">
                                    {formatR(item.price * item.quantity)}
                                  </span>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-muted-foreground"
                                    onClick={() => removeItem(item.id)}
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              ))}
                          </>
                        )}

                        {cart.filter((c) => c.type === "textbook").length > 0 && (
                          <>
                            <h4 className="mt-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                              <BookOpen size={14} /> Textbooks
                            </h4>
                            {cart
                              .filter((c) => c.type === "textbook")
                              .map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                                >
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">{item.grade}</p>
                                  </div>
                                  <span className="w-20 text-right text-sm font-medium">
                                    {formatR(item.price)}
                                  </span>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-muted-foreground"
                                    onClick={() => removeItem(item.id)}
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              ))}
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="sticky top-20">
                    <CardHeader>
                      <CardTitle className="font-display text-xl">Order summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        {uniformTotal > 0 && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Uniforms</span>
                            <span>{formatR(uniformTotal)}</span>
                          </div>
                        )}
                        {textbookTotal > 0 && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Textbooks</span>
                            <span>{formatR(textbookTotal)}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-border pt-3">
                          <span className="font-display text-lg">Total</span>
                          <span className="font-display text-xl text-primary">
                            {formatR(cartTotal)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs">
                            Full name <span className="text-crimson">*</span>
                          </Label>
                          <Input
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Parent/guardian name"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">
                            Learner's grade <span className="text-crimson">*</span>
                          </Label>
                          <Input
                            value={customerGrade}
                            onChange={(e) => setCustomerGrade(e.target.value)}
                            placeholder="e.g. Grade 7"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">
                            Phone number <span className="text-crimson">*</span>
                          </Label>
                          <Input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Email</Label>
                          <Input
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <Button
                        className="mt-6 w-full bg-gold text-gold-foreground hover:bg-gold/90"
                        disabled={!customerName || !customerGrade || !customerPhone}
                        onClick={handleSubmitOrder}
                      >
                        Place order — {formatR(cartTotal)}
                      </Button>
                      <p className="mt-3 text-center text-xs text-muted-foreground">
                        Payment is required before collection. See{" "}
                        <a href="/fees" className="text-primary underline">
                          Fees
                        </a>{" "}
                        for banking details.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
