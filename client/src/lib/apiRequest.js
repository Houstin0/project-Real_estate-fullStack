import axios from "axios";

// Create an Axios instance
const apiRequest = axios.create({
  baseURL: "http://localhost:8800/api",
  // baseURL: "https://keja-backendapi.onrender.com/api",
  withCredentials: true, // If you need to send cookies with requests
});

// Add a request interceptor to include the Authorization header
apiRequest.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    // Include the token in the Authorization header if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiRequest;