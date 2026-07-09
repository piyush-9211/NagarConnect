import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get("/reports");

      console.log(res.data);

      setReports(res.data.reports);
    } catch (err) {
      console.error(err);
      alert("Failed to load reports");
    }

    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const pending = reports.filter(
    (r) => r.status === "PENDING"
  ).length;

  const resolved = reports.filter(
    (r) => r.status === "RESOLVED"
  ).length;

  return (
    <div style={{ padding: "40px" }}>
      <h1>NagarConnect Dashboard</h1>

      <p>Welcome back 👋</p>

      <hr />

      <h2>Quick Actions</h2>

      <button onClick={() => navigate("/report")}>
        Report New Issue
      </button>

      <br />
      <br />

      <button onClick={fetchReports}>
        Refresh Reports
      </button>

      <br />
      <br />

      <button onClick={logout}>
        Logout
      </button>

      <hr />

      <h2>Statistics</h2>

      <p>Total Reports : {reports.length}</p>

      <p>Pending : {pending}</p>

      <p>Resolved : {resolved}</p>

      <hr />

      <h2>Recent Reports</h2>

      {loading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p>No reports yet.</p>
      ) : (
        reports.map((report) => (
          <div
            key={report.id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{report.title}</h3>

            <p>{report.description}</p>

            <p>
              <b>Status:</b> {report.status}
            </p>

            <p>
              <b>Issue:</b> {report.issueType}
            </p>

            <p>
              <b>Location:</b>{" "}
              {report.latitude}, {report.longitude}
            </p>

            {report.images.length > 0 && (
              <img
                src={`http://localhost:4000${report.images[0].imageUrl}`}
                alt=""
                width="250"
              />
            )}

            <br />
            <br />

            <button
              onClick={() =>
                navigate(`/report/${report.id}`)
              }
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
}