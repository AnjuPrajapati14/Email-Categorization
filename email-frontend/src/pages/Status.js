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
      {/* StatusCheck component to enter Request ID and fetch status */}
      <StatusCheck onStatusFetched={(data) => setStats(data)} />
      {/* Show Email Stats only when status is fetched */}
      {stats && <EmailStats stats={stats} />}
    </div>
  );
};

export default Status;
