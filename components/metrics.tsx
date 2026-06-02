'use client';

const stats = [
  { value: "50,000+", label: "Legal Cases Indexed", sub: "Supreme Court, High Courts & Tribunals" },
  { value: "10,000+", label: "Statutory Provisions", sub: "Central & State legislation" },
  { value: "95%", label: "Retrieval Accuracy", sub: "On benchmark evaluation set" },
  { value: "Sub-Second", label: "Search Experience", sub: "Median end-to-end latency" },
];

export function Metrics() {
  return (
    <section id="features" className="border-b border-border bg-navy py-20 text-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-3 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.22em] text-gold">
            <span className="h-px w-8 bg-gold" /> By the numbers <span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-serif text-4xl text-background md:text-5xl">A corpus built for serious research</h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-md bg-background/15 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-navy px-7 py-9">
              <div className="font-serif text-5xl text-background">{s.value}</div>
              <div className="mt-3 h-px w-8 bg-gold" />
              <div className="mt-3 text-sm font-medium text-background">{s.label}</div>
              <div className="mt-1 text-xs text-background/60">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
