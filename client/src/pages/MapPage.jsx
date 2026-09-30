import { useEffect, useState } from "react";
import { MapPinned } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import ReportsMap from "../components/maps/ReportsMap";

import api from "../services/api";

export default function MapPage() {
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

        <div className="mb-10">

          <div className="flex items-center gap-3">

            <MapPinned
              size={36}
              className="text-blue-600"
            />

            <div>

              <h1 className="text-4xl font-bold">
                Civic Issues Map
              </h1>

              <p className="text-gray-500 mt-2">
                Explore every reported civic issue across your city.
              </p>

            </div>

          </div>

        </div>

        {loading ? (

          <div className="rounded-3xl bg-white p-20 text-center shadow-sm">

            <div className="text-2xl font-semibold">
              Loading Map...
            </div>

          </div>

        ) : (

          <ReportsMap reports={reports} />

        )}

      </div>

    </div>
  );
}