import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem(
      "researchpilot-auth"
    );

    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);

        const token = parsed?.state?.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        console.error(
          "Failed to read authentication state"
        );
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;