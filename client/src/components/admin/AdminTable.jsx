import { motion } from "framer-motion";
import {
  Clock3,
  IndianRupee,
  Building2,
  AlertTriangle,
} from "lucide-react";

function getPriority(severity, slaStatus) {
  const value = (severity || "").toLowerCase();
  const sla = (slaStatus || "").toLowerCase();

  // SLA status can increase priority, but never decrease AI severity.
  if (sla === "sla breached") {
    return {
      label: "HIGH",
      className: "bg-red-100 text-red-700",
    };
  }

  if (value === "high" || sla === "near deadline") {
    return {
      label: value === "high" ? "HIGH" : "MEDIUM",
      className:
        value === "high"
          ? "bg-red-100 text-red-700"
          : "bg-orange-100 text-orange-700",
    };
  }

  if (value === "medium") {
    return {
      label: "MEDIUM",
      className: "bg-orange-100 text-orange-700",
    };
  }

  if (value === "low") {
    return {
      label: "LOW",
      className: "bg-green-100 text-green-700",
    };
  }

  return {
    label: "N/A",
    className: "bg-gray-100 text-gray-600",
  };
}

function formatStatus(status) {
  return (status || "").replace("_", " ");
}

export default function AdminTable({
  reports,
  updateStatus,
}) {
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
      className="mt-8 rounded-3xl bg-white shadow-lg border border-gray-200 overflow-hidden"
    >
      <div className="overflow-x-auto">

        <table className="w-full min-w-[1450px] table-fixed">

          <colgroup>
            <col className="w-[270px]" />
            <col className="w-[220px]" />
            <col className="w-[150px]" />
            <col className="w-[150px]" />
            <col className="w-[210px]" />
            <col className="w-[150px]" />
            <col className="w-[150px]" />
            <col className="w-[220px]" />
          </colgroup>

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-5 text-left font-semibold">
                Issue
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                Citizen
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                Priority
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                Cost
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                Department
              </th>

              <th className="px-6 py-5 text-left font-semibold">
                SLA
              </th>

              <th className="sticky right-[220px] z-20 bg-gray-100 px-6 py-5 text-left font-semibold shadow-[-6px_0_10px_-10px_rgba(0,0,0,0.3)]">
                Status
              </th>

              <th className="sticky right-0 z-20 bg-gray-100 px-6 py-5 text-left font-semibold shadow-[-6px_0_10px_-10px_rgba(0,0,0,0.3)]">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {reports.map((report) => {

              const priority = getPriority(
                report.aiSeverity,
                report.sla_status
              );

              const cost =
                report.estimatedRepairCost;

              const department =
                report.aiDepartment ||
                "Not Assigned";

              const issue =
                report.aiClass ||
                report.issueType ||
                "Unknown";

              const confidence =
                report.aiConfidence != null
                  ? `${(
                      report.aiConfidence * 100
                    ).toFixed(1)}%`
                  : "N/A";

              const slaStatus = report.sla_status || "N/A";
              const slaDeadline = report.sla_deadline
                ? new Date(report.sla_deadline)
                : null;

              return (

                <tr
                  key={report.id}
                  className="border-t border-gray-100 hover:bg-blue-50 transition duration-200"
                >

                  {/* ISSUE */}
                  <td className="px-6 py-5 align-middle">

                    <div className="flex items-center gap-4 min-w-0">

                      {report.images &&
                      report.images.length > 0 ? (

                        <img
                          src={`http://localhost:4000${report.images[0].imageUrl}`}
                          alt="Issue"
                          className="h-16 w-24 flex-shrink-0 rounded-xl object-cover shadow"
                        />

                      ) : (

                        <div className="flex h-16 w-24 flex-shrink-0 items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500">
                          No Image
                        </div>

                      )}

                      <div className="min-w-0">

                        <div className="font-semibold text-gray-800 truncate">
                          {report.title}
                        </div>

                        <div className="text-sm text-gray-500 mt-1 truncate">
                          {issue}
                        </div>

                        <div className="text-xs text-blue-500 mt-1">
                          AI: {confidence}
                        </div>

                        <div className="text-xs text-gray-400 mt-1">
                          #{report.id.slice(0, 8)}
                        </div>

                      </div>

                    </div>

                  </td>

                  {/* CITIZEN */}
                  <td className="px-6 py-5 align-middle">

                    <div className="min-w-0">

                      <div className="font-semibold text-gray-800 truncate">
                        {report.citizen?.fullName ||
                          "Unknown"}
                      </div>

                      <div className="text-sm text-gray-500 truncate mt-1">
                        {report.citizen?.email ||
                          "No email"}
                      </div>

                    </div>

                  </td>

                  {/* PRIORITY */}
                  <td className="px-6 py-5 align-middle">

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap ${priority.className}`}
                    >
                      <AlertTriangle size={15} />
                      {priority.label}
                    </span>

                  </td>

                  {/* COST */}
                  <td className="px-6 py-5 align-middle">

                    <div className="flex items-center gap-1 font-semibold text-gray-800">

                      <IndianRupee size={16} />

                      {cost != null
                        ? Number(cost).toLocaleString(
                            "en-IN"
                          )
                        : "N/A"}

                    </div>

                    {cost != null && (
                      <div className="text-xs text-gray-400 mt-1">
                        AI estimate
                      </div>
                    )}

                  </td>

                  {/* DEPARTMENT */}
                  <td className="px-6 py-5 align-middle">

                    <div className="flex items-start gap-2">

                      <Building2
                        size={18}
                        className="text-blue-600 mt-0.5 flex-shrink-0"
                      />

                      <span className="font-medium text-gray-800">
                        {department}
                      </span>

                    </div>

                  </td>

                  {/* SLA */}
                  <td className="px-6 py-5 align-middle">

                    <div className="flex flex-col gap-1">

                      <div
                        className={`flex items-center gap-2 font-semibold ${
                          slaStatus === "SLA Breached"
                            ? "text-red-600"
                            : slaStatus === "Near Deadline"
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      >
                        <Clock3 size={17} />
                        {slaStatus}
                      </div>

                      {slaDeadline && (
                        <div className="text-xs text-gray-500">
                          Due: {slaDeadline.toLocaleString("en-IN")}
                        </div>
                      )}

                    </div>

                  </td>

                  {/* STATUS */}
                  <td className="sticky right-[220px] z-10 bg-white px-6 py-5 align-middle shadow-[-6px_0_10px_-10px_rgba(0,0,0,0.25)]">

                    <select
                      value={report.status}
                      onChange={(e) =>
                        updateStatus(
                          report.id,
                          e.target.value
                        )
                      }
                      className={`rounded-full border-0 px-4 py-2 text-sm font-semibold outline-none cursor-pointer ${
                        report.status === "PENDING"
                          ? "bg-red-100 text-red-700"
                          : report.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-700"
                          : report.status === "RESOLVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >

                      <option value="PENDING">
                        PENDING
                      </option>

                      <option value="IN_PROGRESS">
                        IN PROGRESS
                      </option>

                      <option value="RESOLVED">
                        RESOLVED
                      </option>

                      <option value="REJECTED">
                        REJECTED
                      </option>

                    </select>

                  </td>

                  {/* ACTION */}
                  <td className="sticky right-0 z-10 bg-white px-6 py-5 align-middle shadow-[-6px_0_10px_-10px_rgba(0,0,0,0.25)]">

                    <button
                      onClick={() =>
                        window.location.href =
                          `/report/${report.id}`
                      }
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition"
                    >
                      View Report
                    </button>

                  </td>

                </tr>

              );
            })}

          </tbody>

        </table>

      </div>
    </motion.div>
  );
}
