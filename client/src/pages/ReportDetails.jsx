import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  ShieldCheck,
  ArrowLeft,
  Building2,
  TriangleAlert,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import api from "../services/api";

export default function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  async function fetchReport() {
    try {
      const res = await api.get(`/reports/${id}`);
      setReport(res.data.report);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F8FC]">
        <Navbar />
        <div className="text-center py-24 text-xl">
          Loading report...
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#F6F8FC]">
        <Navbar />
        <div className="text-center py-24 text-xl">
          Report not found.
        </div>
      </div>
    );
  }

  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    RESOLVED: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC]">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-8">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 font-semibold mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

              <img
                src={
                  report.images?.length
                    ? `http://localhost:4000${report.images[0].imageUrl}`
                    : "https://placehold.co/900x550?text=No+Image"
                }
                alt={report.title}
                className="w-full h-[520px] object-cover"
              />

              <div className="p-8">

                <div className="flex justify-between items-start">

                  <div>

                    <h1 className="text-4xl font-bold">
                      {report.title}
                    </h1>

                    <div className="flex gap-6 mt-4 text-gray-500">

                      <div className="flex items-center gap-2">

                        <CalendarDays size={18} />

                        {new Date(
                          report.createdAt
                        ).toLocaleDateString()}

                      </div>

                      <div className="flex items-center gap-2">

                        <MapPin size={18} />

                        Bengaluru

                      </div>

                    </div>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      statusColor[report.status]
                    }`}
                  >
                    {report.status.replace("_", " ")}
                  </span>

                </div>

                <div className="mt-8">

                  <h2 className="text-2xl font-bold">
                    Description
                  </h2>

                  <p className="mt-4 text-gray-600 leading-8">
                    {report.description}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="space-y-6">

            <div className="bg-white rounded-3xl shadow-sm p-7">

              <div className="flex items-center gap-3">

                <ShieldCheck className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  AI Analysis
                </h2>

              </div>

              <div className="mt-8 space-y-6">

                <div>

                  <p className="text-gray-500">
                    Issue Type
                  </p>

                  <h3 className="text-xl font-semibold">
                    {report.issueType}
                  </h3>

                </div>

                <div>

                  <p className="text-gray-500">
                    AI Confidence
                  </p>

                  <div className="mt-3 h-3 rounded-full bg-gray-200">

                    <div
                      className="h-3 rounded-full bg-blue-600"
                      style={{ width: "94%" }}
                    />

                  </div>

                  <p className="mt-2 font-bold text-blue-600">
                    94%
                  </p>

                </div>

                <div>

                  <p className="text-gray-500">
                    Department
                  </p>

                  <div className="flex items-center gap-2 mt-2">

                    <Building2 size={18} />

                    Roads Department

                  </div>

                </div>

                <div>

                  <p className="text-gray-500">
                    Severity
                  </p>

                  <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-2 rounded-full mt-2">

                    <TriangleAlert size={16} />

                    High

                  </span>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-sm p-7">

              <h2 className="text-2xl font-bold mb-6">
                Location
              </h2>

              <div className="space-y-4">

                <div>

                  <p className="text-gray-500">
                    Latitude
                  </p>

                  <h3>{report.latitude}</h3>

                </div>

                <div>

                  <p className="text-gray-500">
                    Longitude
                  </p>

                  <h3>{report.longitude}</h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}