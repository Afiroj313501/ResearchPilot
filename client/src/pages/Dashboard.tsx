import {
  Bell,
  Brain,
  ChevronDown,
  FileText,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import api from "../lib/api";
import { getCollectionDocuments } from "../lib/document.api";
import { getConversations } from "../lib/conversation.api";

interface Collection {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

function Dashboard() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Collections
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollections, setLoadingCollections] = useState(true);
  const [collectionError, setCollectionError] = useState("");
  const [documentCount, setDocumentCount] = useState(0);
  const [readyDocumentCount, setReadyDocumentCount] = useState(0);
  const [queryCount, setQueryCount] = useState(0);

  // Create collection modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [creatingCollection, setCreatingCollection] = useState(false);
  const [createError, setCreateError] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const displayName =
    user?.name || user?.email?.split("@")[0] || "Researcher";

  /*
   * Fetch user's collections
   */
  const fetchCollections = async () => {
    try {
      setLoadingCollections(true);
      setCollectionError("");

      const response = await api.get("/collections");

      const fetchedCollections =
        response.data?.data?.collections || [];

      setCollections(fetchedCollections);

      const documentLists = await Promise.all(
        fetchedCollections.map((collection: Collection) =>
          getCollectionDocuments(collection.id)
        )
      );
      const documents = documentLists.flatMap(
        (response) => response.data.documents
      );
      setDocumentCount(documents.length);
      setReadyDocumentCount(
        documents.filter((document) => document.status === "READY").length
      );
      const conversations = await getConversations();
      setQueryCount(conversations.data.conversations.length);
    } catch (error: any) {
      console.error("Failed to fetch collections:", error);

      setCollectionError(
        error.response?.data?.message ||
          "Failed to load collections"
      );
    } finally {
      setLoadingCollections(false);
    }
  };

  /*
   * Load collections when dashboard opens
   */
  useEffect(() => {
    fetchCollections();
  }, []);

  /*
   * Open create collection modal
   */
  const openCreateModal = () => {
    setCollectionName("");
    setCreateError("");
    setCreateModalOpen(true);
  };

  /*
   * Create collection
   */
  const handleCreateCollection = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const name = collectionName.trim();

    if (!name) {
      setCreateError("Collection name is required");
      return;
    }

    try {
      setCreatingCollection(true);
      setCreateError("");

      const response = await api.post("/collections", {
        name,
      });

      const newCollection =
        response.data?.data?.collection;

      if (newCollection) {
        setCollections((current) => [
          newCollection,
          ...current,
        ]);
      } else {
        await fetchCollections();
      }

      setCollectionName("");
      setCreateModalOpen(false);
    } catch (error: any) {
      console.error(
        "Failed to create collection:",
        error
      );

      setCreateError(
        error.response?.data?.message ||
          "Failed to create collection"
      );
    } finally {
      setCreatingCollection(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060b16] text-slate-100">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[20%] top-[-300px] h-[600px] w-[600px] rounded-full bg-cyan-500/[0.06] blur-[120px]" />

        <div className="absolute bottom-[-300px] right-[-150px] h-[600px] w-[600px] rounded-full bg-blue-600/[0.05] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative flex min-h-screen">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col border-r border-white/[0.07] bg-[#080e1b]/95 backdrop-blur-2xl transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="flex h-[76px] items-center justify-between border-b border-white/[0.06] px-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.08)]">
                <Sparkles size={19} />
              </div>

              <div className="text-left">
                <div className="text-[16px] font-bold tracking-tight">
                  ResearchPilot
                </div>

                <div className="text-[9px] font-medium tracking-[0.18em] text-slate-500">
                  RESEARCH INTELLIGENCE
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              Workspace
            </p>

            <nav className="space-y-1">
              <SidebarItem
                icon={<LayoutDashboard size={17} />}
                label="Overview"
                active
              />

              <SidebarItem
                icon={<FolderOpen size={17} />}
                label="Collections"
                onClick={() => navigate("/collections")}
              />

              <SidebarItem
                icon={<MessageSquare size={17} />}
                label="Research Chat"
                onClick={() => navigate("/chat")}
              />

              <SidebarItem
                icon={<FileText size={17} />}
                label="Documents"
                onClick={() => navigate("/documents")}
              />
            </nav>

            <p className="mb-3 mt-9 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              System
            </p>

            <nav className="space-y-1">
              <SidebarItem
                icon={<Brain size={17} />}
                label="AI & Retrieval"
              />

              <SidebarItem
                icon={<Settings size={17} />}
                label="Settings"
                onClick={() => navigate("/settings")}
              />
            </nav>
          </div>

          {/* Bottom workspace card */}
          <div className="border-t border-white/[0.06] p-4">
            <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <Sparkles size={16} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-200">
                    ResearchPilot AI
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-600">
                    RAG workspace
                  </p>
                </div>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
              </div>

              <p className="mt-2 text-[10px] text-slate-600">
                Workspace ready
              </p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-white/[0.06] bg-[#060b16]/75 px-5 backdrop-blur-xl sm:px-7 lg:px-9">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-2.5 text-slate-400 hover:text-white lg:hidden"
              >
                <LayoutDashboard size={18} />
              </button>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-cyan-400">
                  Workspace
                </p>

                <h1 className="mt-0.5 text-lg font-semibold tracking-tight">
                  Research Overview
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search */}
              <button
                type="button"
                className="hidden items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-xs text-slate-600 transition hover:border-white/[0.12] hover:text-slate-400 md:flex"
              >
                <Search size={15} />
                Search research...

                <span className="ml-6 rounded-md border border-white/[0.08] px-1.5 py-0.5 text-[9px]">
                  /
                </span>
              </button>

              {/* Notifications */}
              <button
                type="button"
                className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-white/5 hover:text-white"
              >
                <Bell size={18} />

                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </button>

              {/* User */}
              <div className="flex items-center gap-3 border-l border-white/[0.07] pl-3 sm:pl-4">
                <div className="hidden text-right sm:block">
                  <p className="text-xs font-semibold text-slate-200">
                    {displayName}
                  </p>

                  <p className="mt-0.5 max-w-[150px] truncate text-[10px] text-slate-600">
                    {user?.email}
                  </p>
                </div>

                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-xs font-bold text-cyan-300"
                >
                  {displayName.charAt(0).toUpperCase()}
                </button>

                <ChevronDown
                  size={14}
                  className="hidden text-slate-600 sm:block"
                />
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-7 lg:px-9 lg:py-10">
            {/* Welcome */}
            <section className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-cyan-500/[0.07] via-[#0a1220] to-[#080e19] p-7 sm:p-9">
              <div className="absolute right-[-100px] top-[-130px] h-[350px] w-[350px] rounded-full bg-cyan-400/[0.07] blur-[90px]" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-3 py-1.5 text-[10px] font-medium text-cyan-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                  AI research workspace
                </div>

                <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    {displayName}
                  </span>
                  .
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                  Your research workspace is ready. Upload papers,
                  explore your collections, and ask questions grounded
                  in your documents.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:bg-cyan-400"
                  >
                    <Plus size={17} />
                    New Collection
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/documents")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-white"
                  >
                    <Upload size={17} />
                    Upload Paper
                  </button>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={<FolderOpen size={19} />}
                label="Collections"
                value={String(collections.length)}
                description="Research spaces"
              />

              <StatCard
                icon={<FileText size={19} />}
                label="Documents"
                value={String(documentCount)}
                description="Papers uploaded"
              />

              <StatCard
                icon={<Brain size={19} />}
                label="Ready for RAG"
                value={String(readyDocumentCount)}
                description="Indexed papers"
              />

              <StatCard
                icon={<MessageSquare size={19} />}
                label="Research queries"
                value={String(queryCount)}
                description="Saved discussions"
              />
            </section>

            {/* Main grid */}
            <section className="mt-7 grid gap-6 xl:grid-cols-[1.5fr_0.85fr]">
              {/* Collections */}
              <div className="rounded-3xl border border-white/[0.07] bg-[#080e19]/80">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">
                      Your collections
                    </h3>

                    <p className="mt-1 text-xs text-slate-600">
                      Organize research by topic or project.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/collections")}
                    className="text-xs font-medium text-cyan-400 transition hover:text-cyan-300"
                  >
                    View all
                  </button>
                </div>

                <div className="min-h-[300px] px-6 py-6">
                  {loadingCollections ? (
                    <div className="flex min-h-[250px] items-center justify-center">
                      <div className="flex items-center gap-3 text-xs text-slate-600">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400" />
                        Loading collections...
                      </div>
                    </div>
                  ) : collectionError ? (
                    <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/10 bg-red-400/[0.04] text-red-400">
                        <X size={27} strokeWidth={1.5} />
                      </div>

                      <h4 className="mt-5 text-sm font-semibold text-slate-300">
                        Unable to load collections
                      </h4>

                      <p className="mt-2 text-xs text-red-400">
                        {collectionError}
                      </p>

                      <button
                        type="button"
                        onClick={fetchCollections}
                        className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
                      >
                        Try again
                      </button>
                    </div>
                  ) : collections.length === 0 ? (
                    <div className="flex min-h-[250px] items-center justify-center">
                      <div className="max-w-sm text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025] text-slate-600">
                          <FolderOpen
                            size={27}
                            strokeWidth={1.5}
                          />
                        </div>

                        <h4 className="mt-5 text-sm font-semibold text-slate-300">
                          No collections yet
                        </h4>

                        <p className="mt-2 text-xs leading-6 text-slate-600">
                          Create your first research collection
                          to start building an AI-powered
                          knowledge base.
                        </p>

                        <button
                          type="button"
                          onClick={openCreateModal}
                          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/[0.1]"
                        >
                          <Plus size={15} />
                          Create collection
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {collections.map((collection) => (
                        <button
                          key={collection.id}
                          type="button"
                          onClick={() =>
                            navigate(
                              `/collections/${collection.id}`
                            )
                          }
                          className="group flex w-full items-center gap-4 rounded-2xl border border-transparent p-4 text-left transition hover:border-white/[0.07] hover:bg-white/[0.025]"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
                            <FolderOpen size={18} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-300 group-hover:text-white">
                              {collection.name}
                            </p>

                            <p className="mt-1 text-[10px] text-slate-600">
                              Created{" "}
                              {new Date(
                                collection.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>

                          <ChevronDown
                            size={15}
                            className="-rotate-90 text-slate-700 transition group-hover:text-cyan-400"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick actions */}
              <div className="rounded-3xl border border-white/[0.07] bg-[#080e19]/80">
                <div className="border-b border-white/[0.06] px-6 py-5">
                  <h3 className="text-sm font-semibold text-slate-200">
                    Quick actions
                  </h3>

                  <p className="mt-1 text-xs text-slate-600">
                    Jump into your research workflow.
                  </p>
                </div>

                <div className="space-y-2 p-4">
                  <QuickAction
                    icon={<Upload size={17} />}
                    title="Upload a research paper"
                    description="Add a PDF to your knowledge base"
                    onClick={() => navigate("/documents")}
                  />

                  <QuickAction
                    icon={<MessageSquare size={17} />}
                    title="Ask ResearchPilot"
                    description="Query your indexed documents"
                    onClick={() => navigate("/chat")}
                  />

                  <QuickAction
                    icon={<FolderOpen size={17} />}
                    title="Create collection"
                    description="Start a focused research workspace"
                    onClick={openCreateModal}
                  />

                  <QuickAction
                    icon={<Settings size={17} />}
                    title="Workspace settings"
                    description="Manage your preferences"
                    onClick={() => navigate("/settings")}
                  />
                </div>
              </div>
            </section>

            {/* Logout */}
            <div className="mt-7 flex justify-end">
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-600 transition hover:bg-red-500/5 hover:text-red-400"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Create Collection Modal */}
      {createModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setCreateModalOpen(false);
            }
          }}
        >
          <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#0a111f] p-6 shadow-2xl shadow-black/40">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-400">
                  <FolderOpen size={19} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  Create collection
                </h3>

                <p className="mt-1 text-xs leading-6 text-slate-500">
                  Create a focused workspace for your research.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setCreateModalOpen(false)
                }
                className="rounded-xl p-2 text-slate-600 transition hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleCreateCollection}
              className="mt-6"
            >
              <label
                htmlFor="collection-name"
                className="text-xs font-medium text-slate-400"
              >
                Collection name
              </label>

              <input
                id="collection-name"
                type="text"
                value={collectionName}
                onChange={(e) =>
                  setCollectionName(e.target.value)
                }
                placeholder="e.g. Machine Learning Research"
                autoFocus
                disabled={creatingCollection}
                className="mt-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/30 focus:bg-white/[0.04] disabled:opacity-50"
              />

              {createError && (
                <p className="mt-2 text-xs text-red-400">
                  {createError}
                </p>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setCreateModalOpen(false)
                  }
                  disabled={creatingCollection}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-white/[0.05] hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creatingCollection}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creatingCollection ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={15} />
                      Create collection
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
        active
          ? "border border-cyan-400/10 bg-cyan-400/[0.07] text-cyan-300"
          : "text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"
      }`}
    >
      <span
        className={`${
          active
            ? "text-cyan-400"
            : "text-slate-600 group-hover:text-slate-400"
        }`}
      >
        {icon}
      </span>

      {label}
    </button>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}

function StatCard({
  icon,
  label,
  value,
  description,
}: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-[#080e19]/80 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/15">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
          {icon}
        </div>

        <span className="h-1.5 w-1.5 rounded-full bg-slate-700 transition group-hover:bg-cyan-400" />
      </div>

      <p className="mt-5 text-xs font-medium text-slate-500">
        {label}
      </p>

      <div className="mt-1 flex items-end gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-100">
          {value}
        </span>

        <span className="pb-1 text-[10px] text-slate-700">
          {description}
        </span>
      </div>
    </div>
  );
}

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

function QuickAction({
  icon,
  title,
  description,
  onClick,
}: QuickActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-2xl border border-transparent p-3 text-left transition hover:border-white/[0.06] hover:bg-white/[0.025]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-slate-500 transition group-hover:border-cyan-400/15 group-hover:bg-cyan-400/[0.06] group-hover:text-cyan-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-300 group-hover:text-white">
          {title}
        </p>

        <p className="mt-1 truncate text-[10px] text-slate-600">
          {description}
        </p>
      </div>
    </button>
  );
}

export default Dashboard;
