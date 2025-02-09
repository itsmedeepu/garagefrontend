import React, { Suspense, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  Await,
  Form,
  useActionData,
  useNavigation,
  useRouteLoaderData,
} from "react-router";

import { toast, Bounce } from "react-toastify";
import { CircularProgress } from "@mui/material";

function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();
  const data = useActionData();
  const { admindata } = useRouteLoaderData("adminprofile");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData.statusCode === 201) {
        toast.success("Profile updated successfully", {
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
        setIsEditing(false);
      }
      if (parsedData.statusCode === 401) {
        toast.warning("All feilds are required", {
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
        setIsEditing(false);
      }
      if (parsedData.statusCode === 404) {
        toast.warning("no user foound", {
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
          toastId: "profile-update-success",
        });
      }
    }
  }, [navigation.state, data]);
  return (
    <Container maxWidth="sm">
      <Grid container>
        <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Profile
          </Typography>
          <Suspense
            fallback={
              <CircularProgress
                color="primary"
                sx={{ display: "block", mx: "auto" }}
              />
            }
          >
            <Await resolve={admindata}>
              {(admin) => {
                return (
                  <Form method="POST">
                    <Box noValidate>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        variant="outlined"
                        disabled={!isEditing}
                        defaultValue={admin.name}
                      />

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        type="email"
                        variant="outlined"
                        disabled={!isEditing}
                        defaultValue={admin.email}
                      />

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        autoComplete="tel"
                        type="text"
                        variant="outlined"
                        disabled={!isEditing}
                        defaultValue={admin.phone}
                      />

                      <Box
                        mt={3}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {isEditing ? (
                          <ButtonGroup>
                            <Button variant="outlined" onClick={handleCancel}>
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                            >
                              {navigation.state === "submitting"
                                ? "Updating..."
                                : "Update"}
                            </Button>
                          </ButtonGroup>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEdit}
                          >
                            Edit
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Form>
                );
              }}
            </Await>
          </Suspense>
        </Paper>
      </Grid>
    </Container>
  );
}

export default AdminProfile;
