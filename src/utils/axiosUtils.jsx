import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000",
  // baseURL:"https://muta-engine.adaptable.app"
  baseURL: "https://muta-back.onrender.com",
});

export default axiosInstance;
