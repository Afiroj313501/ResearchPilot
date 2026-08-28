import type { ReactNode } from "react";

import {
  ArrowRight,
  BookOpen,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-[-250px] right-[-150px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Navigation */}
      <header className="relative border-b border-slate-800/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Sparkles size={21} />
            </div>

            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                ResearchPilot
              </h1>

              <p className="text-xs text-slate-500">
                AI Research Assistant
              </p>
            </div>
          </div>

          <div className="text-sm text-slate-400">
            Research Intelligence
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
            <Sparkles size={15} />
            AI-powered research intelligence
          </div>

          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Understand your research
            <span className="block text-cyan-400">
              with AI.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Upload research papers, ask questions, and get
            citation-grounded answers powered by semantic
            retrieval and AI.
          </p>

          <button
            type="button"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Start Researching
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mx-auto mt-20 grid max-w-5xl gap-5 md:grid-cols-3">
          <FeatureCard
            icon={<FileText size={22} />}
            title="Upload Papers"
            description="Add research papers and build your personal research knowledge base."
          />

          <FeatureCard
            icon={<MessageSquare size={22} />}
            title="Ask Questions"
            description="Ask natural-language questions about your uploaded research."
          />

          <FeatureCard
            icon={<BookOpen size={22} />}
            title="Cited Answers"
            description="Receive answers grounded in relevant document passages and pages."
          />
        </div>
      </section>
    </main>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur transition hover:border-cyan-400/30">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default App;