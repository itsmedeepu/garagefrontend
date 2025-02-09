import React, { Suspense, useState, useEffect, useMemo } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  Chip,
} from "@mui/material";
import { Await, useRouteLoaderData } from "react-router";
import { loadServices } from "../../pages/userpages/BookservicePage";

function BookedServices() {
  const { bookings, services } = useRouteLoaderData("viewbookings");

  const [statusFilter, setStatusFilter] = useState("all");

  // Status styling configurations
  const statusStyles = {
    Pending: { color: "#d32f2f", backgroundColor: "#fde0e0" },
    Accepted: { color: "#ed6c02", backgroundColor: "#fff4e5" },
    Completed: { color: "#2e7d32", backgroundColor: "#edf7ed" },
  };

  const paymentStyles = {
    Pending: { color: "#d32f2f", backgroundColor: "#fde0e0" },
    Completed: { color: "#2e7d32", backgroundColor: "#edf7ed" },
  };

  // Handler for payment (to be implemented)
  const handlePayment = (bookingId) => {
    alert("this feature soon..");

    // Add payment integration logic here
  };

  console.log(services);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Booked Services
            </Typography>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Accepted">Accepted</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </Box>

          <Suspense
            fallback={
              <CircularProgress sx={{ display: "block", mx: "auto" }} />
            }
          >
            <Await
              resolve={useMemo(() => Promise.all([bookings, services]), [])}
            >
              {([bookingsData, services]) => {
                const filteredBookings = bookingsData.filter((booking) =>
                  statusFilter === "all"
                    ? true
                    : booking.status === statusFilter
                );

                return (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>SI No</TableCell>
                          <TableCell>Service Name</TableCell>
                          <TableCell>Service Date</TableCell>
                          <TableCell>Professional ID</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Payment Status</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredBookings.map((booking, index) => (
                          <TableRow key={booking.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              {services.find(
                                (service) => service.id === booking.serviceId
                              )?.name || ""}
                            </TableCell>
                            <TableCell>{booking.service_date}</TableCell>
                            <TableCell>
                              {booking.professionalId || "Not Assigned"}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={booking.status}
                                sx={statusStyles[booking.status]}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={booking.payment}
                                sx={paymentStyles[booking.payment]}
                              />
                            </TableCell>
                            <TableCell>
                              {(["Pending", "Accepted"].includes(
                                booking.status || booking.payment === "pending"
                              ) ||
                                booking.payment === "Pending") && (
                                <Button
                                  variant="contained"
                                  size="small"
                                  color="primary"
                                  onClick={() => handlePayment(booking.id)}
                                  disabled={booking.payment === "Completed"}
                                >
                                  Pay ₹{/* Add price field here */}
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredBookings.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                              No bookings found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                );
              }}
            </Await>
          </Suspense>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default BookedServices;
