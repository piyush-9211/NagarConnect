import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ReportIssue() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issueType, setIssueType] = useState("");
  const [image, setImage] = useState(null);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        alert("Location fetched successfully!");
      },
      () => {
        alert("Unable to fetch location.");
      }
    );
  };

  const submitReport = async () => {
    try {
      if (!latitude || !longitude) {
        alert("Please fetch your location first.");
        return;
      }

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("issueType", issueType);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      if (image) {
        formData.append("image", image);
      }

      const res = await api.post("/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);

      alert("🎉 Report submitted successfully!");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Report an Issue</h1>

      <br />

      <input
        placeholder="Complaint Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        rows="5"
        cols="40"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <select
        value={issueType}
        onChange={(e) => setIssueType(e.target.value)}
      >
        <option value="">Select Issue Type</option>
        <option value="Pothole">Pothole</option>
        <option value="Garbage">Garbage</option>
        <option value="Street Light">Street Light</option>
        <option value="Water Leakage">Water Leakage</option>
        <option value="Road Damage">Road Damage</option>
      </select>

      <br />
      <br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <br />
      <br />

      {image && (
        <>
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            width="250"
          />
          <br />
          <br />
        </>
      )}

      <button onClick={getLocation}>
        📍 Get Current Location
      </button>

      <br />
      <br />

      {latitude && (
        <>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          <br />
        </>
      )}

      <button onClick={submitReport}>
        🚀 Submit Report
      </button>
    </div>
  );
}