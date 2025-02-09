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
import { Await, useNavigate, useRouteLoaderData } from "react-router";

function ViewBookings() {
  const { bookings, services } = useRouteLoaderData("profbookings");
  const [statusFilter, setStatusFilter] = useState("all");

  const navigate = useNavigate();

  // Handler for view details
  const handleViewDetails = (bookingId) => {
    // Add your view details logic here

    return navigate(`/professional/dashboard/viewbooking/${bookingId}`);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Booked Services
            </Typography>
            <Suspense>
              <Await resolve={services}>
                {(service) => {
                  return (
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      size="small"
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="all">All Statuses</MenuItem>
                      {service.map((each) => {
                        return (
                          <MenuItem key={each.id} value={each.id}>
                            {each.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  );
                }}
              </Await>
            </Suspense>
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
                    : booking.serviceId === statusFilter
                );

                return (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>SI No</TableCell>
                          <TableCell>Booking ID</TableCell>
                          <TableCell>Booking Date</TableCell>
                          <TableCell>Service Name</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredBookings.map((booking, index) => (
                          <TableRow key={booking.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{booking.id}</TableCell>
                            <TableCell>{booking.service_date}</TableCell>
                            <TableCell>
                              {services.find(
                                (service) => service.id === booking.serviceId
                              )?.name || ""}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={() => handleViewDetails(booking.id)}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredBookings.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} sx={{ textAlign: "center" }}>
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

export default ViewBookings;
