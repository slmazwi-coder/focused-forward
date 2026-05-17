import { Link } from "@tanstack/react-router";
import logo from "@/assets/school-logo.png";
import { Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="h-1 bg-band" />
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-14 w-auto" />
            <div>
              <div className="font-display text-xl">Focused Combined School</div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">Deo Volenté</div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm text-primary-foreground/80">
            An independent combined school in Matatiele, educating learners from Grade R to Grade 12
            with discipline, faith and academic excellence since our founding.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Visit</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" />35 Taylor Street, Matatiele, Eastern Cape 4730</li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-gold" />039 737 3679</li>
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-gold" />admin@focused.co.za</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
            <li><Link to="/about" className="hover:text-gold">About the school</Link></li>
            <li><Link to="/academics" className="hover:text-gold">Academics</Link></li>
            <li><Link to="/sports" className="hover:text-gold">Sport &amp; culture</Link></li>
            <li><Link to="/admissions" className="hover:text-gold">Admissions</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/60 md:flex-row">
          <span>© {new Date().getFullYear()} Focused Combined School. EMIS 200501589 · Exam Centre 4252012.</span>
          <span>Principal: Mr LLJ Van Rooyen</span>
        </div>
      </div>
    </footer>
  );
}
