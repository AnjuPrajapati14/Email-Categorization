import React, { useState } from "react";
import { uploadFile } from "../utils/api";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(null); // Track requestId
  const [status, setStatus] = useState(null);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError(null); // Reset previous errors

    try {
      const res = await uploadFile(file);
      setResponse(res);
      setRequestId(res.data.requestId); // Save requestId
      console.log(requestId); //req id in console
    } catch (error) {
      setError("Upload failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800">
          <p>{error}</p>
        </div>
      )}

      {response && (
        <div className="mt-4 p-4 bg-green-100 text-green-800">
          <p>
            Upload successful! Your request ID: <b>{requestId}</b>
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

/*import React, { useState } from "react";
import { uploadFile } from "../utils/api";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(null); // Track requestId

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null); // Clear previous responses
    setError(null); // Reset error on new file selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError(null); // Reset previous errors

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadFile(formData); // Assuming `uploadFile` handles the API call
      setResponse(res.data);
      setRequestId(res.data.requestId); // Save requestId
      setFile(null); // Clear the file input field
    } catch (error) {
      setError("Upload failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">File Upload</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-2 w-full rounded"
          />
        </div>
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
      </form>
*/
/*
      
      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <p>{error}</p>
        </div>
      )}

       
      {response && (
        <div className="p-4 bg-green-100 text-green-800 rounded">
          <p>
            Upload successful! Your request ID: <b>{response.requestId}</b>
          </p>
        </div>
      )}

      
      {file && (
        <div className="p-2 bg-gray-100 text-gray-700 rounded">
          <p>Selected file: {file.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
*/
