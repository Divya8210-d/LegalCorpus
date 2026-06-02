'use client';

import { SectionTitle } from "./search-demo";

type Node = { id: string; x: number; y: number; label: string; sub: string; type: "case" | "statute" };

const nodes: Node[] = [
  { id: "c1", x: 50, y: 18, label: "Vineeta Sharma", sub: "(2020) 9 SCC 1", type: "case" },
  { id: "s1", x: 18, y: 42, label: "HSA § 6", sub: "Hindu Succession Act", type: "statute" },
  { id: "s2", x: 82, y: 42, label: "TPA § 122", sub: "Transfer of Property", type: "statute" },
  { id: "c2", x: 28, y: 72, label: "Prakash v. Phulavati", sub: "(2016) 2 SCC 36", type: "case" },
  { id: "c3", x: 50, y: 88, label: "Danamma v. Amar", sub: "(2018) 3 SCC 343", type: "case" },
  { id: "c4", x: 72, y: 72, label: "Arunachala Gounder", sub: "(2022) 11 SCC 520", type: "case" },
  { id: "s3", x: 50, y: 50, label: "ISA § 63", sub: "Indian Succession Act", type: "statute" },
];

const edges: [string, string][] = [
  ["c1", "s1"], ["c1", "s3"], ["c1", "c2"], ["c1", "c3"], ["c2", "s1"],
  ["c3", "s1"], ["c4", "s1"], ["c4", "s2"], ["c3", "s3"], ["s1", "s3"],
];

export function KnowledgeGraph() {
  const map = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <section className="border-b border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Legal Knowledge Graph" title="Precedents and statutes, visibly connected" subtitle="Every retrieval traverses a citation network linking cases to the statutes they interpret and the authorities they follow." />

        <div className="relative mt-14 overflow-hidden rounded-md border border-border bg-card shadow-elegant">
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-2.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>Citation Network · Inheritance Cluster</span>
            <div className="flex items-center gap-4">
              <Legend color="var(--navy)" label="Case" />
              <Legend color="var(--gold)" label="Statute" />
            </div>
          </div>

          <div className="relative aspect-[16/10] w-full">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <defs>
                <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                  <path d="M 5 0 L 0 0 0 5" fill="none" stroke="var(--border)" strokeWidth="0.1" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
              {edges.map(([a, b], i) => {
                const A = map[a], B = map[b];
                return (
                  <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                    stroke="var(--steel)" strokeWidth="0.18" strokeOpacity="0.5" strokeDasharray="0.6 0.4" />
                );
              })}
            </svg>

            {nodes.map((n) => (
              <div
                key={n.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <div className={`min-w-[140px] rounded-sm border bg-card px-3 py-2 shadow-card transition-transform hover:scale-105 ${
                  n.type === "case" ? "border-navy/40" : "border-gold/50"
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${n.type === "case" ? "bg-navy" : "bg-gold"}`} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {n.type === "case" ? "Judgment" : "Statute"}
                    </span>
                  </div>
                  <div className="mt-1 text-[13px] font-medium leading-tight text-navy">{n.label}</div>
                  <div className="text-[10px] text-muted-foreground">{n.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-px border-t border-border bg-border sm:grid-cols-3">
            <GraphStat label="Nodes in Cluster" value="7" />
            <GraphStat label="Citation Edges" value="12" />
            <GraphStat label="Authoritative Depth" value="3 hops" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      <span>{label}</span>
    </div>
  );
}

function GraphStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card px-5 py-4">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-serif text-2xl text-navy">{value}</div>
    </div>
  );
}
