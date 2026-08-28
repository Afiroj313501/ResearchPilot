import {
  BookOpen,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";

function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-[-250px] right-[-150px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Header */}
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
                Research Intelligence
              </p>
            </div>
          </div>

          <span className="text-sm text-slate-400">
            Dashboard
          </span>
        </div>
      </header>

      {/* Content */}
      <section className="relative mx-auto max-w-7xl px-6 py-12">
        <div>
          <p className="text-sm font-medium text-cyan-400">
            Research Workspace
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Welcome to ResearchPilot
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Upload research papers, organize your knowledge base,
            and ask AI-powered questions with citation-grounded
            answers.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <DashboardCard
            icon={<FileText size={22} />}
            title="Documents"
            description="Upload and manage your research papers."
          />

          <DashboardCard
            icon={<BookOpen size={22} />}
            title="Collections"
            description="Organize papers into focused research collections."
          />

          <DashboardCard
            icon={<MessageSquare size={22} />}
            title="Research Chat"
            description="Ask questions and receive citation-grounded answers."
          />
        </div>
      </section>
    </main>
  );
}

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function DashboardCard({
  icon,
  title,
  description,
}: DashboardCardProps) {
  return (
    <button
      type="button"
      className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-left backdrop-blur transition hover:border-cyan-400/30 hover:bg-slate-900"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition group-hover:bg-cyan-400/15">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </button>
  );
}

export default Dashboard;