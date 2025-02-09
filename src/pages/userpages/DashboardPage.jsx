import React, { Suspense } from "react";
import Dashboard from "../../components/user/DashBoard";
import {
  Box,
  Grid,
  Paper,
  Avatar,
  Typography,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {
  MdDashboard,
  MdAnalytics,
  MdInventory,
  MdCarCrash,
  MdCarRepair,
  MdCarRental,
} from "react-icons/md";
import {
  Await,
  redirect,
  useNavigation,
  useRouteLoaderData,
} from "react-router";
import { axiosInstance } from "../../axioshelpers/Useraxioshelpers";

const URL = import.meta.env.VITE_API_URL;
function DashboardPage() {
  const { bookings } = useRouteLoaderData("dashboard");
  const steps = ["Booked", "Accepted", "Completed"];

  const getActiveStep = (status) => {
    if (status === "Pending") return 0;
    if (status === "Accepted") return 1;
    if (status === "Completed") return steps.length; // Set to steps.length to mark all steps as completed
    return 0;
  };

  const cardsData = [
    {
      title: "Total Services",
      icon: <MdCarRepair size={24} />,
      color: "#1976D2",
    },
    {
      title: "Completed Services",
      icon: <MdCarCrash size={24} />,
      color: "#2E7D32",
    },
    { title: "Ongoing", icon: <MdCarRental size={24} />, color: "#D32F2F" },
  ];

  return (
    <Grid container spacing={3}>
      <Suspense
        fallback={<CircularProgress sx={{ display: "block", mx: "auto" }} />}
      >
        <Await resolve={bookings}>
          {(bookingsData) => {
            // Process data once for both cards and status
            const bookingStats = {
              total: bookingsData.length,
              completed: bookingsData.filter((b) => b.status === "Completed")
                .length,
              pending: bookingsData.filter(
                (b) => b.status === "Pending" || b.status === "Accepted"
              ).length,
            };

            // Find recent booking safely
            const recentBooking =
              bookingsData.length > 0
                ? [...bookingsData].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  )[0]
                : null;

            return (
              <>
                {/* Stats Cards */}
                {cardsData.map((card, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper
                      sx={{
                        p: 3,
                        bgcolor: card.color,
                        color: "white",
                        borderRadius: 2,
                        boxShadow: 3,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "rgba(255, 255, 255, 0.2)",
                            width: 48,
                            height: 48,
                          }}
                        >
                          {card.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                            {card.title}
                          </Typography>
                          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            {
                              {
                                "Total Services": bookingStats.total,
                                "Completed Services": bookingStats.completed,
                                Ongoing: bookingStats.pending,
                              }[card.title]
                            }
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}

                {/* Recent Service Status */}
                <Grid item xs={8}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      {recentBooking
                        ? `Recent Service Status for Service  id ${recentBooking.id}`
                        : "Recent Service Status "}
                    </Typography>
                    {recentBooking ? (
                      <Stepper
                        activeStep={getActiveStep(recentBooking.status)}
                        alternativeLabel
                      >
                        {steps.map((label, index) => (
                          <Step key={label}>
                            <StepLabel>
                              {label}
                              {index === 0 && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  (Booking date- {recentBooking.createdAt})
                                </Typography>
                              )}
                              {index === 1 && recentBooking.professionalId && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  ( Professional Mapped Id:{" "}
                                  {recentBooking.professionalId})
                                </Typography>
                              )}
                            </StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    ) : (
                      <Typography variant="body1" color="text.secondary">
                        No recent services found
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              </>
            );
          }}
        </Await>
      </Suspense>
    </Grid>
  );
}

export default DashboardPage;
const getallBookingsLoader = async () => {
  const userid = localStorage.getItem("userid");
  const response = await fetch(`${URL}/booking/bookingbyuserid/` + userid);

  const respdata = await response.json();
  return respdata?.data?.booking;
};

export const bookingsLoader = async () => {
  return {
    bookings: getallBookingsLoader(),
  };
};
