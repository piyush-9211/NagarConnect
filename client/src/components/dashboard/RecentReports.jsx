import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import ReportRow from "./ReportRow";

export default function RecentReports({
  reports,
  loading,
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm animate-pulse">
        <div className="h-8 w-56 rounded bg-gray-200"></div>

        <div className="mt-8 space-y-4">

          <div className="h-28 rounded-2xl bg-gray-100"></div>

          <div className="h-28 rounded-2xl bg-gray-100"></div>

          <div className="h-28 rounded-2xl bg-gray-100"></div>

        </div>

      </div>
    );
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      report.issueType
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      status === "ALL"
        ? true
        : report.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">

        <div>

          <h2 className="text-3xl font-bold">
            Recent Reports
          </h2>

          <p className="text-gray-500">
            Latest civic issues submitted
          </p>

        </div>

        <div className="relative w-full lg:w-80">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            placeholder="Search reports..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
          />

        </div>

      </div>

      <div className="flex flex-wrap gap-3 mb-8">

        {[
          "ALL",
          "PENDING",
          "IN_PROGRESS",
          "RESOLVED",
        ].map((item) => (

          <button
            key={item}
            onClick={() => setStatus(item)}
            className={`rounded-full px-5 py-2 font-medium transition ${
              status === item
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {item.replace("_", " ")}

          </button>

        ))}

      </div>

      {filteredReports.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">

          <h2 className="text-2xl font-bold">
            No Matching Reports
          </h2>

          <p className="mt-3 text-gray-500">
            Try changing the search or filters.
          </p>

        </div>

      ) : (

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="space-y-5"
        >

          {filteredReports.map((report) => (

            <motion.div
              key={report.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
            >

              <ReportRow report={report} />

            </motion.div>

          ))}

        </motion.div>

      )}

    </div>
  );
}