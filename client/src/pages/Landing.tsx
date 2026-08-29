import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  FileText,
  MessageSquareText,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-350px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute left-[-250px] top-[35%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute bottom-[-300px] right-[-200px] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header className="relative z-20 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
          {/* Logo */}

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 transition duration-300 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/15">
              <Sparkles size={20} />

              <span className="absolute inset-0 rounded-xl bg-cyan-400/10 opacity-0 blur-md transition group-hover:opacity-100" />
            </div>

            <div className="text-left">
              <h1 className="text-base font-bold tracking-tight">
                ResearchPilot
              </h1>

              <p className="text-[11px] text-slate-500">
                Research Intelligence
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
              className="group inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Get Started
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>

              AI-powered research intelligence
            </div>

            {/* Heading */}

            <h2 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Your research.
              <br />

              <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Supercharged by AI.
              </span>
            </h2>

            {/* Description */}

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Upload research papers, build intelligent knowledge bases,
              and ask questions with answers grounded directly in your
              documents.
            </p>

            {/* CTA */}

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:bg-cyan-400 sm:w-auto"
              >
                Start Researching
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/50 px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-900 hover:text-white sm:w-auto"
              >
                Explore Features
              </button>
            </div>

            {/* Trust points */}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-cyan-400" />
                Citation-grounded answers
              </span>

              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-cyan-400" />
                Semantic search
              </span>

              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-cyan-400" />
                Private research workspace
              </span>
            </div>
          </div>

          {/* =================================================
              PRODUCT PREVIEW
          ================================================== */}

          <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
            <div className="absolute -inset-10 -z-10 rounded-[40px] bg-cyan-500/5 blur-3xl" />

            <div className="overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/80 shadow-2xl shadow-black/40 backdrop-blur-xl">
              {/* Browser bar */}

              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                </div>

                <div className="hidden rounded-md border border-slate-800 bg-slate-950 px-20 py-1 text-[10px] text-slate-600 sm:block">
                  app.researchpilot.ai
                </div>

                <div className="h-5 w-5" />
              </div>

              {/* App preview */}

              <div className="grid min-h-[390px] md:grid-cols-[210px_1fr]">
                {/* Sidebar */}

                <div className="hidden border-r border-slate-800 bg-slate-950/60 p-4 md:block">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Sparkles size={15} className="text-cyan-400" />
                    ResearchPilot
                  </div>

                  <div className="mt-8 space-y-1">
                    <PreviewNav
                      icon={<BookOpen size={14} />}
                      label="Collections"
                      active
                    />

                    <PreviewNav
                      icon={<FileText size={14} />}
                      label="Documents"
                    />

                    <PreviewNav
                      icon={<MessageSquareText size={14} />}
                      label="Research Chat"
                    />
                  </div>

                  <div className="mt-10 rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-3">
                    <p className="text-[10px] font-semibold text-cyan-300">
                      KNOWLEDGE BASE
                    </p>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Deepfake Detection Research
                    </p>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-[78%] rounded-full bg-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* Main preview */}

                <div className="relative p-5 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400">
                        Research Collection
                      </p>

                      <h3 className="mt-1 text-lg font-semibold">
                        Deepfake Detection
                      </h3>
                    </div>

                    <div className="hidden rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-500 sm:block">
                      24 papers
                    </div>
                  </div>

                  {/* Search */}

                  <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3">
                    <Search size={16} className="text-slate-600" />

                    <span className="text-xs text-slate-600">
                      Ask your research papers anything...
                    </span>
                  </div>

                  {/* Research cards */}

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <PreviewDocument
                      title="Multimodal Deepfake Detection"
                      meta="Research Paper · 12 pages"
                    />

                    <PreviewDocument
                      title="Deepfake Detection with EfficientNet"
                      meta="Research Paper · 9 pages"
                    />

                    <PreviewDocument
                      title="Human Perception of Deepfakes"
                      meta="Research Paper · 15 pages"
                    />

                    <PreviewDocument
                      title="Audio-Visual Forgery Analysis"
                      meta="Research Paper · 11 pages"
                    />
                  </div>

                  {/* AI answer */}

                  <div className="mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                        <BrainCircuit size={14} />
                      </div>

                      <span className="text-xs font-semibold">
                        ResearchPilot AI
                      </span>

                      <span className="ml-auto text-[10px] text-slate-600">
                        4 sources
                      </span>
                    </div>

                    <p className="mt-3 text-xs leading-5 text-slate-400">
                      Multimodal approaches improve deepfake detection by
                      combining complementary visual and audio evidence,
                      allowing the system to identify inconsistencies that
                      may be missed by a single modality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}

      <section
        id="features"
        className="border-y border-slate-800/70 bg-slate-900/20"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Built for researchers"
            title="Everything you need to understand your papers."
            description="ResearchPilot turns scattered research documents into an intelligent, searchable knowledge base."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Upload size={21} />}
              title="Research Paper Upload"
              description="Upload PDF papers and turn them into structured, searchable research knowledge."
            />

            <FeatureCard
              icon={<Network size={21} />}
              title="Semantic Retrieval"
              description="Find relevant passages using meaning rather than relying only on exact keyword matches."
            />

            <FeatureCard
              icon={<BrainCircuit size={21} />}
              title="AI-Powered Answers"
              description="Ask natural-language questions and receive answers generated from your research collection."
            />

            <FeatureCard
              icon={<FileSearch size={21} />}
              title="Citation-Grounded"
              description="Trace AI answers back to the document passages that support them."
            />

            <FeatureCard
              icon={<MessageSquareText size={21} />}
              title="Research Conversations"
              description="Maintain focused conversations around your research and revisit previous questions."
            />

            <FeatureCard
              icon={<ShieldCheck size={21} />}
              title="Private Workspace"
              description="Keep your research organized in personal collections with authenticated access."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          WORKFLOW
      ====================================================== */}

      <section id="workflow">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Simple workflow"
            title="From paper to insight in three steps."
            description="ResearchPilot handles the heavy lifting so you can focus on understanding the research."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <WorkflowCard
              number="01"
              icon={<Upload size={21} />}
              title="Upload"
              description="Add your research papers to a collection. ResearchPilot extracts and processes the document content."
            />

            <WorkflowCard
              number="02"
              icon={<Zap size={21} />}
              title="Understand"
              description="Your papers are transformed into searchable knowledge chunks and semantic embeddings."
            />

            <WorkflowCard
              number="03"
              icon={<MessageSquareText size={21} />}
              title="Ask"
              description="Ask questions about your research and receive answers grounded in the papers you uploaded."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNOLOGY
      ====================================================== */}

      <section
        id="technology"
        className="border-y border-slate-800/70 bg-slate-900/20"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Research intelligence
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Search by meaning,
              <br />
              not just keywords.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              ResearchPilot uses retrieval-augmented generation to connect
              your questions with the most relevant passages from your own
              research collection before generating an answer.
            </p>

            <div className="mt-8 space-y-4">
              <TechPoint
                icon={<Search size={17} />}
                title="Semantic retrieval"
                description="Relevant knowledge is retrieved based on contextual meaning."
              />

              <TechPoint
                icon={<BrainCircuit size={17} />}
                title="Context-aware generation"
                description="Retrieved research context is supplied to the AI before answering."
              />

              <TechPoint
                icon={<FileText size={17} />}
                title="Source awareness"
                description="Answers remain connected to the underlying research documents."
              />
            </div>
          </div>

          {/* RAG visual */}

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-cyan-500/5 blur-3xl" />

            <div className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <BrainCircuit size={17} className="text-cyan-400" />

                  <span className="text-sm font-semibold">
                    Retrieval Pipeline
                  </span>
                </div>

                <span className="rounded-full border border-emerald-400/10 bg-emerald-400/5 px-2 py-1 text-[10px] text-emerald-400">
                  READY
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <PipelineStep
                  number="01"
                  title="User Question"
                  value="How does multimodal detection improve accuracy?"
                />

                <PipelineLine />

                <PipelineStep
                  number="02"
                  title="Semantic Retrieval"
                  value="Top relevant research passages"
                />

                <PipelineLine />

                <PipelineStep
                  number="03"
                  title="AI Generation"
                  value="Context-grounded response"
                />

                <PipelineLine />

                <PipelineStep
                  number="04"
                  title="Citations"
                  value="Supporting research sources"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section>
        <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
            <Sparkles size={24} />
          </div>

          <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to build your research workspace?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Upload your papers, ask better questions, and turn your research
            library into an intelligent knowledge base.
          </p>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-400"
          >
            Create your workspace

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-slate-800/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-cyan-500" />
            <span>ResearchPilot</span>
          </div>

          <p>
            AI-powered research intelligence for modern researchers.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
        {description}
      </p>
    </div>
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
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-slate-900/70">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/5 text-cyan-400 transition group-hover:border-cyan-400/20 group-hover:bg-cyan-400/10">
        {icon}
      </div>

      <h3 className="mt-5 text-base font-semibold">{title}</h3>

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
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-7">
      <span className="absolute right-6 top-6 text-xs font-bold text-slate-700">
        {number}
      </span>

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

interface TechPointProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function TechPoint({
  icon,
  title,
  description,
}: TechPointProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

interface PreviewNavProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function PreviewNav({
  icon,
  label,
  active,
}: PreviewNavProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${
        active
          ? "bg-cyan-400/10 text-cyan-300"
          : "text-slate-600"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

interface PreviewDocumentProps {
  title: string;
  meta: string;
}

function PreviewDocument({
  title,
  meta,
}: PreviewDocumentProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 transition hover:border-slate-700">
      <div className="flex gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
          <FileText size={14} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-slate-300">
            {title}
          </p>

          <p className="mt-1 text-[10px] text-slate-600">
            {meta}
          </p>
        </div>
      </div>
    </div>
  );
}

interface PipelineStepProps {
  number: string;
  title: string;
  value: string;
}

function PipelineStep({
  number,
  title,
  value,
}: PipelineStepProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-[10px] font-bold text-cyan-400">
        {number}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
          {title}
        </p>

        <p className="mt-1 truncate text-xs text-slate-400">
          {value}
        </p>
      </div>
    </div>
  );
}

function PipelineLine() {
  return (
    <div className="ml-7 h-3 w-px bg-gradient-to-b from-cyan-400/30 to-transparent" />
  );
}

export default Landing;