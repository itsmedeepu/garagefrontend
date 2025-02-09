import React from "react";
import Dashboard from "../../components/professional/DashboardLayout";
import { Outlet } from "react-router";
import { ToastContainer, Bounce } from "react-toastify";
import { PendingBookings } from "./ViewAllBookingsPages";

const URL = import.meta.env.VITE_API_URL;

function ProfRootDashboardLayout() {
  return (
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
  );
}

export default ProfRootDashboardLayout;

export const getProfDetails = async () => {
  const profid = localStorage.getItem("professinalid");
  const response = await fetch(`${URL}/professinal/getprof/${profid}`);

  const data = await response.json();
  const prof = data?.data.prof;
  return prof;
};

export const Profmainloader = async () => {
  return {
    profdata: getProfDetails(),
    bookings: PendingBookings(),
  };
};
