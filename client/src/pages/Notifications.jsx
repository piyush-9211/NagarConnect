import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import NotificationPanel from "../components/notifications/NotificationPanel";

import api from "../services/api";

export default function Notifications() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    try {
      const res = await api.get("/reports");
      setReports(res.data.reports);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC]">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Notifications
          </h1>

          <p className="mt-2 text-gray-500">
            Stay updated with the latest activity on your reports.
          </p>

        </div>

        {loading ? (

          <div className="rounded-3xl bg-white p-20 text-center shadow-sm">

            <h2 className="text-2xl font-semibold">
              Loading Notifications...
            </h2>

          </div>

        ) : (

          <NotificationPanel reports={reports} />

        )}

      </div>

    </div>
  );
}