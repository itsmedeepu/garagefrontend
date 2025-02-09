import React from "react";
import { Outlet } from "react-router";
import { ToastContainer, Bounce } from "react-toastify";
import Dashboard from "../../components/admin/DashboardLayout";
import { adminaxiosInstance } from "../../axioshelpers/Adminaxioshelpers";

function AdminRootLayout() {
  return (
    <>
      <Dashboard>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Outlet />
      </Dashboard>
    </>
  );
}

export default AdminRootLayout;

export const getAdminById = async () => {
  const adminid = localStorage.getItem("adminid");

  const response = await adminaxiosInstance.get(`/getadmin/${adminid}`);

  const admin = response?.data?.data;

  return admin?.admin;
};

export const AdminRootLoader = async () => {
  return {
    admindata: getAdminById(),
  };
};
