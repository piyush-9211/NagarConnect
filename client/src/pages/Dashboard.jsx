import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import api from "../services/api";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/dashboard/Hero";
import Stats from "../components/dashboard/Stats";
import RecentReports from "../components/dashboard/RecentReports";
import AIInsights from "../components/dashboard/AIInsights";

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get("/reports");
      setReports(res.data.reports);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalReports = reports.length;

  const resolved = reports.filter(
    (r) => r.status === "RESOLVED"
  ).length;

  const pending = reports.filter(
    (r) => r.status === "PENDING"
  ).length;

  const inProgress = reports.filter(
    (r) => r.status === "IN_PROGRESS"
  ).length;

  return (
    <motion.div
      className="min-h-screen bg-[#F7F9FC]"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-8">

        <Hero />

        <Stats
          total={totalReports}
          resolved={resolved}
          pending={pending}
          progress={inProgress}
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          <div className="lg:col-span-2">

            <RecentReports
              reports={reports}
              loading={loading}
            />

          </div>

          <div>

            <AIInsights reports={reports} />

          </div>

        </div>

      </div>

    </motion.div>
  );
}