import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";

export default function UploadArea({ image, setImage }) {

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setImage(acceptedFiles[0]);
      }
    },
    [setImage]
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [],
      },
      maxFiles: 1,
    });

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">
        Upload Image
      </h2>

      {!image ? (

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition ${
            isDragActive
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 hover:border-blue-500"
          }`}
        >

          <input {...getInputProps()} />

          <UploadCloud
            size={70}
            className="mx-auto text-blue-600"
          />

          <h3 className="mt-6 text-2xl font-semibold">
            Drag & Drop Image
          </h3>

          <p className="text-gray-500 mt-3">
            or click to browse
          </p>

        </div>

      ) : (

        <div>

          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            className="w-full h-96 object-cover rounded-2xl"
          />

          <button
            type="button"
            onClick={() => setImage(null)}
            className="mt-5 flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-200"
          >
            <X size={18} />
            Remove Image
          </button>

        </div>

      )}

    </div>
  );
}