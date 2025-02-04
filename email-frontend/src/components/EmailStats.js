import React, { useState, useEffect } from "react";
import axios from "axios";

const EmailStats = () => {
  const [emailStats, setEmailStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/email-stats"
        );
        console.log("API Response:", response.data); // Debugging
        setEmailStats(response.data);
      } catch (error) {
        console.error("Error fetching email stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (!emailStats) {
    return (
      <div className="text-center text-red-500">Failed to load stats.</div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">
        📊 Email Processing Stats
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-blue-100 rounded-md text-center">
          <h3 className="text-lg font-semibold">Total Entries</h3>
          <p className="text-blue-700 text-xl">{emailStats.totalEntries}</p>
        </div>
        <div className="p-3 bg-green-100 rounded-md text-center">
          <h3 className="text-lg font-semibold">Total Processed</h3>
          <p className="text-green-700 text-xl">{emailStats.totalProcessed}</p>
        </div>
        <div className="p-3 bg-yellow-100 rounded-md text-center">
          <h3 className="text-lg font-semibold">Total Pending</h3>
          <p className="text-yellow-700 text-xl">{emailStats.totalPending}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-md text-center">
          <h3 className="text-lg font-semibold">Status</h3>
          <p className="text-gray-700 text-md">{emailStats.status}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">📬 Categorized Emails</h3>
          <div className="p-3 bg-indigo-100 rounded-md mt-2">
            <h4 className="text-md font-medium">Personal Emails</h4>
            <p className="text-indigo-700 text-xl">
              {emailStats.personalEmails}
            </p>
          </div>
          <div className="p-3 bg-pink-100 rounded-md mt-2">
            <h4 className="text-md font-medium">Work Emails</h4>
            <p className="text-pink-700 text-xl">{emailStats.workEmails}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailStats;

/*

*/
