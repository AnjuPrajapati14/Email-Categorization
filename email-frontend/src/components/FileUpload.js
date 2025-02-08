import React, { useState } from "react";
import { uploadFile } from "../utils/api"; // Ensure this function makes the correct API call

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(null); // Track requestId
  const [uploadProgress, setUploadProgress] = useState(0); // Track progress
  

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setResponse(null); // Clear previous responses
      setError(null); // Reset error on new file selection
      setUploadProgress(0); // Reset progress on new file selection
      
    } else {
      setError("Please select a valid CSV file.");
    }
  };

  // Handle form submission and file upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError(null); // Reset previous errors
    setUploadProgress(0); // Reset progress bar
    

    try {
      const formData = new FormData();
      formData.append("file", file); // Ensure the field name matches what the backend expects
      // Debugging FormData
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      // Call upload API with onUploadProgress to track file upload progress
      const res = await uploadFile(file, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent); // Update progress
          }
        },
      });

      setResponse(res.data);
      setRequestId(res.data.requestId); // Save requestId
      setFile(null); // Clear the file input field
      console.log("Upload successful:", res.data);

      
    } catch (error) {
      if (error.response) {
        // Log error details for debugging
        console.error("Upload failed with response:", error.response);
        setError(
          "Upload failed: " +
            (error.response?.data?.message || error.message || "Unknown error")
        );
      } else {
        console.error("Error:", error);
        setError("Upload failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        File Upload
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <span>
              <svg
                className="inline-block w-5 h-5 mr-2 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Uploading...
            </span>
          ) : (
            "Upload File"
          )}
        </button>

        {/* Progress Bar */}
        {loading && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full">
              <div
                className="bg-blue-600 text-xs font-semibold text-blue-100 text-center p-1 leading-none rounded-full"
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress}%
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800">
          <p>{error}</p>
        </div>
      )}

      {/* Response Message */}
      {response && (
        <div className="mt-4 p-4 bg-green-100 text-green-800">
          <p>
            Upload successful! Your request ID: <b>{requestId}</b>
          </p>
        </div>
      )}

      {/* Selected File Information */}
      {file && (
        <div className="p-2 bg-gray-100 text-gray-700 rounded">
          <p>Selected file: {file.name}</p>
        </div>
      )}
       
      
    </div>
  );
};

export default FileUpload;
