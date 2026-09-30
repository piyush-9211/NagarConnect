export default function ReportCard({ report, onView }) {
  return (
    <div className="bg-[#111827] rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500 transition">
      {report.images?.length > 0 && (
        <img
          src={`http://localhost:4000${report.images[0].imageUrl}`}
          alt={report.title}
          className="w-full h-56 object-cover"
        />
      )}

      <div className="p-5">
        <h3 className="text-xl font-bold text-white">
          {report.title}
        </h3>

        <p className="text-slate-400 mt-2">
          {report.description}
        </p>

        <div className="flex gap-2 mt-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            {report.status}
          </span>

          <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">
            {report.issueType}
          </span>
        </div>

        <button
          onClick={() => onView(report.id)}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 text-white font-semibold"
        >
          View Details
        </button>
      </div>
    </div>
  );
}