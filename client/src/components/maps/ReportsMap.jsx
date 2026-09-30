import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function ReportsMap({ reports }) {
  const navigate = useNavigate();

  const defaultCenter =
    reports.length > 0
      ? [
          Number(reports[0].latitude),
          Number(reports[0].longitude),
        ]
      : [20.5937, 78.9629];

  return (
    <div className="rounded-3xl bg-white shadow-sm overflow-hidden">

      <div className="px-6 py-5 border-b">

        <h2 className="text-2xl font-bold">
          Reports Map
        </h2>

        <p className="text-gray-500 mt-1">
          View all reported civic issues
        </p>

      </div>

      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{
          height: "600px",
          width: "100%",
        }}
      >

        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reports.map((report) => {

          if (!report.latitude || !report.longitude)
            return null;

          return (

            <Marker
              key={report.id}
              position={[
                Number(report.latitude),
                Number(report.longitude),
              ]}
            >

              <Popup>

                <div className="w-64">

                  {report.images &&
                  report.images.length > 0 && (

                    <img
                      src={`http://localhost:4000${report.images[0].imageUrl}`}
                      alt=""
                      className="h-36 w-full rounded-xl object-cover"
                    />

                  )}

                  <h3 className="mt-4 text-lg font-bold">
                    {report.title}
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {report.issueType}
                  </p>

                  <p className="mt-2">

                    <span
                      className={`rounded-full px-3 py-1 text-sm
                      ${
                        report.status === "RESOLVED"
                          ? "bg-green-100 text-green-700"

                          : report.status ===
                            "IN_PROGRESS"
                          ? "bg-yellow-100 text-yellow-700"

                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {report.status.replace("_", " ")}
                    </span>

                  </p>

                  <p className="mt-3 text-sm text-gray-500">

                    AI Confidence:

                    {" "}

                    {report.aiConfidence
                      ? `${(
                          report.aiConfidence * 100
                        ).toFixed(1)}%`
                      : "N/A"}

                  </p>

                  <button
                    onClick={() =>
                      navigate(`/report/${report.id}`)
                    }
                    className="mt-4 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
                  >
                    View Report
                  </button>

                </div>

              </Popup>

            </Marker>

          );

        })}

      </MapContainer>

    </div>
  );
}