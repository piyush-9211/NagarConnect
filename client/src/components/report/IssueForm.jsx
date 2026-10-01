import { Loader2, Send, Sparkles } from "lucide-react";

export default function IssueForm({
  submitReport,
  loading,
  issueType,
  confidence,
  severity,
  department,
  estimatedCost,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-blue-600" size={24} />

        <div>
          <h2 className="text-2xl font-bold">
            AI Report
          </h2>

          <p className="text-gray-500 text-sm">
            The report details will be generated automatically from your image.
          </p>
        </div>
      </div>

      {issueType ? (
        <div className="grid md:grid-cols-2 gap-4 mb-6">

          <div className="rounded-2xl bg-blue-50 p-5">
            <p className="text-sm text-gray-500">
              Detected Issue
            </p>
            <p className="text-xl font-bold text-blue-700 mt-1">
              {issueType}
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              AI Confidence
            </p>
            <p className="text-xl font-bold mt-1">
              {confidence != null
                ? `${(confidence * 100).toFixed(1)}%`
                : "Pending"}
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Severity
            </p>
            <p className="text-xl font-bold mt-1">
              {severity || "Pending"}
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Department
            </p>
            <p className="text-xl font-bold mt-1">
              {department || "Pending"}
            </p>
          </div>

          {estimatedCost != null && (
            <div className="md:col-span-2 rounded-2xl bg-green-50 p-5">
              <p className="text-sm text-gray-500">
                Estimated Repair Cost
              </p>
              <p className="text-xl font-bold text-green-700 mt-1">
                ₹{Number(estimatedCost).toLocaleString("en-IN")}
              </p>
            </div>
          )}

        </div>
      ) : (
        <div className="rounded-2xl bg-gray-50 p-6 mb-6 text-center text-gray-500">
          Upload an image and submit it. AI will automatically detect the issue.
        </div>
      )}

      <button
        disabled={loading}
        onClick={submitReport}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl py-4 font-semibold flex justify-center items-center gap-3 transition"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            AI Analyzing & Submitting...
          </>
        ) : (
          <>
            <Send size={20} />
            Submit AI Report
          </>
        )}
      </button>

    </div>
  );
}
