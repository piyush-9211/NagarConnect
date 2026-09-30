import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "../components/layout/Navbar";
import AdminStats from "../components/admin/AdminStats";
import AdminTable from "../components/admin/AdminTable";

import api from "../services/api";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get("/reports/admin/all");
      setReports(res.data.reports);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch reports");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/reports/${id}/status`, {
        status,
      });

      toast.success("Status Updated");

      fetchReports();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (r) => r.status === "PENDING"
  ).length;

  const inProgressReports = reports.filter(
    (r) => r.status === "IN_PROGRESS"
  ).length;

  const resolvedReports = reports.filter(
    (r) => r.status === "RESOLVED"
  ).length;

  const filteredReports = reports.filter((report) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      report.title.toLowerCase().includes(keyword) ||
      report.issueType.toLowerCase().includes(keyword) ||
      report.citizen.fullName
        .toLowerCase()
        .includes(keyword);

    const matchesStatus =
      statusFilter === "ALL" ||
      report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC]">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-8">

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage citizen reports and monitor city issues.
          </p>

        </div>

        <AdminStats
          total={totalReports}
          pending={pendingReports}
          progress={inProgressReports}
          resolved={resolvedReports}
        />

        <div className="mt-10 flex flex-col lg:flex-row gap-5 justify-between">

          <div className="relative w-full lg:w-96">

            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search reports..."
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 outline-none focus:border-blue-500"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-gray-300 bg-white px-5 py-3"
          >
            <option value="ALL">
              All Reports
            </option>

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

        <AdminTable
          reports={filteredReports}
          updateStatus={updateStatus}
        />

      </div>

    </div>
  );
}