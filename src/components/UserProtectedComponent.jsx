import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axioshelpers/Useraxioshelpers";

function UserProtectedComponent({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of <Navigate />

  useEffect(() => {
    const auth = async () => {
      if (
        !localStorage.getItem("accesstoken") ||
        !localStorage.getItem("refreshtoken")
      ) {
        setIsAuthenticated(false);
        navigate("/garage/user/login", { replace: true });
        return;
      }
      try {
        const response = await axiosInstance.post("/auth");
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        // Clear invalid tokens
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        localStorage.removeItem("userid");

        setIsAuthenticated(false);
        navigate("/garage/user/login", { replace: true });
      }
    };

    auth();
  }, [navigate]); // Include navigate in dependencies

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null; // Return null to avoid flashing UI before navigation
}

export default UserProtectedComponent;
