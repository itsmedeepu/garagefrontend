import {
  CircularProgress,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Alert,
  Box,
} from "@mui/material";
import React, { Suspense, useMemo, useState } from "react";
import {
  Await,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { ChangeStatusAction } from "../../pages/professionalpages/ChangeStatusPage";

function ChangeStatus() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { bookings, services, users } = useRouteLoaderData("changestatus");
  const navigate = useNavigate();

  const handleMarkAsCompleted = async (bookingId) => {
    setLoading(true);
    const change = await ChangeStatusAction(bookingId);

    navigate("/professional/dashboard");
    setLoading(false);

    // Your existing API call logic here
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Suspense
        fallback={
          <CircularProgress
            sx={{ display: "block", mx: "auto" }}
            color="primary"
          />
        }
      >
        <Await resolve={Promise.all([bookings, services, users])}>
          {([bookingsData, servicesData, usersData]) => {
            const booking = bookingsData.find((b) => b.id === id);
            if (!booking) {
              return (
                <Typography variant="h6" color="error">
                  Booking not found
                </Typography>
              );
            }

            const user = usersData?.find((u) => u.id === booking?.userId);
            const service = servicesData.find(
              (s) => s.id === booking.serviceId
            );

            // const bookingDetails = {
            //   id: id,
            //   name: user.name,
            //   email: user.email,
            //   phone: user.phone || "Not provided",
            //   serviceName: service.name,
            //   serviceDate: booking.service_date,
            //   location: {
            //     lat: parseFloat(booking.latitude),
            //     lng: parseFloat(booking.longitude),
            //   },
            // };

            return (
              <Card variant="outlined" sx={{ mt: 3 }}>
                <CardHeader
                  title="Change Booking Status"
                  titleTypographyProps={{ variant: "h6", component: "h2" }}
                  sx={{ bgcolor: "primary.main", color: "white" }}
                />
                <CardContent>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Booking ID" secondary={id} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Service Name"
                        secondary={service?.name || "N/A"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Coustamer Name"
                        secondary={user?.name || "N/A"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Phone"
                        secondary={user?.phone || "N/A"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Email"
                        secondary={user?.email || "N/A"}
                      />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleMarkAsCompleted(booking.id)}
                  >
                    {loading ? "Marking..." : "Mark as Completed"}
                  </Button>
                </CardActions>
              </Card>
            );
          }}
        </Await>
      </Suspense>
    </Container>
  );
}

export default ChangeStatus;
