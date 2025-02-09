import React, { Suspense, useState } from "react";
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
  Chip,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { MdCarCrash, MdCarRepair, MdCarRental } from "react-icons/md";
import { Await, useRouteLoaderData, Navigate, useNavigate } from "react-router";
import { adminaxiosInstance } from "../../axioshelpers/Adminaxioshelpers";

function AdminDefaultItems() {
  const { bookings } = useRouteLoaderData("admindefaultitems");
  const navigate = useNavigate();
  const [ongoingFilter, setOngoingFilter] = useState("all");
  const [completedFilter, setCompletedFilter] = useState("all");

  const cardsData = [
    {
      title: "Total Services Recevied",
      icon: <MdCarCrash size={24} />,
      color: "#D32F2F",
    },
    {
      title: "Total Ongoing Services",
      icon: <MdCarRepair size={24} />,
      color: "#1976D2",
    },
    {
      title: "Total Completed Services",
      icon: <MdCarRental size={24} />,
      color: "#2E7D32",
    },
  ];

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

            const ongoingBookings = bookingsData
              .filter((b) => b.status === "Pending" || b.status === "Accepted")
              .filter(
                (b) => ongoingFilter === "all" || b.status === ongoingFilter
              );

            const completedBookings = bookingsData
              .filter((b) => b.status === "Completed")
              .filter(
                (b) =>
                  completedFilter === "all" || b.payment === completedFilter
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
                                "Total Services Recevied": bookingStats.total,
                                "Total Ongoing Services": bookingStats.accepted,
                                "Total Completed Services":
                                  bookingStats.completed,
                              }[card.title]
                            }
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}

                <Grid container item xs={12} spacing={3}>
                  {/* Ongoing Bookings Table */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Ongoing Bookings
                        </Typography>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <Select
                            value={ongoingFilter}
                            onChange={(e) => setOngoingFilter(e.target.value)}
                            displayEmpty
                          >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Accepted">Accepted</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <TableContainer
                        sx={{
                          maxHeight: 400,
                          overflow: "auto",
                          scrollbarWidth: "thin",
                          scrollbarColor: "rgba(0,0,0,0.2) rgba(0,0,0,0.05)",
                        }}
                      >
                        <Table>
                          <TableHead sx={{ position: "sticky" }}>
                            <TableRow>
                              <TableCell>SI/No</TableCell>
                              <TableCell>Booking ID</TableCell>
                              <TableCell>Service ID</TableCell>
                              <TableCell>User ID</TableCell>
                              <TableCell>Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {ongoingBookings.map((booking, index) => (
                              <TableRow key={booking._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{booking.id}</TableCell>
                                <TableCell>{booking.serviceId}</TableCell>
                                <TableCell>{booking.userId}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={booking.status}
                                    color={
                                      booking.status === "Accepted"
                                        ? "success"
                                        : "warning"
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      {ongoingBookings.length === 0 && (
                        <Typography sx={{ p: 2 }}>
                          No ongoing bookings found
                        </Typography>
                      )}
                    </Paper>
                  </Grid>

                  {/* Completed Bookings Table */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Completed Bookings
                        </Typography>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <Select
                            value={completedFilter}
                            onChange={(e) => setCompletedFilter(e.target.value)}
                            displayEmpty
                          >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="Completed">Paid</MenuItem>
                            <MenuItem value="Pending">Unpaid</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <TableContainer
                        sx={{
                          maxHeight: 400,
                          overflow: "auto",
                          scrollbarWidth: "thin",
                          scrollbarColor: "rgba(0,0,0,0.2) rgba(0,0,0,0.05)",
                        }}
                      >
                        <Table>
                          <TableHead sx={{ position: "sticky" }}>
                            <TableRow>
                              <TableCell>SI/No</TableCell>
                              <TableCell>Booking ID</TableCell>
                              <TableCell>Service ID</TableCell>
                              <TableCell>User ID</TableCell>
                              <TableCell>Payment Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {completedBookings.map((booking, index) => (
                              <TableRow key={booking._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{booking.id}</TableCell>
                                <TableCell>{booking.serviceId}</TableCell>
                                <TableCell>{booking.userId}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={booking.payment}
                                    color={
                                      booking.payment === "Completed"
                                        ? "success"
                                        : "error"
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      {completedBookings.length === 0 && (
                        <Typography sx={{ p: 2 }}>
                          No completed bookings found
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </>
            );
          }}
        </Await>
      </Suspense>
    </Grid>
  );
}

export default AdminDefaultItems;

export const getallBookings = async () => {
  const response = await adminaxiosInstance.get("/allbookings");

  const respdata = response?.data;
  const bookings = respdata?.data?.Bookings;

  return bookings;
};

export const DashboardDefaultLoader = async () => {
  return {
    bookings: getallBookings(),
  };
};
