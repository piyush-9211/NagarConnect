import {
  MapPin,
  CalendarDays,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReportRow({ report }) {
  const navigate = useNavigate();

  const badgeColor = {
    PENDING: "bg-red-100 text-red-600",
    IN_PROGRESS: "bg-blue-100 text-blue-600",
    RESOLVED: "bg-green-100 text-green-600",
    REJECTED: "bg-gray-100 text-gray-600",
  };

  const confidence =
    report.aiConfidence != null
      ? report.aiConfidence * 100
      : null;

  return (
    <div className="group flex justify-between items-center rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex gap-5 items-center">

        <img
          src={
            report.images?.length
              ? `http://localhost:4000${report.images[0].imageUrl}`
              : "https://placehold.co/96x96?text=Issue"
          }
          alt={report.title}
          className="h-24 w-24 rounded-xl object-cover"
        />

        <div>

          <h2 className="text-xl font-semibold text-gray-900">
            {report.title}
          </h2>

          <div className="flex gap-5 mt-2 text-gray-500 text-sm">

            <div className="flex items-center gap-1">
              <MapPin size={15} />
              {report.address || "Location detected"}
            </div>

            <div className="flex items-center gap-1">
              <CalendarDays size={15} />
              {new Date(
                report.createdAt
              ).toLocaleDateString()}
            </div>

          </div>

          <div className="flex gap-3 mt-4">

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                badgeColor[report.status] ||
                "bg-gray-100 text-gray-600"
              }`}
            >
              {report.status.replace("_", " ")}
            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
              {report.aiClass ||
                report.issueType ||
                "Unknown"}
            </span>

          </div>

        </div>

      </div>

      <div className="text-right">

        <div className="flex items-center justify-end gap-2 text-gray-500 text-sm">

          <ShieldCheck size={16} />

          AI Confidence

        </div>

        <p className="mt-1 text-3xl font-bold text-blue-600">
          {confidence != null
            ? `${confidence.toFixed(1)}%`
            : "N/A"}
        </p>

        <p className="mt-2 text-xs text-gray-400">
          #{report.id.slice(0, 8)}
        </p>

        <button
          onClick={() =>
            navigate(`/report/${report.id}`)
          }
          className="mt-6 flex items-center gap-2 text-blue-600 font-semibold transition-all group-hover:gap-3"
        >
          View Details
          <ArrowRight size={18} />
        </button>

      </div>

    </div>
  );
}
