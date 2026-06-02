'use client';
import { FileText, Scale, BookMarked, ListChecks, NotebookPen } from "lucide-react";
import { SectionTitle } from "./search-demo";

export function Insights() {
  return (
    <section className="border-b border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="AI Legal Insights" title="A structured brief, not a chat transcript" subtitle="IL-PCSR distills retrieved materials into a research-grade analysis — formatted the way lawyers actually read." />

        <div className="mt-14 overflow-hidden rounded-md border border-border bg-card shadow-elegant">
          <div className="grid lg:grid-cols-[1fr_2fr]">
            <aside className="border-b border-border bg-navy p-7 text-background lg:border-b-0 lg:border-r">
              <div className="text-[11px] uppercase tracking-[0.22em] text-gold">Matter</div>
              <h3 className="mt-2 font-serif text-3xl text-background">Inheritance of ancestral immovable property</h3>
              <div className="my-6 h-px w-12 bg-gold" />
              <dl className="space-y-4 text-sm">
                <Field label="Jurisdiction" value="India · Hindu Personal Law" />
                <Field label="Issue Type" value="Property · Succession" />
                <Field label="Analysis Date" value="June 2026" />
                <Field label="Authorities Reviewed" value="4 statutes · 4 precedents" />
                <Field label="Confidence" value="High" />
              </dl>
            </aside>

            <div className="divide-y divide-border p-8">
              <Panel icon={FileText} title="Case Overview">
                The matter concerns devolution of coparcenary property where the propositus died intestate after the Hindu Succession (Amendment) Act, 2005. The dispute turns on whether the daughter is entitled to an equal share by birth and whether prior oral arrangements amount to a binding partition.
              </Panel>

              <Panel icon={ListChecks} title="Key Legal Issues">
                <ul className="space-y-2 text-sm">
                  <Bullet>Whether daughters have coparcenary rights by birth under the amended § 6 HSA.</Bullet>
                  <Bullet>Whether the 2005 amendment applies where the father pre-deceased 9 September 2005.</Bullet>
                  <Bullet>What constitutes a 'partition' under the proviso to § 6(5), and the evidentiary threshold.</Bullet>
                </ul>
              </Panel>

              <Panel icon={Scale} title="Relevant Statutes">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Chip>Hindu Succession Act, 1956 § 6</Chip>
                  <Chip>Transfer of Property Act, 1882 § 122</Chip>
                  <Chip>Indian Succession Act, 1925 § 63</Chip>
                  <Chip>Registration Act, 1908 § 17</Chip>
                </div>
              </Panel>

              <Panel icon={BookMarked} title="Important Precedents">
                <div className="space-y-2.5 text-sm">
                  <Authority name="Vineeta Sharma v. Rakesh Sharma" cite="(2020) 9 SCC 1" note="Binding · clarifies retrospective application of § 6" />
                  <Authority name="Arunachala Gounder v. Ponnusamy" cite="(2022) 11 SCC 520" note="Devolution of self-acquired property by inheritance" />
                  <Authority name="Prakash v. Phulavati" cite="(2016) 2 SCC 36" note="Partly overruled by Vineeta Sharma" />
                </div>
              </Panel>

              <Panel icon={NotebookPen} title="Research Notes">
                <p className="text-sm leading-relaxed text-foreground/75">
                  Vineeta Sharma resolves the conflict between Prakash v. Phulavati and Danamma v. Amar by holding that § 6 operates retroactively — the daughter's coparcenary right vests by birth and is unaffected by the father's status as on 9 September 2005. A registered deed under § 17 Registration Act remains the safest evidentiary anchor for any claimed partition.
                </p>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-background/60">{label}</dt>
      <dd className="mt-0.5 text-background">{value}</dd>
    </div>
  );
}

function Panel({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="py-6 first:pt-0 last:pb-0">
      <div className="mb-3 flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-gold" />
        <h4 className="font-serif text-lg text-navy">{title}</h4>
      </div>
      <div className="text-sm leading-relaxed text-foreground/80">{children}</div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-foreground/80">
      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
      <span>{children}</span>
    </li>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-border bg-background px-3 py-2 text-xs font-medium text-navy">{children}</div>
  );
}

function Authority({ name, cite, note }: { name: string; cite: string; note: string }) {
  return (
    <div className="rounded-sm border-l-2 border-gold bg-background px-3 py-2">
      <div className="font-medium text-navy">{name}</div>
      <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="font-mono">{cite}</span>
        <span className="h-1 w-1 rounded-full bg-border" />
        <span>{note}</span>
      </div>
    </div>
  );
}
