import Navbar from "../components/layout/Navbar";

export default function ReportIssue() {
  return (
    <div className="min-h-screen bg-[#F6F8FC]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">
          Report New Issue
        </h1>

        <div className="rounded-3xl bg-white p-10 shadow-lg">
          <h2 className="text-3xl font-bold text-green-600">
            🎉 Report Page Works
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            If you can see this page, then ReportIssue.jsx is working correctly.
          </p>

          <p className="mt-2 text-gray-500">
            That means one of these components is crashing:
          </p>

          <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">
            <li>UploadArea</li>
            <li>AIAnalysis</li>
            <li>LocationCard</li>
            <li>IssueForm</li>
          </ul>
        </div>
      </div>
    </div>
  );
}