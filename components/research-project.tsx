'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Search, Zap, BookOpen, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Prior Case Retrieval',
    description: 'Advanced semantic search to find relevant precedents and judicial interpretations from across Indian courts.',
  },
  {
    icon: BookOpen,
    title: 'Statute Retrieval',
    description: 'Comprehensive indexing of all Indian statutes with section-level retrieval and cross-references.',
  },
  {
    icon: Zap,
    title: 'Semantic Matching',
    description: 'Neural network-based matching to identify legal concepts beyond keyword search, capturing legal intent.',
  },
  {
    icon: TrendingUp,
    title: 'Relevance Ranking',
    description: 'Intelligent ranking algorithm that prioritizes most authoritative and applicable legal precedents.',
  },
];

export function ResearchProject() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            About IL-PCSR
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive legal research platform combining semantic AI with legal expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="p-8 border-2 border-border/50 hover:border-primary/30 hover:shadow-lg transition group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-xl border-2 border-border/50 p-8 md:p-12">
          <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Research Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">50,000+</div>
              <p className="text-muted-foreground">Legal cases from Supreme Court, High Courts, and District Courts</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">10,000+</div>
              <p className="text-muted-foreground">Statutory provisions indexed from all major Indian legislation</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">Sub-Second</div>
              <p className="text-muted-foreground">Average retrieval time for complex multi-statute queries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
