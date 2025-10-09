import axios from "axios";

// Base API setup
const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
