'use client';
import { Scale } from "lucide-react";

const cols = [
  { title: "About", items: ["Project IL-PCSR", "Research Team", "Methodology", "Publications"] },
  { title: "Research", items: ["Corpus Statistics", "Benchmark Results", "Evaluation Protocol", "Case Studies"] },
  { title: "Documentation", items: ["Getting Started", "Search Syntax", "Citation Format", "API Reference"] },
  { title: "Contact", items: ["Academic Inquiries", "Collaborations", "Press", "Feedback"] },
];

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2.4fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-navy">
                <Scale className="h-5 w-5 text-background" strokeWidth={1.5} />
              </div>
              <div className="leading-tight">
                <div className="font-serif text-lg font-semibold text-navy">IL-PCSR</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Indian Legal Retrieval</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/70">
              A research platform for retrieval of Indian statutes and legal precedents, built to support advocates, the judiciary, and academic scholarship.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-navy">{c.title}</div>
                <ul className="space-y-2.5">
                  {c.items.map((i) => (
                    <li key={i}><a href="#" className="text-sm text-foreground/70 transition-colors hover:text-navy">{i}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <div className="rounded-sm border-l-2 border-gold bg-muted/40 px-5 py-4 text-xs leading-relaxed text-foreground/70">
            <span className="font-semibold text-navy">Disclaimer · </span>
            IL-PCSR is a legal research assistance platform developed for retrieval of statutes and precedents. Results are intended for research and educational purposes and do not constitute legal advice.
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} IL-PCSR Research Initiative. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-navy">Privacy</a>
              <a href="#" className="hover:text-navy">Terms</a>
              <a href="#" className="hover:text-navy">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
