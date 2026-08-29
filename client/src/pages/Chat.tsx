import { MessageSquare, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#060b16] text-slate-100 p-8">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="flex items-center gap-4">
        <MessageSquare className="text-cyan-400" size={28} />
        <div>
          <h1 className="text-2xl font-bold">Research Chat</h1>
          <p className="text-sm text-slate-500">
            Ask questions about your research documents.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Chat;