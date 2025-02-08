import React, { useState } from "react";
import axios from "axios";

const EmailActions = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload emails
  const handleFileUpload = async () => {
    if (!file) {
      setStatus("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading...");
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setStatus("Upload Successful");
    } catch (error) {
      setStatus("Upload Failed");
      console.error("Error uploading file:", error);
    }
  };

  // Download CSV
  const handleDownloadCSV = async () => {
    try {
      setStatus("Downloading...");
      const response = await axios.get("http://localhost:5000/api/download", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "${requestId}.csv");
      document.body.appendChild(link);
      link.click();
      setStatus("Download Successful");
    } catch (error) {
      setStatus("Download Failed");
      console.error("Error downloading file:", error);
    }
  }; 

  // Send email with CSV attachment
  const handleSendEmail = async () => {
    if (!email) {
      setStatus("Please enter a valid email.");
      return;
    }

    try {
      setStatus("Sending email...");
      const response = await axios.post(
        "http://localhost:5000/api/emails/send-email",
        {
          recipientEmail: email,
        }
      );
      setMessage(response.data.message);
      setStatus("Email Sent Successfully");
    } catch (error) {
      setStatus("Email Send Failed");
      console.error("Error sending email:", error);
    }
  };

  return (
    <div>
      <h2>Email Management</h2>

      {/* File Upload */}
      <div>
        <h3>Upload CSV</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload Emails</button>
      </div>

      {/* CSV Download */}
      <div>
        <h3>Download CSV</h3>
        <button onClick={handleDownloadCSV}>Download Categorized CSV</button>
      </div>

      {/* Send Email */}
      <div>
        <h3>Send CSV via Email</h3>
        <input
          type="email"
          placeholder="Enter recipient email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSendEmail}>Send Email</button>
      </div>

      {/* Status and Messages */}
      {status && <p>Status: {status}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

 
