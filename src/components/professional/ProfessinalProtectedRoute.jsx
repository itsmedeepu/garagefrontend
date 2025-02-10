import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profaxiosInstance } from "../../axioshelpers/Profaxioshelpers";
import { LinearProgress } from "@mui/material";

function ProfessinalProtectedComponent({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of <Navigate />

  useEffect(() => {
    const auth = async () => {
      if (
        !localStorage.getItem("accesstoken") ||
        !localStorage.getItem("refreshtoken")
      ) {
        setIsAuthenticated(false);
        navigate("/professional/login", { replace: true });
        return;
      }
      try {
        const response = await profaxiosInstance.post("/auth");
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        // Clear invalid tokens
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        localStorage.removeItem("professinalid");

        setIsAuthenticated(false);
        navigate("/professional/login", { replace: true });
      }
    };

    auth();
  }, [navigate]); // Include navigate in dependencies

  if (isAuthenticated === null) {
    return <LinearProgress color="error" />;
  }

  return isAuthenticated ? children : null; // Return null to avoid flashing UI before navigation
}

export default ProfessinalProtectedComponent;
