'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Scale, FileText, Briefcase } from 'lucide-react';

interface LegalResult {
  type: 'statute' | 'case';
  id: string;
  title: string;
  citation?: string;
  relevance: number;
  description: string;
}

// Helper to extract a title (first line) and excerpt (next 200 chars) from legal text
function extractTitleAndExcerpt(text: string) {
  if (!text) return { title: 'Untitled Document', excerpt: '' };
  
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return { title: 'Untitled Document', excerpt: '' };
  
  let title = lines[0];
  if (title.length < 15 && lines.length > 1) {
    title = `${title} - ${lines[1]}`;
  }
  
  if (title.length > 80) {
    title = title.substring(0, 80) + '...';
  }
  
  const remainingText = lines.slice(1).join(' ') || lines[0];
  let excerpt = remainingText;
  if (excerpt.length > 200) {
    excerpt = excerpt.substring(0, 200) + '...';
  }
  
  return { title, excerpt };
}

export default function ChatPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LegalResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Restore search query and results on mount
  useEffect(() => {
    const savedQuery = localStorage.getItem('legal_search_query');
    const savedResults = localStorage.getItem('legal_search_results');
    if (savedQuery) {
      setQuery(savedQuery);
    }
    if (savedResults) {
      try {
        setResults(JSON.parse(savedResults));
        setHasSearched(true);
      } catch (e) {
        console.error('Failed to parse saved search results:', e);
      }
    }
  }, []);

  const performSearch = async (queryText: string) => {
    if (!queryText.trim()) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/retrieve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: queryText,
          top_k: 5,
          alpha: 0.7,
          run_llm: true
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();
      
      // Filter out empty responses
      const validStatutes = (data.statutes || []).filter((s: any) => s.text && s.text.trim().length > 0);
      const validPrecedents = (data.precedents || []).filter((p: any) => p.text && p.text.trim().length > 0);

      // Map live Statutes
      const statutesList = validStatutes.map((s: any) => {
        const parsed = extractTitleAndExcerpt(s.text);
        return {
          type: 'statute' as const,
          id: s.id,
          title: parsed.title,
          citation: `Lexical: ${(s.lexical_score * 100).toFixed(0)}% | Semantic: ${(s.semantic_score * 100).toFixed(0)}%`,
          relevance: Math.round(s.relevance_score * 100),
          description: parsed.excerpt
        };
      });

      // Map live Precedents
      const precedentsList = validPrecedents.map((p: any) => {
        const parsed = extractTitleAndExcerpt(p.text);
        return {
          type: 'case' as const,
          id: p.id,
          title: parsed.title,
          citation: `Lexical: ${(p.lexical_score * 100).toFixed(0)}% | Semantic: ${(p.semantic_score * 100).toFixed(0)}%${p.llm_verified ? ' | LLM Verified' : ''}`,
          relevance: Math.round(p.relevance_score * 100),
          description: parsed.excerpt
        };
      });

      const combinedResults = [...statutesList, ...precedentsList];
      setResults(combinedResults);
      setHasSearched(true);

      // Cache search state
      localStorage.setItem('legal_search_query', queryText);
      localStorage.setItem('legal_search_results', JSON.stringify(combinedResults));
    } catch (err) {
      console.error(err);
      setResults([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  const handleQuickSearch = (topic: string) => {
    setQuery(topic);
    performSearch(topic);
  };

  return (
    <main className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Legal Research Assistant</h1>
          </div>
          <div className="w-32" />
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col gap-3">
            <textarea
              placeholder="Enter your legal query in detail (e.g., inheritance rights, property dispute, criminal case facts)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full min-h-[160px] text-base p-4 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y placeholder:text-muted-foreground/60 leading-relaxed"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white gap-2 font-bold px-6 py-5 rounded-lg shadow-sm"
                disabled={isLoading}
              >
                <Send className="w-4 h-4" />
                Search Candidates
              </Button>
            </div>
          </div>
        </form>

        {/* Quick Search Suggestions */}
        {!hasSearched && (
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-4 font-semibold">Try searching for:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleQuickSearch('inheritance rights')}
                onKeyDown={(e) => e.key === 'Enter' && handleQuickSearch('inheritance rights')}
                className="p-4 border border-border/50 rounded-lg hover:bg-accent/5 hover:border-accent transition-colors text-left cursor-pointer"
              >
                <div className="font-semibold text-foreground text-sm">Inheritance Rights</div>
                <div className="text-xs text-muted-foreground mt-1">Hindu Succession Act</div>
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleQuickSearch('property dispute')}
                onKeyDown={(e) => e.key === 'Enter' && handleQuickSearch('property dispute')}
                className="p-4 border border-border/50 rounded-lg hover:bg-accent/5 hover:border-accent transition-colors text-left cursor-pointer"
              >
                <div className="font-semibold text-foreground text-sm">Property Dispute</div>
                <div className="text-xs text-muted-foreground mt-1">Transfer of Property Act</div>
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleQuickSearch('criminal case')}
                onKeyDown={(e) => e.key === 'Enter' && handleQuickSearch('criminal case')}
                className="p-4 border border-border/50 rounded-lg hover:bg-accent/5 hover:border-accent transition-colors text-left cursor-pointer"
              >
                <div className="font-semibold text-foreground text-sm">Criminal Case</div>
                <div className="text-xs text-muted-foreground mt-1">Indian Penal Code</div>
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleQuickSearch('contract dispute')}
                onKeyDown={(e) => e.key === 'Enter' && handleQuickSearch('contract dispute')}
                className="p-4 border border-border/50 rounded-lg hover:bg-accent/5 hover:border-accent transition-colors text-left cursor-pointer"
              >
                <div className="font-semibold text-foreground text-sm">Contract Dispute</div>
                <div className="text-xs text-muted-foreground mt-1">Indian Contract Act</div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Results */}
        {hasSearched && !isLoading && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Search Results</h2>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  Query: <span className="font-semibold text-foreground">"{query}"</span>
                </p>
              </div>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {results.length} results
              </Badge>
            </div>

            {/* Results by Category */}
            <div className="space-y-8">
              {/* Relevant Statutes/Sections */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Relevant Statutes & Sections</h3>
                </div>
                <div className="space-y-3">
                  {results.filter((r) => r.type === 'statute').length === 0 ? (
                    <div className="text-sm text-muted-foreground p-4 bg-muted/40 rounded-lg">No matching statutory provisions found.</div>
                  ) : (
                    results
                      .filter((r) => r.type === 'statute')
                      .map((result, idx) => (
                        <Link 
                          key={idx} 
                          href={`/detail?type=statute&id=${result.id}`} 
                          className="block group"
                        >
                          <Card className="p-5 border-l-4 border-l-primary hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-bold text-foreground group-hover:text-primary transition-colors text-[15px] leading-snug">{result.title}</h4>
                                {result.citation && (
                                  <p className="text-xs text-muted-foreground mt-1.5 font-mono">{result.citation}</p>
                                )}
                                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{result.description}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-lg border border-accent/10">
                                  <span className="text-lg font-bold text-accent">{result.relevance}%</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1 font-bold">Relevance</p>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      ))
                  )}
                </div>
              </div>

              {/* Relevant Prior Cases */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Relevant Prior Cases & Precedents</h3>
                </div>
                <div className="space-y-3">
                  {results.filter((r) => r.type === 'case').length === 0 ? (
                    <div className="text-sm text-muted-foreground p-4 bg-muted/40 rounded-lg">No matching precedent cases found.</div>
                  ) : (
                    results
                      .filter((r) => r.type === 'case')
                      .map((result, idx) => (
                        <Link 
                          key={idx} 
                          href={`/detail?type=case&id=${result.id}`} 
                          className="block group"
                        >
                          <Card className="p-5 border-l-4 border-l-secondary hover:border-secondary/50 hover:shadow-md transition-all duration-200 cursor-pointer">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-bold text-foreground group-hover:text-secondary transition-colors text-[15px] leading-snug">{result.title}</h4>
                                {result.citation && (
                                  <p className="text-xs text-muted-foreground mt-1.5 font-mono">{result.citation}</p>
                                )}
                                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{result.description}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-lg border border-secondary/10">
                                  <span className="text-lg font-bold text-secondary">{result.relevance}%</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1 font-bold">Relevance</p>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      ))
                  )}
                </div>
              </div>
            </div>

            {/* New Search Button */}
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setQuery('');
                  setHasSearched(false);
                  setResults([]);
                  localStorage.removeItem('legal_search_query');
                  localStorage.removeItem('legal_search_results');
                }}
              >
                Start New Search
              </Button>
            </div>
          </div>
        )}

        {/* No Results */}
        {hasSearched && !isLoading && results.length === 0 && (
          <Card className="p-12 text-center bg-muted/50">
            <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground mb-6">
              Try searching with different keywords or explore one of the suggestions above.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setQuery('');
                setHasSearched(false);
                setResults([]);
                localStorage.removeItem('legal_search_query');
                localStorage.removeItem('legal_search_results');
              }}
            >
              Try Again
            </Button>
          </Card>
        )}
      </div>
    </main>
  );
}
