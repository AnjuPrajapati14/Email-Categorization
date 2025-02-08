/* 
import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // Base URL for your API

// File upload function with additional configuration options (e.g., onUploadProgress)
export const uploadFile = async (file, config = {}) => {
  try {
    const formData = new FormData();
    formData.append("file", file); // Ensure the backend expects "file" as the key

    const response = await axios.post(`${API_BASE}/emails/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config, // Spread additional config options like onUploadProgress
    });

    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Re-throw the error for further handling
  }
};

// Get the status of a specific request by its requestId
export const getStatus = async (requestId) => {
  try {
    const response = await axios.get(`${API_BASE}/status/${requestId}`);
    return response.data; // Return the status data
  } catch (error) {
    console.error("Error fetching status:", error);
    throw error;
  }
};

*/
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

// File upload function with additional config options (e.g., onUploadProgress)
export const uploadFile = (file, config = {}) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API_BASE}/emails/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...config, // Spread additional config like onUploadProgress
  });
};

// Get the status of a specific request
export const getStatus = (requestId) => {
  return axios.get(`${API_BASE}/status/${requestId}`);
};
