import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Target,
  CheckCircle2,
} from "lucide-react";

import ReportsChart from "./ReportsChart";

export default function AIInsights({ reports }) {
  const total = reports.length;

  const resolved = reports.filter(
    (r) => r.status === "RESOLVED"
  ).length;

  const confidence =
    total === 0
      ? 0
      : Math.round(
          (reports.reduce(
            (sum, r) => sum + (r.aiConfidence || 0.95),
            0
          ) /
            total) *
            100
        );

  const resolutionRate =
    total === 0
      ? 0
      : Math.round((resolved / total) * 100);

  const issueCount = {};

  reports.forEach((r) => {
    issueCount[r.issueType] =
      (issueCount[r.issueType] || 0) + 1;
  });

  const commonIssue =
    Object.keys(issueCount).length === 0
      ? "None"
      : Object.keys(issueCount).reduce((a, b) =>
          issueCount[a] > issueCount[b] ? a : b
        );

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* AI Analytics Card */}

      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex items-center gap-3">

          <Brain size={34} />

          <div>

            <h2 className="text-2xl font-bold">
              NagarConnect AI
            </h2>

            <p className="opacity-80">
              Live AI Analytics
            </p>

          </div>

        </div>

        <div className="mt-8 space-y-6">

          <div className="flex justify-between">

            <span>AI Confidence</span>

            <span className="font-bold">
              {confidence}%
            </span>

          </div>

          <div className="h-3 w-full rounded-full bg-white/20">

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${confidence}%`,
              }}
              transition={{ duration: 1 }}
              className="h-3 rounded-full bg-white"
            />

          </div>

          <div className="grid grid-cols-2 gap-5 mt-8">

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="rounded-2xl bg-white/10 p-5"
            >

              <TrendingUp />

              <h3 className="mt-4 text-3xl font-bold">
                {resolutionRate}%
              </h3>

              <p className="mt-1 text-sm opacity-80">
                Resolution Rate
              </p>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="rounded-2xl bg-white/10 p-5"
            >

              <Target />

              <h3 className="mt-4 text-lg font-bold">
                {commonIssue}
              </h3>

              <p className="mt-1 text-sm opacity-80">
                Most Common Issue
              </p>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="rounded-2xl bg-white/10 p-5"
            >

              <CheckCircle2 />

              <h3 className="mt-4 text-3xl font-bold">
                {resolved}
              </h3>

              <p className="mt-1 text-sm opacity-80">
                Reports Solved
              </p>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="rounded-2xl bg-white/10 p-5"
            >

              <Brain />

              <h3 className="mt-4 text-3xl font-bold">
                {total}
              </h3>

              <p className="mt-1 text-sm opacity-80">
                AI Scanned
              </p>

            </motion.div>

          </div>

        </div>

      </div>

      {/* Reports Pie Chart */}

      <ReportsChart reports={reports} />

    </motion.div>
  );
}