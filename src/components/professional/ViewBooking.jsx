import { Suspense, useState, useMemo, useEffect } from "react";
import {
  Await,
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useParams,
  useRouteLoaderData,
  useSubmit,
} from "react-router";
import {
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  FormControlLabel,
  Box,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { toast, Bounce } from "react-toastify";
import { BookingAcceptAction } from "../../pages/professionalpages/ViewBookingPage";
import GoogleMapReact from "google-map-react";
const containerStyle = {
  width: "100%",
  height: "400px",
};

function ViewBooking() {
  const params = useParams();
  const bookingid = params.id;
  const apikey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const { services, users, bookings } = useRouteLoaderData("profviewbookings");

  const handleClick = async () => {
    setLoading(true);
    const book = await BookingAcceptAction(bookingid);
    setLoading(false);
    navigate("/garage/professional/dashboard/allbookings");
  };
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <Paper elevation={3} sx={{ p: 4, m: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Booking Details
      </Typography>

      <Suspense fallback={<LinearProgress />}>
        <Await resolve={Promise.all([bookings, services, users])}>
          {([bookingsData, servicesData, usersData]) => {
            const booking = bookingsData.find((b) => b.id === bookingid);
            if (!booking) {
              return (
                <Typography variant="h6" color="error">
                  Booking not found
                </Typography>
              );
            }

            const user = usersData.find((u) => u.id === booking.userId);
            console.log(user);
            const service = servicesData.find(
              (s) => s.id === booking.serviceId
            );

            if (!user || !service) {
              return (
                <Typography variant="h6" color="error">
                  Associated user or service not found
                </Typography>
              );
            }

            const bookingDetails = {
              id: bookingid,
              name: user.name,
              email: user.email,
              phone: user.phone || "Not provided",
              serviceName: service.name,
              serviceDate: booking.service_date,
              location: {
                lat: parseFloat(booking.latitude),
                lng: parseFloat(booking.longitude),
              },
            };

            return (
              <Grid container spacing={3}>
                {/* Customer Information */}
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Booking ID"
                        secondary={bookingDetails.id}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Customer Name"
                        secondary={bookingDetails.name}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Email"
                        secondary={bookingDetails.email}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Phone"
                        secondary={bookingDetails.phone}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <input
                  type="hidden"
                  name="bookingid"
                  value={bookingDetails.id}
                />

                {/* Service Informatio n */}
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Service Name"
                        secondary={bookingDetails.serviceName}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Service Date"
                        secondary={new Date(
                          bookingDetails.serviceDate
                        ).toLocaleDateString()}
                      />
                    </ListItem>
                  </List>
                </Grid>

                {/* Map Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Service Location
                  </Typography>

                  <LoadScript
                    googleMapsApiKey={apikey} // Replace with your actual API key
                  >
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={bookingDetails.location}
                      zoom={15}
                    >
                      <Marker position={bookingDetails.location} />
                    </GoogleMap>
                  </LoadScript>
                </Grid>

                {/* Acceptance Section */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Button
                      type="submit"
                      onClick={handleClick}
                      variant="contained"
                      color="primary"
                      sx={{ px: 4 }}
                    >
                      {loading ? "Accepting Booking..." : "Accept booking"}{" "}
                    </Button>

                    <Button
                      variant="contained"
                      color="success"
                      sx={{ px: 4 }}
                      onClick={() =>
                        navigate("/garage/professional/dashboard/allbookings")
                      }
                    >
                      Go back
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            );
          }}
        </Await>
      </Suspense>
    </Paper>
  );
}

export default ViewBooking;
