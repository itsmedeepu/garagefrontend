import React from "react";
import BookedServices from "../../components/user/BookedServices";
import { loadServices } from "./BookservicePage";
const URL = import.meta.env.VITE_API_URL;
function BookedServicesPage() {
  return <BookedServices />;
}

export default BookedServicesPage;
// Loader function (should be in separate route file)
const getallBookingsLoader = async () => {
  const userid = localStorage.getItem("userid");
  const response = await fetch(`${URL}/booking/bookingbyuserid/` + userid);

  const respdata = await response.json();
  return respdata?.data?.booking;
};

export const viewallbookingsloader = async () => {
  return {
    bookings: getallBookingsLoader(),
    services: loadServices(),
  };
};
