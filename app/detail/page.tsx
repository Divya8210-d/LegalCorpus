'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Scale, FileText, Briefcase } from 'lucide-react';

function DetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const type = searchParams.get('type');

  const [loading, setLoading] = useState(true);
  const [documentData, setDocumentData] = useState<{ text: string; paragraphs: [string, string][] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !type) return;

    const fetchDocument = async () => {
      setLoading(true);
      setError(null);
      const endpoint = type === 'statute' ? 'statutes' : 'precedents';
      try {
        const response = await fetch(`https://divyanshu8210-il-pcsr-backend.hf.space/api/v1/${endpoint}/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDocumentData(data);
        } else {
          setError('Failed to load document details from the server.');
        }
      } catch (e) {
        setError('Error communicating with backend server.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id, type]);

  if (!id || !type) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <h3 className="text-lg font-semibold text-foreground">Invalid Request</h3>
        <p className="text-muted-foreground mt-2 text-sm">Missing document ID or type parameters.</p>
        <Link href="/search" className="mt-6 inline-block">
          <Button>Back to Search</Button>
        </Link>
      </div>
    );
  }

  // Helper to extract a nice title from text
  const getDocTitle = () => {
    if (!documentData || !documentData.text) return type === 'statute' ? 'Statute Section' : 'Precedent Judgment';
    const lines = documentData.text.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return type === 'statute' ? 'Statute Section' : 'Precedent Judgment';
    
    let title = lines[0];
    if (title.length < 15 && lines.length > 1) {
      title = `${title} - ${lines[1]}`;
    }
    return title.length > 100 ? title.substring(0, 100) + '...' : title;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header buttons */}
      <div className="flex items-center justify-between mb-8 border-b border-border/50 pb-4">
        <Link href="/search">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          {type === 'statute' ? (
            <FileText className="w-5 h-5 text-primary" />
          ) : (
            <Briefcase className="w-5 h-5 text-secondary" />
          )}
          <Badge variant="outline" className={type === 'statute' ? 'bg-primary/5 text-primary border-primary/10' : 'bg-secondary/5 text-secondary border-secondary/15'}>
            {type === 'statute' ? 'Statutory Provision' : 'Case Precedent'}
          </Badge>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col justify-center items-center py-20 gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <span className="text-sm text-muted-foreground">Retrieving document contents...</span>
        </div>
      )}

      {error && (
        <Card className="p-6 border-destructive/20 bg-destructive/5 text-center my-6">
          <Scale className="w-12 h-12 text-destructive-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-destructive-foreground mb-2">Error Loading Document</h3>
          <p className="text-muted-foreground text-sm">{error}</p>
        </Card>
      )}

      {documentData && !loading && (
        <article className="space-y-6">
          <div className="pb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-serif leading-tight">{getDocTitle()}</h1>
          </div>

          <div className="space-y-6">
            {documentData.paragraphs && documentData.paragraphs.length > 0 ? (
              documentData.paragraphs.map(([role, content], idx) => {
                const normRole = role ? role.toLowerCase() : '';
                let roleColor = 'bg-muted text-muted-foreground border-border';
                if (normRole.includes('fact')) roleColor = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
                else if (normRole.includes('argument')) roleColor = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
                else if (normRole.includes('decision') || normRole.includes('ratio')) roleColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                else if (normRole.includes('statute')) roleColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                else if (normRole.includes('precedent')) roleColor = 'bg-teal-500/10 text-teal-400 border-teal-500/20';

                return (
                  <div key={idx} className="p-5 border border-border bg-card/50 rounded-xl hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-center mb-3">
                      {role && (
                        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold border ${roleColor}`}>
                          {role}
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground font-mono">Paragraph #{idx + 1}</span>
                    </div>
                    <p className="text-foreground leading-relaxed whitespace-pre-line text-justify font-serif text-[15px] sm:text-base">
                      {content}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="p-6 border border-border bg-card rounded-xl text-justify font-serif leading-relaxed whitespace-pre-wrap text-base">
                {documentData.text}
              </div>
            )}
          </div>
        </article>
      )}
    </div>
  );
}

export default function DetailPage() {
  return (
    <main className="bg-background min-h-screen">
      <Suspense fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }>
        <DetailContent />
      </Suspense>
    </main>
  );
}
