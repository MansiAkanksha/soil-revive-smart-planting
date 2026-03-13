import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
export const AUTH_TOKEN_KEY = "soilrevive_token";
export const AUTH_USER_KEY = "soilrevive_user";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT for every protected backend call.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (payload) => api.post("/api/auth/register", payload),
  login: (payload) => api.post("/api/auth/login", payload),
};

export const recommendationApi = {
  createRecommendation: (payload) => api.post("/api/recommend", payload),
  getHistory: () => api.get("/api/history"),
};

export const statsApi = {
  getGlobalStats: () => api.get("/api/global-stats"),
};

export default api;
