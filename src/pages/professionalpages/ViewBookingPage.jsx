import React from "react";
import ViewBooking from "../../components/professional/ViewBooking";
import Dashboard from "../../components/professional/DashboardLayout";
import { profaxiosInstance } from "../../axioshelpers/Profaxioshelpers";
import { loadServices } from "./ViewAllBookingsPages";
import { toast, Bounce } from "react-toastify";

function ViewBookingPage() {
  return <ViewBooking />;
}

export default ViewBookingPage;

const bookingByBookingid = async (bookingid) => {
  const response = await profaxiosInstance.get("/bookingbyid/" + bookingid);
  const bookings = response.data?.data;
  return bookings;
};

export const getAllUsers = async () => {
  const response = await profaxiosInstance.get("/allusers");

  const users = response.data.data;
  return users;
};

export const ViewBookingLoader = async ({ params }) => {
  const bookingid = params.id;

  return {
    bookings: bookingByBookingid(bookingid),
    users: getAllUsers(),
    services: loadServices(),
  };
};

export const BookingAcceptAction = async (bookingid) => {
  const professinalid = localStorage.getItem("professinalid");
  try {
    const response = await profaxiosInstance.post("/acceptbooking", {
      professinalid,
      bookingid,
    });

    if (response.status === 201 || response.status === 200) {
      toast.success("Booking Accepted sucessfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        toastId: "profile-update-success",
      });
    }
  } catch (error) {
    if (error.status === 401) {
      toast.warning("all details required", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        toastId: "profile-update-success",
      });
    }
    if (error.status === 404) {
      toast.success("no booking found", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        toastId: "profile-update-success",
      });
    }

    if (error.status === 500) {
      toast.success("Something went bad..", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        toastId: "profile-update-success",
      });
    }
  }
};
