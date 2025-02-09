import { useNavigate } from "react-router";

import { useState, useEffect } from "react";

import { adminaxiosInstance } from "../../axioshelpers/Adminaxioshelpers";

function AdminProtectedComponent({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of <Navigate />

  useEffect(() => {
    const auth = async () => {
      if (
        !localStorage.getItem("accesstoken") ||
        !localStorage.getItem("refreshtoken")
      ) {
        setIsAuthenticated(false);
        navigate("/admin/login", { replace: true });
        return;
      }
      try {
        const response = await adminaxiosInstance.post("/auth");
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        // Clear invalid tokens
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        localStorage.removeItem("adminid");

        setIsAuthenticated(false);
        navigate("/admin/login", { replace: true });
      }
    };

    auth();
  }, [navigate]); // Include navigate in dependencies

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null; // Return null to avoid flashing UI before navigation
}

export default AdminProtectedComponent;
