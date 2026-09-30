import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminTable({
  reports,
  updateStatus,
}) {
  const navigate = useNavigate();

  if (reports.length === 0) {
    return (
      <div className="mt-8 rounded-3xl bg-white p-12 text-center shadow-sm">
        <h2 className="text-2xl font-bold">
          No Reports Found
        </h2>

        <p className="mt-3 text-gray-500">
          Citizens haven't submitted any reports yet.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-200"
    >
      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-5 text-left font-semibold">
                Image
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                Title
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                Citizen
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                Issue
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                Status
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {reports.map((report) => (

              <tr
                key={report.id}
                className="border-t hover:bg-blue-50 transition duration-200"
              >

                <td className="px-6 py-5">

                  {report.images &&
                  report.images.length > 0 ? (

                    <img
                      src={`http://localhost:4000${report.images[0].imageUrl}`}
                      alt="Issue"
                      className="h-16 w-24 rounded-xl object-cover shadow"
                    />

                  ) : (

                    <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500">
                      No Image
                    </div>

                  )}

                </td>

                <td className="px-6 py-5">

                  <div className="font-semibold text-gray-800">
                    {report.title}
                  </div>

                  <div className="text-sm text-gray-500">
                    #{report.id.slice(0, 8)}
                  </div>

                </td>

                <td className="px-6 py-5">

                  <div className="font-medium">
                    {report.citizen?.fullName}
                  </div>

                  <div className="text-sm text-gray-500">
                    {report.citizen?.email}
                  </div>

                </td>

                <td className="px-6 py-5">
                  {report.issueType}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold
                    ${
                      report.status === "RESOLVED"
                        ? "bg-green-100 text-green-700"

                        : report.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-700"

                        : report.status === "REJECTED"
                        ? "bg-gray-200 text-gray-700"

                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {report.status.replace("_", " ")}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        navigate(`/report/${report.id}`)
                      }
                      className="rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700 transition"
                    >
                      <Eye size={18} />
                    </button>

                    <select
                      value={report.status}
                      onChange={(e) =>
                        updateStatus(
                          report.id,
                          e.target.value
                        )
                      }
                      className="rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                    >
                      <option value="PENDING">
                        Pending
                      </option>

                      <option value="IN_PROGRESS">
                        In Progress
                      </option>

                      <option value="RESOLVED">
                        Resolved
                      </option>

                      <option value="REJECTED">
                        Rejected
                      </option>

                    </select>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </motion.div>
  );
}