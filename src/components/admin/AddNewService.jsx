import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  FormControl,
} from "@mui/material";
import { Form, useNavigation } from "react-router";

function AddNewService() {
  const navigate = useNavigation();
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mx: "auto" }}>
        Add New Service
      </Typography>

      <Form method="post">
        <Stack spacing={3}>
          <TextField
            required
            id="service-name"
            label="Service Name"
            name="name"
            fullWidth
            variant="outlined"
          />

          <TextField
            required
            id="price"
            label="Price"
            name="price"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            fullWidth
            variant="outlined"
          />

          <TextField
            id="description"
            label="Description"
            multiline
            name="description"
            rows={4}
            fullWidth
            variant="outlined"
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" color="secondary" type="reset">
              Reset
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {navigate.state === "submitting" ? "Adding.." : "Add Service"}
            </Button>
          </Stack>
        </Stack>
      </Form>
    </Box>
  );
}

export default AddNewService;
