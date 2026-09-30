import { LayoutDashboard, TriangleAlert, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ logout }) {
  const navigate = useNavigate();

  return (
    <aside className="w-72 min-h-screen bg-[#0f172a] border-r border-slate-800 p-6 flex flex-col">

      <h1 className="text-3xl font-bold text-white mb-12">
        NagarConnect
      </h1>

      <nav className="space-y-3 flex-1">

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center gap-3 bg-blue-600 rounded-xl px-4 py-3 text-white"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/report")}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-800 rounded-xl"
        >
          <TriangleAlert size={20} />
          Report Issue
        </button>

      </nav>

      <button
        onClick={logout}
        className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-3 text-white flex items-center justify-center gap-2"
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>
  );
}