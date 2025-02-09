import { redirect } from "react-router";
import axios from "axios";

const token = localStorage.getItem("accesstoken"); // Fetch access token from localStorage

const URL = import.meta.env.VITE_API_URL;
// Axios instance with default settings
export const profaxiosInstance = axios.create({
  baseURL: `${URL}/professinal`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// Attach interceptor for token refresh
profaxiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Check if error status is 401 and prevent infinite retry loop
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshtoken");
        if (!refreshToken) {
          // Redirect to login if no refresh token is available
          return redirect("/garage/professional/login");
        }

        // Refresh the access token
        const refreshResponse = await axios.post(
          `${URL}/professinal/refresh`,

          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + refreshToken,
            },
          }
        );

        const { accesstoken, refreshtoken: newRefreshToken } =
          refreshResponse.data.data;

        // Update tokens in localStorage
        localStorage.setItem("accesstoken", accesstoken);
        localStorage.setItem("refreshtoken", newRefreshToken);

        // Update the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${accesstoken}`;
        return profaxiosInstance(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        localStorage.removeItem("professionalid");

        return redirect("/garage/professional/login");
      }
    }

    // Reject other errors
    return Promise.reject(error);
  }
);
