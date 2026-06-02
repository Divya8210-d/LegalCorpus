"use client"

import { Search, FileText, Gavel, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-10 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, var(--navy) 1px, transparent 0)",
        backgroundSize: "32px 32px"
      }} />
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-sm border border-border bg-card px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Indian Legal Retrieval System</span>
          </div>
          <h1 className="font-serif text-5xl leading-[1.05] text-navy md:text-6xl">
            Intelligent Retrieval of <em className="text-gold not-italic">Indian Statutes</em> and Legal Precedents
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/75">
            Search legal situations, discover relevant statutes, and retrieve important precedents using advanced legal retrieval technology built for researchers, advocates, and the judiciary.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={"/search"}  className="group inline-flex items-center gap-2 rounded-sm bg-navy px-6 py-3.5 text-sm font-medium text-background transition-all hover:bg-navy/90 hover:shadow-elegant">
              Try Legal Search
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href="#research" className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-6 py-3.5 text-sm font-medium text-navy transition-colors hover:border-navy">
              Explore Research
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div>Trusted by academic & legal researchers</div>
            <div className="h-4 w-px bg-border" />
            <div>Built on Indian case law corpus</div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-md bg-gradient-to-br from-accent/40 to-transparent" />
          <div className="overflow-hidden rounded-md border border-border bg-card shadow-elegant">
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">il-pcsr / search</div>
            </div>
            <div className="space-y-5 p-5">
              <div className="flex items-center gap-3 rounded-sm border border-border bg-background px-3.5 py-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Property dispute involving inheritance rights</span>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-gold" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Relevant Statutes</span>
                </div>
                <div className="space-y-2">
                  <PreviewRow title="Hindu Succession Act, 1956" meta="§ 6 — Devolution of coparcenary property" score={94} />
                  <PreviewRow title="Transfer of Property Act, 1882" meta="§ 122 — Gift" score={88} />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Gavel className="h-3.5 w-3.5 text-gold" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Relevant Cases</span>
                </div>
                <div className="space-y-2">
                  <PreviewRow title="Vineeta Sharma v. Rakesh Sharma" meta="Supreme Court of India, 2020" score={96} />
                  <PreviewRow title="Prakash v. Phulavati" meta="Supreme Court of India, 2016" score={89} />
                </div>
              </div>

              <div className="rounded-sm border border-gold/30 bg-gold/[0.06] p-4">
                <div className="mb-1.5 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">AI Insight</span>
                </div>
                <p className="text-xs leading-relaxed text-foreground/80">
                  Daughters are coparceners by birth under § 6 HSA (post-2005 amendment), with equal succession rights. Vineeta Sharma (2020) clarifies retrospective application irrespective of the father's status on 9 September 2005.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewRow({ title, meta, score }: { title: string; meta: string; score: number }) {
  return (
    <div className="flex items-center justify-between rounded-sm border border-border bg-background px-3 py-2.5">
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-navy">{title}</div>
        <div className="truncate text-xs text-muted-foreground">{meta}</div>
      </div>
      <div className="ml-3 shrink-0 rounded-sm border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-semibold text-navy">{score}%</div>
    </div>
  );
}
