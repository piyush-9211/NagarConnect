import { Loader2, Send } from "lucide-react";

export default function IssueForm({
  title,
  setTitle,
  description,
  setDescription,
  issueType,
  setIssueType,
  submitReport,
  loading,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <h2 className="text-2xl font-bold mb-8">
        Issue Details
      </h2>

      <div className="space-y-6">

        <div>

          <label className="block mb-2 font-medium text-gray-700">
            Complaint Title
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Road full of potholes..."
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium text-gray-700">
            Description
          </label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail..."
            className="w-full border border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium text-gray-700">
            Issue Type
          </label>

          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Issue Type</option>
            <option>Pothole</option>
            <option>Garbage</option>
            <option>Street Light</option>
            <option>Road Damage</option>
            <option>Water Leakage</option>
          </select>

        </div>

        <button
          disabled={loading}
          onClick={submitReport}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-semibold flex justify-center items-center gap-3 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Submitting...
            </>
          ) : (
            <>
              <Send size={20} />
              Submit Report
            </>
          )}
        </button>

      </div>

    </div>
  );
}