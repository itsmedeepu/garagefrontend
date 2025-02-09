import React, { Suspense, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Await,
  useRouteLoaderData,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { toast, Bounce } from "react-toastify";
const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const { services } = useRouteLoaderData("bookservicepage");
  const data = useActionData();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [map, setMap] = useState(null);
  const apikey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const navigate = useNavigation();
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 28.6139, // Default center (India)
    lng: 77.209,
  };
  //
  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });

    console.log(selectedLocation);
  };

  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData.statusCode === 201) {
        toast.success("Booking added sucessfully", {
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
      if (parsedData.statusCode === 401) {
        toast.error("unable to update profile", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          toastId: "profile atuthenication error",
        });
      }
      if (parsedData.statusCode === 404) {
        toast.warning("please fill all details", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          toastId: "profile not found",
        });
      }
      if (parsedData.statusCode === 500) {
        toast.error("something went bad at server", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          toastId: "profile-not-update",
        });
      }
    }
  }, [data]);

  return (
    <Suspense
      fallback={
        <CircularProgress
          color="primary"
          sx={{ display: "block", mx: "auto" }}
        />
      }
    >
      <Await resolve={services}>
        {(serv) => (
          <Form method="post">
            <Container maxWidth="sm">
              <Grid container>
                <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
                  <Typography
                    variant="h5"
                    component="h1"
                    gutterBottom
                    align="center"
                  >
                    Book a Service
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel>Select Service Type</InputLabel>
                      <Select
                        name="service_id"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        label="Select Service Type"
                        required
                      >
                        <MenuItem value="">
                          <em>Select one option</em>
                        </MenuItem>
                        {serv.map((service) => (
                          <MenuItem key={service.id} value={service.id}>
                            {service.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="date"
                        label="Select Date"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        format="YYYY-MM-DD"
                        slotProps={{
                          textField: { variant: "outlined", fullWidth: true },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Grid item xs={12}>
                      <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Select Location
                        </Typography>

                        <LoadScript
                          googleMapsApiKey={apikey}
                          onError={(err) =>
                            console.error("Google Maps error:", err)
                          }
                        >
                          <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={center}
                            zoom={10}
                            onClick={handleMapClick}
                            onLoad={(map) => setMap(map)}
                          >
                            {selectedLocation && (
                              <Marker
                                position={{
                                  lat: selectedLocation.lat,
                                  lng: selectedLocation.lng,
                                }}
                              />
                            )}
                          </GoogleMap>
                        </LoadScript>

                        {/* Hidden inputs for form submission */}
                        <input
                          type="hidden"
                          name="latitude"
                          value={selectedLocation?.lat || ""}
                          required
                        />
                        <input
                          type="hidden"
                          name="longitude"
                          value={selectedLocation?.lng || ""}
                          required
                        />
                      </Paper>
                    </Grid>
                  </Box>

                  <Box sx={{ textAlign: "center" }}>
                    <Button variant="contained" type="submit" color="primary">
                      {navigate.state === "submitting"
                        ? "Adding..."
                        : "Book now"}
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Container>
          </Form>
        )}
      </Await>
    </Suspense>
  );
};

export default BookingForm;
