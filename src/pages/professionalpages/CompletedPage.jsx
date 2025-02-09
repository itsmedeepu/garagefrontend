import React from "react";
import Completed from "../../components/professional/Completed";
import { getallBookingsLoader } from "./ProfDashboardPage";
import { loadServices } from "./ViewAllBookingsPages";
import { getAllUsers } from "./ViewBookingPage";

function CompletedPage() {
  return <Completed />;
}

export default CompletedPage;

export const CompletedLoader = async () => {
  return {
    bookings: getallBookingsLoader(),
    services: loadServices(),
    users: getAllUsers(),
  };
};
