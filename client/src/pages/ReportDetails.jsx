import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await api.get(`/reports/${id}`);

      console.log(res.data);

      setReport(res.data.report);
    } catch (err) {
      console.error(err);
      alert("Failed to load report.");
    }

    setLoading(false);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!report) {
    return <h2>Report not found.</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => navigate("/dashboard")}>
        ← Back
      </button>

      <h1>Report Details</h1>

      <hr />

      <h2>{report.title}</h2>

      <p>
        <b>Description:</b>
      </p>

      <p>{report.description}</p>

      <p>
        <b>Status:</b> {report.status}
      </p>

      <p>
        <b>Issue Type:</b> {report.issueType}
      </p>

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

      <p>
        <b>Submitted By:</b>{" "}
        {report.citizen.fullName}
      </p>

      <p>
        <b>Email:</b>{" "}
        {report.citizen.email}
      </p>

      <p>
        <b>Created:</b>{" "}
        {new Date(report.createdAt).toLocaleString()}
      </p>

      <hr />

      <h2>Uploaded Image</h2>

      {report.images.length > 0 ? (
        <img
          src={`http://localhost:4000${report.images[0].imageUrl}`}
          alt="Report"
          width="400"
        />
      ) : (
        <p>No Image Uploaded</p>
      )}

      <hr />

      <h2>AI Prediction</h2>

      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
        }}
      >
        <h3>🚧 Coming Soon...</h3>

        <p>
          This section will display the AI prediction
          after Kavya finishes the model.
        </p>

        <p>
          <b>Detected Issue:</b> —
        </p>

        <p>
          <b>Confidence:</b> —
        </p>
      </div>
    </div>
  );
}