import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Grid,
  Paper,
  Divider,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import HomeIcon from "@mui/icons-material/Home";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import SampleFooter from "../auth/SampleFooter";

const propertyTypes = [
  "Apartment",
  "Detached House",
  "Semi-Detached",
  "Townhouse",
  "Condo",
  "Bungalow",
];

const MAX_LENGTH = 250;

const AddProperty = () => {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      type: "Apartment",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required. Please login again.");
        setIsSubmitting(false);
        return;
      }

      const propertyData = {
        address: data.address,
        city: data.city,
        zipcode: data.zip,
        propertySize: parseFloat(data.size),
        propertyValue: parseFloat(data.value),
        type: data.type,
        numberOfRooms: parseInt(data.rooms, 10),
        imageUrl: data.imageUrl,
        builtDate: data.builtDate,
      };

      const response = await axios.post(
        "http://localhost:8085/api/properties",
        propertyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Property added successfully!");
      reset({ type: "Apartment" });
    } catch (err) {
      let errorMessage = "Failed to add property";

      if (err.response) {
        errorMessage = `Server error: ${err.response.status}`;
        if (typeof err.response.data === "string") {
          errorMessage += ` - ${err.response.data}`;
        } else if (err.response.data?.message) {
          errorMessage += ` - ${err.response.data.message}`;
        }
      } else if (err.request) {
        errorMessage = "No response from server. Please check your network.";
      } else {
        errorMessage = `Error: ${err.message}`;
      }

      setServerError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box sx={{ px: 2, pt: 4, pb: 1, maxWidth: "800px", margin: "auto", mt: 6 }}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              p: 3,
              backgroundColor: theme.palette.primary.main,
              color: "white",
            }}
          >
            <HomeIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" fontWeight={700} mb={1}>
              Add Property Details
            </Typography>
            <Typography variant="body2">
              Fill in the form below to add your property
            </Typography>
          </Box>

          {serverError && (
            <Box
              sx={{
                p: 2,
                backgroundColor: theme.palette.error.light,
                color: theme.palette.error.contrastText,
              }}
            >
              <Typography variant="body2">{serverError}</Typography>
            </Box>
          )}

          <Box sx={{ p: { xs: 3, sm: 4 }, mt: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Location Information
              </Typography>
              <Grid container spacing={3} columns={12} mb={4}>
                <Grid item xs={12}>
                  <TextField
                    label="Property Address"
                    fullWidth
                    inputProps={{ maxLength: MAX_LENGTH }}
                    {...register("address", {
                      required: "Address is required",
                      maxLength: {
                        value: MAX_LENGTH,
                        message: `Address must be less than ${MAX_LENGTH} characters`,
                      },
                    })}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="City"
                    fullWidth
                    inputProps={{ maxLength: MAX_LENGTH }}
                    {...register("city", {
                      required: "City is required",
                      maxLength: {
                        value: MAX_LENGTH,
                        message: `City must be less than ${MAX_LENGTH} characters`,
                      },
                    })}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Zip Code"
                    fullWidth
                    inputProps={{ maxLength: MAX_LENGTH }}
                    {...register("zip", {
                      required: "Zip code is required",
                      maxLength: {
                        value: MAX_LENGTH,
                        message: `Zip code must be less than ${MAX_LENGTH} characters`,
                      },
                    })}
                    error={!!errors.zip}
                    helperText={errors.zip?.message}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight={600} mb={2}>
                Property Details
              </Typography>
              <Grid container spacing={3} columns={12} mb={4}>
                <Grid item xs={6}>
                  <TextField
                    select
                    label="Property Type"
                    fullWidth
                    defaultValue="Apartment"
                    {...register("type", { required: "Type is required" })}
                    error={!!errors.type}
                    helperText={errors.type?.message}
                  >
                    {propertyTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Property Size (sq ft)"
                    type="number"
                    fullWidth
                    inputProps={{ min: 0, step: 0.01 }}
                    {...register("size", { required: "Size is required", min: 0 })}
                    error={!!errors.size}
                    helperText={errors.size?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    label="Rooms"
                    type="number"
                    fullWidth
                    inputProps={{ min: 0, step: 1 }}
                    {...register("rooms", { required: "Rooms required", min: 0 })}
                    error={!!errors.rooms}
                    helperText={errors.rooms?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    label="Estimated Value (₹)"
                    type="number"
                    fullWidth
                    inputProps={{ min: 0, step: 1000 }}
                    {...register("value", { required: "Value is required", min: 0 })}
                    error={!!errors.value}
                    helperText={errors.value?.message}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    label="Date Built"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("builtDate", { required: "Date is required" })}
                    error={!!errors.builtDate}
                    helperText={errors.builtDate?.message}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight={600} mb={2}>
                Property Image (URL)
              </Typography>
              <Card variant="outlined" sx={{ mb: 4 }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                    gap: 2,
                  }}
                >
                  <FileUploadIcon
                    sx={{
                      fontSize: 40,
                      color: theme.palette.primary.main,
                    }}
                  />
                  <TextField
                    label="Image URL"
                    fullWidth
                    inputProps={{ maxLength: MAX_LENGTH }}
                    {...register("imageUrl", {
                      required: "Image URL is required",
                      maxLength: {
                        value: MAX_LENGTH,
                        message: `Image URL must be less than ${MAX_LENGTH} characters`,
                      },
                    })}
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl?.message}
                  />
                </CardContent>
              </Card>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Property"}
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>

      <SampleFooter />
    </>
  );
};

export default AddProperty; 

