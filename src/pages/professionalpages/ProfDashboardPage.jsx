import React, { Suspense } from "react";
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
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MdCarCrash, MdCarRepair, MdCarRental } from "react-icons/md";
import { Await, useRouteLoaderData, Navigate, useNavigate } from "react-router";
const URL = import.meta.env.VITE_API_URL;
function ProfDashboardPage() {
  const { bookings } = useRouteLoaderData("profdashboard");
  const navigate = useNavigate();

  // Define the possible steps in correct order
  const steps = ["Accepted", "Completed"];

  const cardsData = [
    {
      title: "Total Services",
      icon: <MdCarCrash size={24} />,
      color: "#D32F2F",
    },
    {
      title: "Ongoing Services",
      icon: <MdCarRepair size={24} />,
      color: "#1976D2",
    },
    {
      title: "Completed Services",
      icon: <MdCarRental size={24} />,
      color: "#2E7D32",
    },
  ];

  // Function to determine active step based on status
  const getActiveStep = (status) => {
    switch (status) {
      case "Accepted":
        return 0;
      case "Completed":
        return 1;
      default:
        return 0;
    }
  };

  const handleStatusChange = (booking) => {
    navigate(`/garage/professional/dashboard/markstatus/${booking.id}`);
  };
  return (
    <Grid container spacing={3}>
      <Suspense
        fallback={<CircularProgress sx={{ display: "block", mx: "auto" }} />}
      >
        <Await resolve={bookings}>
          {(bookingsData) => {
            const bookingStats = {
              total: bookingsData.length,
              accepted: bookingsData.filter((b) => b.status === "Accepted")
                .length,
              completed: bookingsData.filter((b) => b.status === "Completed")
                .length,
              pendingPayments: bookingsData.filter(
                (b) => b.payment === "Pending"
              ).length,
            };

            const acceptedBookingData = bookingsData.filter(
              (b) => b.status === "Accepted"
            );
            const pendingPaymentsData = bookingsData.filter(
              (b) => b.payment === "Pending"
            );

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
                                "Ongoing Services": bookingStats.accepted,
                                "Completed Services": bookingStats.completed,
                              }[card.title]
                            }
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}

                <Grid item xs={6} md={6}>
                  {" "}
                  {/* Adjusted grid sizing */}
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      boxShadow: 4,
                      maxHeight: 450,
                      overflowY: "auto",
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                      Ongoing Bookings ({acceptedBookingData.length})
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
                      {acceptedBookingData.map((booking) => (
                        <Box key={booking.id} sx={{ mb: 3 }}>
                          <Typography variant="h6" gutterBottom>
                            Service #{booking.id}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Stepper
                              activeStep={getActiveStep(booking.status)}
                              alternativeLabel
                              sx={{ flexGrow: 1 }}
                            >
                              {steps.map((label, index) => (
                                <Step key={label}>
                                  <StepLabel>
                                    {label}
                                    {index === 0 && (
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        color="text.secondary"
                                      >
                                        Accepted on:{" "}
                                        {new Date(
                                          booking.updatedAt
                                        ).toLocaleDateString()}
                                      </Typography>
                                    )}
                                    {index === 1 && booking.completedAt && (
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        color="text.secondary"
                                      >
                                        Completed on:{" "}
                                        {new Date(
                                          booking.completedAt
                                        ).toLocaleDateString()}
                                      </Typography>
                                    )}
                                  </StepLabel>
                                </Step>
                              ))}
                            </Stepper>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => handleStatusChange(booking)}
                            >
                              Change Status
                            </Button>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      boxShadow: 4,
                      maxHeight: 450,
                      overflowY: "auto",
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                      Pending Payments ({pendingPaymentsData.length})
                    </Typography>

                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <strong>Service ID</strong>
                            </TableCell>
                            <TableCell align="center">
                              <strong>Pending Payment</strong>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {bookingsData.map((booking) => (
                            <TableRow key={booking.id}>
                              <TableCell>Service #{booking.id}</TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  color:
                                    booking.payment === "Pending"
                                      ? "red"
                                      : "green",
                                  fontWeight: "bold",
                                }}
                              >
                                {booking.payment === "Pending" ? "Yes" : "No"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
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

export default ProfDashboardPage;

// Loader functions remain the same
export const getallBookingsLoader = async () => {
  const profid = localStorage.getItem("professinalid");
  const accesstoken = localStorage.getItem("accesstoken");
  const response = await fetch(`${URL}/booking/bookingbyproid/` + profid, {
    method: "get",
    headers: {
      Authorization: "Bearer " + accesstoken,
    },
  });

  const respdata = await response.json();
  return respdata?.data?.booking;
};

export const bookingsLoaderProf = async () => {
  return {
    bookings: getallBookingsLoader(),
  };
};
