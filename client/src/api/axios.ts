import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop();
}

api.interceptors.request.use((request) => {
  const csrfToken = getCookie("csrfToken");

  if (csrfToken) {
    request.headers["x-csrf-token"] = csrfToken;
  }

  return request;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      window.location.href = "/login";
    } else if (error.response?.status === 500) {
      toast.error("Server error. Please try again later.");
    } else if (error.code === "ERR_NETWORK") {
      toast.error("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  },
);
