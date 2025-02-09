import React from "react";
import ViewBookings from "../../components/professional/ViewBookings";
import { getallBookingsLoader } from "./ProfDashboardPage";
import { profaxiosInstance } from "../../axioshelpers/Profaxioshelpers";
import { Outlet } from "react-router";
const URL = import.meta.env.VITE_API_URL;
function ViewAllBookingsPages() {
  return (
    <>
      <ViewBookings />
    </>
  );
}

export default ViewAllBookingsPages;

export const loadServices = async () => {
  const res = await fetch(`${URL}/service/getservices`, { method: "GET" });

  const respdata = await res.json();

  return respdata.data.services;
};

export const fetchAllBookings = async () => {
  const response = await profaxiosInstance.get("/allbookings");

  const bookings = response?.data?.data?.Bookings;
  console.log(response);
  return bookings;
};

export const PendingBookings = async () => {
  const bookings = await fetchAllBookings();

  console.log(bookings);

  const pendingbookings = bookings.filter(
    (booking) => booking.status === "Pending"
  );
  return pendingbookings;
};
export const Viewallbookingsloader = async () => {
  return {
    services: loadServices(),
    bookings: PendingBookings(),
  };
};
