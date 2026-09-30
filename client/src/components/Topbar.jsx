import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex justify-end mb-8">
      <button className="bg-[#111827] p-3 rounded-xl border border-slate-700">
        <Bell size={22} className="text-white" />
      </button>
    </div>
  );
}