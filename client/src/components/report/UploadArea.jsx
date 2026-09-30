import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import UploadArea from "../components/report/UploadArea";

export default function ReportIssue() {
  const [image, setImage] = useState(null);

  return (
    <div className="min-h-screen bg-[#F6F8FC]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="text-4xl font-bold mb-8">
          Test Upload
        </h1>

        <UploadArea
          image={image}
          setImage={setImage}
        />
      </div>
    </div>
  );
}