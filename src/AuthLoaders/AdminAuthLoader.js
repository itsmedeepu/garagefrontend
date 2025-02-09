import { redirect } from "react-router";
import axios from "axios";

export const AdminAuthLoader = async () => {
  const token = localStorage.getItem("accesstoken"); // Fetch access token from localStorage

  // Redirect if no token is found
  if (!token) {
    return redirect("/garage/admin/login");
  }

  // Axios instance with default settings
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1/garage/admin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Attach interceptor for token refresh
  axiosInstance.interceptors.response.use(
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
            return redirect("/garage/admin/login");
          }

          // Refresh the access token
          const refreshResponse = await axios.post(
            "http://localhost:3000/api/v1/garage/admin/refresh",

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
          return axiosInstance(originalRequest); // Retry the original request
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("refreshtoken");

          return redirect("/garage/admin/login");
        }
      }

      // Reject other errors
      return Promise.reject(error);
    }
  );

  // Test API call for authentication
  try {
    const response = await axiosInstance.post("/auth");
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Authentication failed:", error);

    // Clear invalid tokens
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");

    // Return redirect response directly
    return redirect("/garage/admin/login");
  }
};
