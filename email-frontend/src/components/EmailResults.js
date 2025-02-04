// EmailResults.js
import React from "react";

const EmailResults = ({ emails = { workEmails: [], personalEmails: [] } }) => {
  const { workEmails, personalEmails } = emails;

  if (!workEmails.length && !personalEmails.length) {
    return (
      <div className="mt-6 bg-white shadow-md rounded-md p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          No Emails Found
        </h2>
        <p className="text-gray-500">Try uploading a valid CSV file.</p>
      </div>
    );
  }
  return (
    <div className="mt-6 bg-white shadow-md rounded-md p-6 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Segregated Emails
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Work Emails</h3>
          <ul className="list-disc pl-5 space-y-1">
            {workEmails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Personal Emails</h3>
          <ul className="list-disc pl-5 space-y-1">
            {personalEmails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailResults;
