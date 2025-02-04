import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_BASE}/upload`, formData);
};

export const getStatus = (requestId) => {
  return axios.get(`${API_BASE}/status/${requestId}`);
};
