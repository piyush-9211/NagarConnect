import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/layout/Navbar";
import UploadArea from "../components/report/UploadArea";
import AIAnalysis from "../components/report/AIAnalysis";
import LocationCard from "../components/report/LocationCard";
import IssueForm from "../components/report/IssueForm";

import api from "../services/api";

export default function ReportIssue() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported.");
      return;
    }

    setLocationLoading(true);

    toast.loading("Detecting your location...", {
      id: "location",
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lon);

        try {
          const response = await api.get(
            "/reports/geocode",
            {
              params: {
                latitude: lat,
                longitude: lon,
              },
            }
          );

          setAddress(
            response.data.address ||
              "Address not found"
          );

          toast.success(
            "Location detected successfully!",
            {
              id: "location",
            }
          );
        } catch (error) {
          console.error(
            "Reverse geocoding failed:",
            error
          );

          setAddress(
            "Address could not be detected"
          );

          toast.success(
            "Coordinates detected!",
            {
              id: "location",
            }
          );
        }

        setLocationLoading(false);
      },
      (error) => {
        console.error(
          "LOCATION ERROR:",
          error
        );

        setLocationLoading(false);

        toast.error(
          "Could not detect location.",
          {
            id: "location",
          }
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 60000,
      }
    );
  };

  const submitReport = async () => {
    try {
      if (!image) {
        toast.error("Please upload an image.");
        return;
      }

      if (
        latitude == null ||
        longitude == null
      ) {
        toast.error(
          "Please detect your location first."
        );
        return;
      }

      setLoading(true);
      setAiResult(null);

      const formData = new FormData();

      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("address", address);
      formData.append("image", image);

      const response = await api.post(
        "/reports",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(
        "REPORT CREATED:",
        response.data
      );

      if (response.data.ai) {
        setAiResult(response.data.ai);
      }

      toast.success(
        "🎉 AI Report Submitted Successfully!"
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      console.error(
        "SUBMIT REPORT ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC]">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Report New Issue
          </h1>

          <p className="text-gray-500 mt-2">
            Upload a photo and let AI identify
            the civic issue automatically.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <UploadArea
              image={image}
              setImage={(file) => {
                setImage(file);
                setAiResult(null);
              }}
            />
          </div>

          <div>
            <AIAnalysis
              image={image}
              issueType={
                aiResult?.class || ""
              }
              confidence={
                aiResult?.confidence || 0
              }
              severity={
                aiResult?.severity ||
                "Waiting for AI"
              }
              department={
                aiResult?.department ||
                "Waiting for AI"
              }
              estimatedCost={
                aiResult?.estimated_cost
              }
              detections={
                aiResult?.detections || []
              }
              loading={loading}
            />
          </div>

        </div>

        <div className="mt-8">
          <LocationCard
            latitude={latitude}
            longitude={longitude}
            address={address}
            getLocation={getLocation}
            locationLoading={
              locationLoading
            }
          />
        </div>

        <div className="mt-8">
          <IssueForm
            submitReport={submitReport}
            loading={loading}
            issueType={aiResult?.class}
            confidence={
              aiResult?.confidence
            }
            severity={
              aiResult?.severity
            }
            department={
              aiResult?.department
            }
            estimatedCost={
              aiResult?.estimated_cost
            }
          />
        </div>

      </div>

    </div>
  );
}
