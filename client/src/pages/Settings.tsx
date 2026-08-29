import { Settings as SettingsIcon, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Settings() {
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
        <SettingsIcon className="text-cyan-400" size={28} />
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-slate-500">
            Manage your ResearchPilot workspace settings.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Settings;