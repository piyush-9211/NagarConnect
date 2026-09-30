import { MapPin, LocateFixed } from "lucide-react";

export default function LocationCard({
  latitude,
  longitude,
  getLocation,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">

      <div className="flex items-center gap-3 mb-6">

        <MapPin className="text-blue-600" />

        <h2 className="text-2xl font-bold">
          Current Location
        </h2>

      </div>

      <div className="space-y-5">

        <div className="bg-gray-50 rounded-2xl p-5">

          <p className="text-sm text-gray-500">
            Latitude
          </p>

          <h3 className="text-lg font-semibold mt-1">
            {latitude ?? "Not Detected"}
          </h3>

        </div>

        <div className="bg-gray-50 rounded-2xl p-5">

          <p className="text-sm text-gray-500">
            Longitude
          </p>

          <h3 className="text-lg font-semibold mt-1">
            {longitude ?? "Not Detected"}
          </h3>

        </div>

        <button
          onClick={getLocation}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-semibold flex justify-center items-center gap-3 transition"
        >
          <LocateFixed size={20} />

          Detect My Location
        </button>

      </div>

    </div>
  );
}