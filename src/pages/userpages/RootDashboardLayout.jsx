import React, { Suspense, useState, useEffect } from "react";
import Dashboard from "../../components/user/DashBoard";
import {
  Await,
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from "react-router";
import { CircularProgress } from "@mui/material";
import { axiosInstance } from "../../axioshelpers/Useraxioshelpers";
import { ToastContainer, Bounce } from "react-toastify";
import { loaduser } from "./Profile";

function RootDashboardLayout() {
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

export default RootDashboardLayout;

export const LoadUserDetails = async () => {
  return {
    userdata: loaduser(),
  };
};
