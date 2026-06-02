'use client';
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Scale } from "lucide-react";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Research", href: "/#research" },
  { label: "Knowledge Graph", href: "/#graph" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href={"/"} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-navy">
            <Scale className="h-5 w-5 text-background" strokeWidth={1.5} />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-lg font-semibold text-navy">IL-PCSR</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Legal Research</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-9">
          {navItems.map((i) => (
            <a key={i.href} href={i.href} className="text-sm text-foreground/80 transition-colors hover:text-navy">
              {i.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link href={"/search"} className="inline-flex items-center rounded-sm border border-navy bg-navy px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-navy/90 hover:shadow-elegant">
            Start Research
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6 text-navy" /> : <Menu className="h-6 w-6 text-navy" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="space-y-3 px-6 py-4">
            {navItems.map((i) => (
              <a key={i.href} href={i.href} onClick={() => setOpen(false)} className="block text-sm text-foreground/80">{i.label}</a>
            ))}
            <Link href={"/search"} onClick={() => setOpen(false)} className="block rounded-sm bg-navy px-4 py-2.5 text-center text-sm text-background">Start Research</Link>
          </div>
        </div>
      )}
    </header>
  );
}
