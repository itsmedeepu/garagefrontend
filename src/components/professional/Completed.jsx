import { useState, useMemo, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Await, useRouteLoaderData } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
  Typography,
} from "@mui/material";
import { ArrowBack, Description, PictureAsPdf } from "@mui/icons-material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Completed() {
  const { users, services, bookings } = useRouteLoaderData("completed");

  return (
    <Box sx={{ p: 3 }}>
      <Suspense fallback={<LinearProgress />}>
        <Await
          resolve={Promise.all([bookings, services, users])}
          errorElement={<div>Could not load bookings</div>}
        >
          {([bookingdata, servicesdata, usersdata]) => (
            <CompletedContent
              data={{
                bookingsdata: bookingdata,
                servicesdata: servicesdata,
                usersdata: usersdata,
              }}
            />
          )}
        </Await>
      </Suspense>
    </Box>
  );
}

function CompletedContent({ data }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const bookings = data.bookingsdata.filter(
    (booking) => booking.status === "Completed"
  );
  const services = data.servicesdata || [];
  const users = data.usersdata || [];

  const paymentStyles = {
    Pending: { color: "#d32f2f", backgroundColor: "#fde0e0" },
    Completed: { color: "#2e7d32", backgroundColor: "#edf7ed" },
  };
  const processedBookings = useMemo(() => {
    return bookings.map((booking) => {
      const service = services.find((s) => s.id === booking.serviceId);
      const user = users.find((u) => u.id === booking.userId);
      return {
        ...booking,
        serviceName: service?.name || "N/A",
        userName: user?.name || "N/A",
        userEmail: user?.email || "N/A",
      };
    });
  }, [bookings, services, users]);

  const filteredBookings = useMemo(() => {
    if (!searchTerm) return processedBookings;
    const lowerSearch = searchTerm.toLowerCase();
    return processedBookings.filter(
      (booking) =>
        booking.id?.toLowerCase().includes(lowerSearch) ||
        booking.serviceName?.toLowerCase().includes(lowerSearch) ||
        booking.userName?.toLowerCase().includes(lowerSearch) ||
        booking.userEmail?.toLowerCase().includes(lowerSearch) ||
        booking.payment?.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, processedBookings]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        label="Search"
        placeholder="Search bookings..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SI/No</TableCell>
              <TableCell>Booking ID</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.length === 0 && (
              <Typography>No bookings Found</Typography>
            )}
            {filteredBookings.map((booking, index) => (
              <TableRow key={booking.id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{booking.id || "N/A"}</TableCell>
                <TableCell>{booking.serviceName}</TableCell>
                <TableCell>{booking.userName}</TableCell>
                <TableCell>{booking.userEmail}</TableCell>
                <TableCell>
                  <Chip
                    label={booking.payment}
                    sx={paymentStyles[booking.payment]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Completed;
