import React from "react";
import { useState } from "react";
import StatusCheck from "../components/StatusCheck";
import EmailStats from "../components/EmailStats";
const Status = () => {
  const [stats, setStats] = useState(null); // Store the stats when a request ID is entered

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center my-4">
        Check Processing Status
      </h1>

      <StatusCheck onStatusFetched={(data) => setStats(data)} />

      {stats && <EmailStats stats={stats} />}
    </div>
  );
};

export default Status;

/*
import React, { useState } from "react";
import StatusCheck from "../components/StatusCheck";
import EmailStats from "../components/EmailStats";

const Status = () => {
  const [stats, setStats] = useState(null); // Store the stats when a request ID is entered
  const [loading, setLoading] = useState(false); // Loading state for the status fetch
  const [error, setError] = useState(null); // Error state for handling API errors

  // Handle the status fetch logic
  const handleStatusFetch = async (requestId) => {
    setLoading(true);
    setError(null); // Reset any previous errors
    setStats(null);

    try {
      // Assuming there's an API call here to fetch the status by requestId
      const response = await fetch(`/api/emails/status/${requestId}`); // Replace with actual API endpoint
      // Check if the response is a valid JSON
      const contentType = response.headers.get("Content-Type");

      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text(); // Read non-JSON response as text
        throw new Error(`Non-JSON response: ${errorText}`);
      }

      const data = await response.json();

      if (response.ok) {
        setStats(data);
      } else {
        setError(data.message || "Error fetching status");
      }
    } catch (err) {
      console.error("Error fetching status:", err);
      setError(`Error fetching status: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-4">
        Check Processing Status
      </h1>

      
      <StatusCheck onStatusFetched={handleStatusFetch} />

       
      {loading && (
        <div className="text-center text-gray-500 mt-4">
          <p>Loading...</p>
        </div>
      )}

      
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
          <p>{error}</p>
        </div>
      )}

     
      {stats && (
        <div className="mt-4">
          <EmailStats stats={stats} />
        </div>
      )}
    </div>
  );
};

export default Status;
*/