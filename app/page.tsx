import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero-section';
import { Metrics } from '@/components/metrics';
import { ResearchProject } from '@/components/research-project';
import { KnowledgeGraph } from '@/components/knowledge-graph';
import { Footer } from '@/components/footer';


export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero/>
      <Metrics/>
      <ResearchProject />
      <KnowledgeGraph />
      <Footer />
    </main>
  );
}
