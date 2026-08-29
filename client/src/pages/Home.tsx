import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  FileSearch,
  GitBranch,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-350px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute left-[-250px] top-[500px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-3xl" />

        <div className="absolute bottom-[-300px] right-[-200px] h-[600px] w-[600px] rounded-full bg-cyan-400/5 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Navbar */}
      <header className="relative z-20 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.08)] transition group-hover:border-cyan-400/40 group-hover:bg-cyan-400/15">
              <Sparkles size={21} />
            </div>

            <div className="text-left">
              <h1 className="text-lg font-bold tracking-tight">
                ResearchPilot
              </h1>

              <p className="text-[11px] tracking-wide text-slate-500">
                RESEARCH INTELLIGENCE
              </p>
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#workflow"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              How it works
            </a>

            <a
              href="#technology"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Technology
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white sm:block"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-400 hover:shadow-cyan-500/20"
            >
              Get Started
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Hero Copy */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                AI-powered research intelligence
              </div>

              <h2 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Your research.
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Understood by AI.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
                Upload research papers, build an intelligent knowledge base,
                and ask questions with answers grounded in your own documents.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:bg-cyan-400"
                >
                  Start Researching
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
                >
                  Sign in to ResearchPilot
                </button>
              </div>

              {/* Trust Points */}
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-cyan-400" />
                  Citation-grounded answers
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-cyan-400" />
                  Semantic document search
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-cyan-400" />
                  Private research workspace
                </span>
              </div>
            </div>

            {/* AI Interface Preview */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-cyan-500/5 blur-3xl" />

              <div className="relative rounded-3xl border border-slate-700/80 bg-slate-900/80 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
                {/* Window */}
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                  {/* Window Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Sparkles size={13} className="text-cyan-400" />
                      ResearchPilot AI
                    </div>
                  </div>

                  {/* Interface */}
                  <div className="p-5 sm:p-6">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                        <BookOpen size={19} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          Deep Learning Research
                        </p>
                        <p className="text-xs text-slate-500">
                          24 documents · 3,842 chunks
                        </p>
                      </div>
                    </div>

                    {/* Question */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                          <MessageSquare size={14} />
                        </div>

                        <p className="text-sm leading-6 text-slate-300">
                          What are the main factors affecting model
                          generalization?
                        </p>
                      </div>
                    </div>

                    {/* AI Answer */}
                    <div className="mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.025] p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                          <Sparkles size={14} />
                        </div>

                        <div>
                          <p className="text-sm leading-6 text-slate-300">
                            Model generalization is primarily influenced by
                            dataset diversity, model complexity, regularization,
                            and the relationship between training and unseen
                            data distributions.
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-cyan-300">
                              [1] Paper.pdf · p.4
                            </span>

                            <span className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-cyan-300">
                              [2] Survey.pdf · p.8
                            </span>

                            <span className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-cyan-300">
                              [3] Research.pdf · p.12
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
                      <Search size={16} className="text-slate-600" />

                      <span className="text-xs text-slate-600">
                        Ask anything about your research...
                      </span>

                      <div className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500 text-slate-950">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-slate-700 bg-slate-900/95 px-4 py-3 shadow-xl backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-400/10 text-green-400">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-200">
                      Grounded Response
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Sources verified
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 border-t border-slate-800/70"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Research workspace
            </p>

            <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to work with research papers.
            </h3>

            <p className="mt-4 leading-7 text-slate-400">
              ResearchPilot turns static documents into an interactive,
              searchable knowledge base.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Upload size={21} />}
              title="Upload Papers"
              description="Upload PDF research papers and automatically prepare them for intelligent retrieval."
            />

            <FeatureCard
              icon={<FileSearch size={21} />}
              title="Semantic Search"
              description="Find the most relevant passages using vector-based semantic retrieval."
            />

            <FeatureCard
              icon={<Brain size={21} />}
              title="RAG Intelligence"
              description="Generate answers using retrieved evidence from your own research collection."
            />

            <FeatureCard
              icon={<MessageSquare size={21} />}
              title="Research Chat"
              description="Ask natural-language questions and explore your knowledge base conversationally."
            />
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section
        id="workflow"
        className="relative z-10 border-t border-slate-800/70 bg-slate-900/30"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Simple workflow
            </p>

            <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From paper to insight.
            </h3>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
              A research workflow designed around your documents, not generic
              AI responses.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <WorkflowCard
              number="01"
              icon={<Upload size={20} />}
              title="Upload"
              description="Add your research papers to a focused collection."
            />

            <WorkflowCard
              number="02"
              icon={<Zap size={20} />}
              title="Process"
              description="ResearchPilot extracts, chunks, embeds, and indexes your documents."
            />

            <WorkflowCard
              number="03"
              icon={<MessageSquare size={20} />}
              title="Ask"
              description="Ask questions and receive answers grounded in your research."
            />
          </div>
        </div>
      </section>

      {/* Technology */}
      <section
        id="technology"
        className="relative z-10 border-t border-slate-800/70"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Built for intelligent research
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight">
                  Modern RAG architecture.
                </h3>

                <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                  ResearchPilot combines full-stack application development,
                  vector search, embeddings, and generative AI into one
                  research-focused platform.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    "React",
                    "Node.js",
                    "Express",
                    "PostgreSQL",
                    "pgvector",
                    "Prisma",
                    "Gemini",
                    "RAG",
                  ].map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-400"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden h-32 w-32 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-400/5 lg:flex">
                <Brain
                  size={52}
                  strokeWidth={1.3}
                  className="text-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-slate-800/70">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
            <Sparkles size={25} />
          </div>

          <h3 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Turn your papers into an
            <span className="text-cyan-400"> intelligent workspace.</span>
          </h3>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
            Stop searching through dozens of PDFs manually. Build your
            research knowledge base and start asking better questions.
          </p>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
          >
            Create Your Workspace
            <ArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-sm font-semibold">ResearchPilot</span>
          </div>

          <p className="text-xs text-slate-600">
            AI-powered research intelligence platform
          </p>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs text-slate-500 transition hover:text-slate-300"
          >
            <GitBranch size={15} />
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-slate-900/70">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/10 text-cyan-400 transition group-hover:border-cyan-400/20">
        {icon}
      </div>

      <h4 className="mt-5 font-semibold">{title}</h4>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

interface WorkflowCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function WorkflowCard({
  number,
  icon,
  title,
  description,
}: WorkflowCardProps) {
  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-950/60 p-7">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest text-cyan-400">
          {number}
        </span>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-cyan-400">
          {icon}
        </div>
      </div>

      <h4 className="mt-8 text-lg font-semibold">{title}</h4>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default Home;