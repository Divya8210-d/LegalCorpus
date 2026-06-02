'use client';
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";

const chips = ["Criminal Law", "Civil Law", "Property Law", "Constitutional Law", "Corporate Law", "Labour Law", "Tax Law", "Family Law"];

export function SearchDemo() {
  const [query, setQuery] = useState("Property dispute involving inheritance rights between siblings after father's intestate death");
  const [active, setActive] = useState<string[]>(["Property Law", "Civil Law"]);
  const toggle = (c: string) => setActive((a) => a.includes(c) ? a.filter((x) => x !== c) : [...a, c]);

  return (
    <section id="search" className="border-b border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Search Workspace" title="A research interface built for legal precision" subtitle="Describe a legal situation in natural language. IL-PCSR surfaces governing statutes and binding precedents in seconds." />

        <div className="mt-12 overflow-hidden rounded-md border border-border bg-card shadow-elegant">
          <div className="border-b border-border bg-muted/40 px-6 py-3 text-[11px] uppercase tracking-widest text-muted-foreground">
            Legal Query
          </div>
          <div className="p-6">
            <div className="flex items-start gap-4 rounded-sm border border-border bg-background p-4 focus-within:border-navy focus-within:ring-2 focus-within:ring-navy/10">
              <Search className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={3}
                placeholder="Describe a legal issue, paste a judgment, or enter a legal query..."
                className="flex-1 resize-none bg-transparent text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
              />
            </div>

            <div className="mt-5">
              <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Practice Areas
              </div>
              <div className="flex flex-wrap gap-2">
                {chips.map((c) => {
                  const on = active.includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() => toggle(c)}
                      className={`rounded-sm border px-3.5 py-1.5 text-xs font-medium transition-all ${
                        on ? "border-navy bg-navy text-background" : "border-border bg-background text-foreground/80 hover:border-navy/40 hover:text-navy"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                Semantic retrieval · Citation-aware ranking · Statute graph traversal
              </div>
              <button className="inline-flex items-center gap-2 rounded-sm bg-navy px-7 py-3 text-sm font-medium text-background transition-colors hover:bg-navy/90">
                <Search className="h-4 w-4" /> Retrieve Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, subtitle, align = "center" }: { eyebrow: string; title: string; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className={`mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-gold ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-gold" /> {eyebrow} <span className="h-px w-8 bg-gold" />
      </div>
      <h2 className="font-serif text-4xl text-navy md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-foreground/70">{subtitle}</p>}
    </div>
  );
}
