import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  FileText,
  Loader2,
  MessageSquare,
  MoreHorizontal,
  Search,
  Sparkles,
  Upload,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getCollectionDocuments,
  uploadDocument,
  deleteDocument,
  type Document,
} from "../lib/document.api";

function CollectionPage() {
  const navigate = useNavigate();
  const { id: collectionId } = useParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // --------------------------------------------------
  // Load documents
  // --------------------------------------------------

  const loadDocuments = useCallback(
    async (showLoader = false) => {
      if (!collectionId) return;

      try {
        if (showLoader) {
          setLoading(true);
        }

        const response = await getCollectionDocuments(collectionId);

        const fetchedDocuments = response.data?.documents ?? [];

        setDocuments(fetchedDocuments);
        setError("");
      } catch (err: any) {
        console.error("Failed to load documents:", err);

        const status = err?.response?.status;

        // A 401 means the backend rejected the JWT.
        // Do not logout on other errors.
        if (status === 401) {
          setError(
            "Your session has expired. Please log in again."
          );
        } else {
          setError(
            err?.response?.data?.message ||
              "Unable to load documents."
          );
        }
      } finally {
        if (showLoader) {
          setLoading(false);
        }
      }
    },
    [collectionId]
  );

  // --------------------------------------------------
  // Initial document load
  // --------------------------------------------------

  useEffect(() => {
    if (!collectionId) return;

    loadDocuments(true);
  }, [collectionId, loadDocuments]);

  // --------------------------------------------------
  // Poll while documents are processing
  // --------------------------------------------------

  useEffect(() => {
    if (!collectionId) return;

    const hasProcessingDocuments = documents.some(
      (document) =>
        document.status === "PROCESSING" ||
        document.status === "PENDING"
    );

    // No processing documents.
    // Make sure no old interval remains active.
    if (!hasProcessingDocuments) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }

      return;
    }

    // Prevent duplicate polling intervals.
    if (pollingRef.current) {
      return;
    }

    console.log(
      "🔄 Document processing detected. Starting polling..."
    );

    pollingRef.current = setInterval(() => {
      console.log(
        "🔄 Checking document processing status..."
      );

      loadDocuments(false);
    }, 3000);

    return () => {
      if (pollingRef.current) {
        console.log(
          "🛑 Stopping document status polling."
        );

        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [collectionId, documents, loadDocuments]);

  // --------------------------------------------------
  // Cleanup polling when leaving page
  // --------------------------------------------------

  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, []);

  // --------------------------------------------------
  // Upload document
  // --------------------------------------------------

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file || !collectionId) {
      return;
    }

    // Validate PDF
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError("Only PDF files are supported.");

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    try {
      setUploading(true);
      setError("");

      const response = await uploadDocument(
        collectionId,
        file
      );

      const newDocument = response.data?.document;

      if (newDocument) {
        setDocuments((current) => [
          newDocument,
          ...current,
        ]);
      } else {
        await loadDocuments(false);
      }

      console.log(
        "📄 Document uploaded:",
        newDocument
      );
    } catch (err: any) {
      console.error("Upload failed:", err);

      const status = err?.response?.status;

      if (status === 401) {
        setError(
          "Your session has expired. Please log in again."
        );
      } else {
        setError(
          err?.response?.data?.message ||
            "Unable to upload the document."
        );
      }
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  const normalizedSearch = search.trim().toLowerCase();

  const filteredDocuments = documents.filter(
    (document) =>
      document.title
        .toLowerCase()
        .includes(normalizedSearch) ||
      document.originalName
        .toLowerCase()
        .includes(normalizedSearch)
  );

  // --------------------------------------------------
  // Statistics
  // --------------------------------------------------

  const readyCount = documents.filter(
    (document) => document.status === "READY"
  ).length;

  const processingCount = documents.filter(
    (document) =>
      document.status === "PROCESSING" ||
      document.status === "PENDING"
  ).length;

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-[#060b16] text-slate-100">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[25%] top-[-300px] h-[600px] w-[600px] rounded-full bg-cyan-500/[0.05] blur-[120px]" />

        <div className="absolute bottom-[-300px] right-[-150px] h-[600px] w-[600px] rounded-full bg-blue-600/[0.05] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <main className="relative min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#060b16]/80 backdrop-blur-xl">
          <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 sm:px-7 lg:px-9">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-500 transition hover:border-white/[0.12] hover:text-white"
              >
                <ArrowLeft size={18} />
              </button>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-400">
                  Research workspace
                </p>

                <h1 className="mt-1 text-base font-semibold tracking-tight">
                  Collection
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/chat")}
                className="hidden items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:border-cyan-400/15 hover:text-cyan-300 sm:flex"
              >
                <MessageSquare size={15} />
                Research Chat
              </button>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading ? (
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <Upload size={15} />
                )}

                {uploading
                  ? "Uploading..."
                  : "Upload PDF"}
              </button>

              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleUpload}
                className="hidden"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-7 lg:px-9 lg:py-10">
          {/* Collection hero */}
          <section className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-cyan-500/[0.07] via-[#0a1220] to-[#080e19] p-7 sm:p-9">
            <div className="absolute right-[-120px] top-[-160px] h-[400px] w-[400px] rounded-full bg-cyan-400/[0.06] blur-[100px]" />

            <div className="relative">
              <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-3 py-1.5 text-[10px] font-medium text-cyan-300">
                    <Sparkles size={12} />
                    AI knowledge base
                  </div>

                  <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                    Research Collection
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                    Your papers are transformed into searchable
                    knowledge that ResearchPilot can use to answer
                    questions with grounded evidence.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <div className="rounded-2xl border border-white/[0.07] bg-black/10 px-5 py-4">
                    <p className="text-2xl font-bold">
                      {documents.length}
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-600">
                      Documents
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.07] bg-black/10 px-5 py-4">
                    <p className="text-2xl font-bold text-cyan-400">
                      {readyCount}
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-600">
                      Ready
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Processing notice */}
          {processingCount > 0 && (
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-amber-400/10 bg-amber-400/[0.035] px-5 py-4">
              <Loader2
                size={17}
                className="animate-spin text-amber-400"
              />

              <div>
                <p className="text-xs font-semibold text-amber-200">
                  Processing your research
                </p>

                <p className="mt-1 text-[11px] text-slate-600">
                  {processingCount} document
                  {processingCount !== 1 ? "s" : ""} being
                  processed. Text extraction and embedding may
                  take a moment.
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-2xl border border-red-500/15 bg-red-500/[0.05] px-5 py-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Toolbar */}
          <section className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                Documents
              </h3>

              <p className="mt-1 text-xs text-slate-600">
                Research papers stored in this collection.
              </p>
            </div>

            <div className="relative w-full sm:w-[280px]">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search documents..."
                className="w-full rounded-xl border border-white/[0.07] bg-white/[0.025] py-2.5 pl-10 pr-4 text-xs text-slate-200 outline-none transition placeholder:text-slate-700 focus:border-cyan-400/30 focus:ring-2 focus:ring-cyan-400/[0.06]"
              />
            </div>
          </section>

          {/* Documents */}
          <section className="mt-5">
            {loading ? (
              <LoadingState />
            ) : filteredDocuments.length === 0 ? (
              <EmptyState
                hasSearch={Boolean(normalizedSearch)}
                onUpload={() => inputRef.current?.click()}
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredDocuments.map((document) => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

// --------------------------------------------------
// Document Card
// --------------------------------------------------

interface DocumentCardProps {
  document: Document;
}

function DocumentCard({
  document,
}: DocumentCardProps) {
  const status = document.status;

  const isReady = status === "READY";

  const isProcessing =
    status === "PROCESSING" ||
    status === "PENDING";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080e19]/85 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/15 hover:bg-[#0a111f]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-400/10 bg-red-400/[0.05] text-red-300">
          <FileText size={20} />
        </div>

        <button
          type="button"
          onClick={async () => {
            if (!window.confirm("Delete this paper?")) return;
            try {
              await deleteDocument(document.id);
              window.location.reload();
            } catch {
              window.alert("Unable to delete this paper.");
            }
          }}
          aria-label={`Delete ${document.title}`}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-white/[0.04] hover:text-slate-300"
        >
          <MoreHorizontal size={17} />
        </button>
      </div>

      <div className="mt-5">
        <h4
          className="truncate text-sm font-semibold text-slate-200"
          title={document.title}
        >
          {document.title}
        </h4>

        <p
          className="mt-1 truncate text-[11px] text-slate-600"
          title={document.originalName}
        >
          {document.originalName}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-4">
        <div className="flex items-center gap-2">
          {isReady ? (
            <>
              <CheckCircle2
                size={14}
                className="text-emerald-400"
              />

              <span className="text-[10px] font-medium text-emerald-400">
                Ready for RAG
              </span>
            </>
          ) : isProcessing ? (
            <>
              <Loader2
                size={14}
                className="animate-spin text-amber-400"
              />

              <span className="text-[10px] font-medium text-amber-400">
                Processing
              </span>
            </>
          ) : (
            <span className="text-[10px] font-medium text-red-400">
              Processing failed
            </span>
          )}
        </div>

        <span className="text-[10px] text-slate-700">
          {formatFileSize(document.fileSize)}
        </span>
      </div>
    </div>
  );
}

// --------------------------------------------------
// Empty State
// --------------------------------------------------

function EmptyState({
  hasSearch,
  onUpload,
}: {
  hasSearch: boolean;
  onUpload: () => void;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-white/[0.09] bg-[#080e19]/60 px-6 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-400">
        {hasSearch ? (
          <Search
            size={26}
            strokeWidth={1.5}
          />
        ) : (
          <Brain
            size={27}
            strokeWidth={1.5}
          />
        )}
      </div>

      <h4 className="mt-5 text-sm font-semibold text-slate-300">
        {hasSearch
          ? "No matching documents"
          : "Your research space is empty"}
      </h4>

      <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-slate-600">
        {hasSearch
          ? "Try another search term or clear the search field."
          : "Upload your first PDF and ResearchPilot will extract, chunk, embed, and prepare it for intelligent retrieval."}
      </p>

      {!hasSearch && (
        <button
          type="button"
          onClick={onUpload}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-400"
        >
          <Upload size={15} />
          Upload Research Paper
        </button>
      )}
    </div>
  );
}

// --------------------------------------------------
// Loading State
// --------------------------------------------------

function LoadingState() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-white/[0.06] bg-[#080e19] p-5"
        >
          <div className="h-11 w-11 rounded-xl bg-white/[0.04]" />

          <div className="mt-5 h-4 w-3/4 rounded bg-white/[0.04]" />

          <div className="mt-2 h-3 w-1/2 rounded bg-white/[0.03]" />

          <div className="mt-8 h-px bg-white/[0.04]" />

          <div className="mt-4 h-3 w-1/3 rounded bg-white/[0.03]" />
        </div>
      ))}
    </div>
  );
}

// --------------------------------------------------
// File Size
// --------------------------------------------------

function formatFileSize(bytes: number) {
  if (!bytes || bytes <= 0) {
    return "0 KB";
  }

  const units = ["B", "KB", "MB", "GB"];

  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  return `${(
    bytes / Math.pow(1024, index)
  ).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

export default CollectionPage;
