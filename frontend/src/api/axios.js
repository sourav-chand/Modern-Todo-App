import axios from "axios";

// Base API setup
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
