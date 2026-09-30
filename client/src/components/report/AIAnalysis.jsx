import {
  Brain,
  ShieldCheck,
  Building2,
  TriangleAlert,
} from "lucide-react";

export default function AIAnalysis({
  image,
  issueType,
  confidence = 94,
  severity = "High",
  department = "Roads Department",
  loading = false,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <div className="flex items-center gap-3 mb-8">

        <Brain className="text-blue-600" />

        <h2 className="text-2xl font-bold">
          AI Analysis
        </h2>

      </div>

      {!image ? (

        <div className="text-center py-16">

          <Brain
            size={60}
            className="mx-auto text-gray-300"
          />

          <h3 className="mt-6 text-xl font-semibold">
            No Image Uploaded
          </h3>

          <p className="text-gray-500 mt-2">
            Upload an image to let AI analyze the issue.
          </p>

        </div>

      ) : loading ? (

        <div className="text-center py-16">

          <div className="w-16 h-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto"></div>

          <h3 className="mt-6 text-xl font-semibold">
            AI is analyzing...
          </h3>

          <p className="text-gray-500 mt-2">
            Detecting issue type and severity.
          </p>

        </div>

      ) : (

        <div className="space-y-7">

          <div>

            <p className="text-gray-500">
              Issue Type
            </p>

            <h3 className="text-xl font-semibold mt-2">
              {issueType || "Unknown"}
            </h3>

          </div>

          <div>

            <p className="text-gray-500">
              AI Confidence
            </p>

            <div className="mt-3 h-3 rounded-full bg-gray-200">

              <div
                className="h-3 rounded-full bg-blue-600"
                style={{
                  width: `${confidence}%`,
                }}
              />

            </div>

            <p className="mt-2 text-blue-600 font-bold">
              {confidence}%
            </p>

          </div>

          <div className="flex items-center gap-3">

            <TriangleAlert className="text-red-500" />

            <div>

              <p className="text-gray-500">
                Severity
              </p>

              <h3 className="font-semibold">
                {severity}
              </h3>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Building2 className="text-blue-600" />

            <div>

              <p className="text-gray-500">
                Department
              </p>

              <h3 className="font-semibold">
                {department}
              </h3>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <ShieldCheck className="text-green-600" />

            <div>

              <p className="text-gray-500">
                AI Status
              </p>

              <h3 className="font-semibold text-green-600">
                Analysis Complete
              </h3>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}