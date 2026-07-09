import { useEffect, useState } from "react";
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
      alert("Failed to fetch reports");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/reports/${id}/status`, {
        status,
      });

      fetchReports();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // ============================
  // Statistics
  // ============================

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

  const rejectedReports = reports.filter(
    (r) => r.status === "REJECTED"
  ).length;

  // ============================
  // Search + Filter
  // ============================

  const filteredReports = reports.filter((report) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      report.title.toLowerCase().includes(keyword) ||
      report.issueType.toLowerCase().includes(keyword) ||
      report.citizen.fullName.toLowerCase().includes(keyword);

    const matchesStatus =
      statusFilter === "ALL" ||
      report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>

      <hr />

      <h2>Statistics</h2>

      <p><b>Total Reports:</b> {totalReports}</p>
      <p><b>Pending:</b> {pendingReports}</p>
      <p><b>In Progress:</b> {inProgressReports}</p>
      <p><b>Resolved:</b> {resolvedReports}</p>
      <p><b>Rejected:</b> {rejectedReports}</p>

      <hr />

      <h2>Search & Filter</h2>

      <input
        type="text"
        placeholder="Search title, issue or citizen..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "10px",
          marginRight: "20px",
        }}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{
          padding: "10px",
        }}
      >
        <option value="ALL">All</option>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="RESOLVED">Resolved</option>
        <option value="REJECTED">Rejected</option>
      </select>

      <hr />

      {filteredReports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        filteredReports.map((report) => (
          <div
            key={report.id}
            style={{
              border: "1px solid gray",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h2>{report.title}</h2>

            <p>{report.description}</p>

            <p><b>Status:</b> {report.status}</p>

            <p><b>Issue Type:</b> {report.issueType}</p>

            <p>
              <b>AI Prediction:</b>{" "}
              {report.aiClass || "Not Predicted"}
            </p>

            <p>
              <b>Confidence:</b>{" "}
              {report.aiConfidence
                ? `${(report.aiConfidence * 100).toFixed(1)}%`
                : "N/A"}
            </p>

            <p><b>User:</b> {report.citizen.fullName}</p>

            <p><b>Email:</b> {report.citizen.email}</p>

            <p>
              <b>Latitude:</b> {report.latitude}
            </p>

            <p>
              <b>Longitude:</b> {report.longitude}
            </p>

            <p>
              <b>Address:</b>{" "}
              {report.address || "Not Available"}
            </p>

            {report.images.length > 0 && (
              <img
                src={`http://localhost:4000${report.images[0].imageUrl}`}
                alt="Issue"
                width="250"
              />
            )}

            <br />
            <br />

            <button onClick={() => updateStatus(report.id, "PENDING")}>
              Pending
            </button>{" "}

            <button onClick={() => updateStatus(report.id, "IN_PROGRESS")}>
              In Progress
            </button>{" "}

            <button onClick={() => updateStatus(report.id, "RESOLVED")}>
              Resolved
            </button>{" "}

            <button onClick={() => updateStatus(report.id, "REJECTED")}>
              Rejected
            </button>
          </div>
        ))
      )}
    </div>
  );
}