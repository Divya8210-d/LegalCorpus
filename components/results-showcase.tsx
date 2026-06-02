'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookMarked, Eye, Save } from 'lucide-react';

const statutes = [
  {
    name: 'Hindu Succession Act, 1956',
    section: 'Section 8 - Devolution of property',
    description: 'Prescribes the order of succession to Hindu property and devolution of ancestral property among legal heirs.',
    relevance: 94,
  },
  {
    name: 'Transfer of Property Act, 1882',
    section: 'Section 14 - Transfer to several persons',
    description: 'Defines the transfer of property rights to multiple beneficiaries and conditions for such transfers.',
    relevance: 87,
  },
  {
    name: 'Indian Succession Act, 1925',
    section: 'Section 32 - Order of succession',
    description: 'Establishes the general order of succession for non-Hindu testamentary and intestate succession.',
    relevance: 82,
  },
];

const cases = [
  {
    name: 'Badri Prasad v. Smt. Naraini Devi',
    court: 'Supreme Court of India',
    year: 2015,
    citation: '(2015) 5 SCC 340',
    summary: 'Landmark judgment establishing the rights of female descendants in succession to ancestral property under Hindu law.',
    relevance: 96,
  },
  {
    name: 'Prakash v. State of U.P.',
    court: 'Allahabad High Court',
    year: 2018,
    citation: '2018 (8) ADJ 625',
    summary: 'Clarifies the distinction between separate and joint family property in the context of inheritance rights.',
    relevance: 91,
  },
  {
    name: 'Leila Banu v. Chowdhury Ahmed',
    court: 'Delhi High Court',
    year: 2019,
    citation: '2019 (11) DLT 481',
    summary: 'Addresses the application of Hindu Succession Act to succession of movable and immovable property.',
    relevance: 88,
  },
];

export function ResultsShowcase() {
  return (
    <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            Retrieval Results
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive legal research findings with statutes and precedents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Statutes Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-foreground flex items-center gap-2 mb-6">
              <BookMarked className="w-6 h-6 text-primary" />
              Relevant Statutes
            </h3>
            <div className="space-y-4">
              {statutes.map((statute, idx) => (
                <Card key={idx} className="p-6 border-2 border-border/50 hover:border-primary/30 transition">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-foreground">{statute.name}</h4>
                      <p className="text-sm font-medium text-accent mt-1">{statute.section}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{statute.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground">RELEVANCE</span>
                        <span className="text-lg font-bold text-primary">{statute.relevance}%</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Cases Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-foreground flex items-center gap-2 mb-6">
              <BookMarked className="w-6 h-6 text-primary" />
              Relevant Cases
            </h3>
            <div className="space-y-4">
              {cases.map((caseItem, idx) => (
                <Card key={idx} className="p-6 border-2 border-border/50 hover:border-primary/30 transition">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-foreground">{caseItem.name}</h4>
                      <p className="text-xs font-medium text-muted-foreground mt-1">{caseItem.court} • {caseItem.year}</p>
                      <p className="text-sm font-mono text-accent mt-1">{caseItem.citation}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{caseItem.summary}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground">RELEVANCE</span>
                        <span className="text-lg font-bold text-primary">{caseItem.relevance}%</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
