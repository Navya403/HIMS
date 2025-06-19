import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Grid,
  LinearProgress,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { AccountCircle, Email, Lock, Close, Info, Home } from "@mui/icons-material";

const RegisterForm = ({ open, onClose, onLoginClick }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    address: "",
    termsAccepted: false,
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    address: false,
  });

  const validate = () => {
    const errs = {};
    if (!formData.firstName) errs.firstName = "First name is required.";
    if (!/^[A-Za-z\s]+$/.test(formData.firstName) && formData.firstName) errs.firstName = "Letters only.";

    if (!formData.lastName) errs.lastName = "Last name is required.";
    if (!/^[A-Za-z\s]+$/.test(formData.lastName) && formData.lastName) errs.lastName = "Letters only.";

    if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email.";
    if (formData.password.length < 8) errs.password = "Minimum 8 characters.";
    if (!formData.role) errs.role = "Select a role.";
    if (!formData.address) errs.address = "Address is required.";
    if (!formData.termsAccepted) errs.terms = "You must accept the terms.";

    return errs;
  };

  const checkStrength = (password) => {
    if (password.length > 9) return "Strong";
    if (password.length > 5) return "Medium";
    return "Weak";
  };

  const strengthValue = {
    Weak: 30,
    Medium: 60,
    Strong: 100,
  };

  const strengthColor = {
    Weak: "#d32f2f",
    Medium: "#fbc02d",
    Strong: "#388e3c",
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if ((name === "firstName" || name === "lastName") && !/^[A-Za-z\s]*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      setPasswordStrength(checkStrength(value));
    }
  };

  const handleFocus = (field) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocused((prev) => ({ ...prev, [field]: false }));

    const validationErrors = {};

    if (field === "firstName") {
      if (!formData.firstName) validationErrors.firstName = "First name is required.";
      else if (!/^[A-Za-z\s]+$/.test(formData.firstName)) validationErrors.firstName = "Letters only.";
    }

    if (field === "lastName") {
      if (!formData.lastName) validationErrors.lastName = "Last name is required.";
      else if (!/^[A-Za-z\s]+$/.test(formData.lastName)) validationErrors.lastName = "Letters only.";
    }

    if (field === "email") {
      if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = "Invalid email.";
    }

    if (field === "password") {
      if (formData.password.length < 8) validationErrors.password = "Minimum 8 characters.";
    }

    if (field === "address") {
      if (!formData.address) validationErrors.address = "Address is required.";
    }

    setErrors((prev) => ({ ...prev, ...validationErrors }));
  };

  const getHelperText = (field) => {
    if (errors[field]) return errors[field];

    if (focused[field]) {
      switch (field) {
        case "firstName":
        case "lastName":
          return "Letters only";
        case "email":
          return "example@domain.com";
        case "password":
          return "8+ characters for better security";
        case "address":
          return "Street, City, ZIP";
        default:
          return "";
      }
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("http://localhost:8085/auth/register", formData);

      toast.success("Registration successful! You can now login", {
        position: "top-right",
        autoClose: 5000,
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        address: "",
        termsAccepted: false,
      });
      setPasswordStrength("");
      if (onClose) onClose();
      if (onLoginClick) onLoginClick();
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    if (onClose) onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      PaperProps={{
        sx: {
          maxWidth: 480,
          width: "100%",
          p: 2,
          borderRadius: 3,
          boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#0d47a1", pb: 2 }}>
        Create Account
        <IconButton onClick={onClose} size="small" sx={{ position: "absolute", right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit} noValidate>
          <Box display="flex" gap={1} sx={{ mt: 2 }}>
            <TextField
              fullWidth size="small" label="First Name" name="firstName"
              value={formData.firstName} onChange={handleChange}
              error={!!errors.firstName}
              helperText={getHelperText("firstName")}
              onFocus={() => handleFocus("firstName")}
              onBlur={() => handleBlur("firstName")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Letters only">
                      <Info fontSize="small" color="action" />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              disabled={isLoading}
              inputProps={{ pattern: "[A-Za-z\\s]+" }}
              placeholder="First Name"
            />
            <TextField
              fullWidth size="small" label="Last Name" name="lastName"
              value={formData.lastName} onChange={handleChange}
              error={!!errors.lastName}
              helperText={getHelperText("lastName")}
              onFocus={() => handleFocus("lastName")}
              onBlur={() => handleBlur("lastName")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Letters only">
                      <Info fontSize="small" color="action" />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              disabled={isLoading}
              inputProps={{ pattern: "[A-Za-z\\s]+" }}
              placeholder="Last Name"
            />
          </Box>

          <TextField
            fullWidth size="small" label="Email Address" name="email"
            margin="dense" value={formData.email} onChange={handleChange}
            error={!!errors.email}
            helperText={getHelperText("email")}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="example@domain.com">
                    <Info fontSize="small" color="action" />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            disabled={isLoading}
            placeholder="Email"
          />

          <TextField
            fullWidth size="small" label="Password" name="password"
            type="password" margin="dense"
            value={formData.password} onChange={handleChange}
            error={!!errors.password}
            helperText={getHelperText("password")}
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="8+ characters with letters, numbers and symbols recommended">
                    <Info fontSize="small" color="action" />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            disabled={isLoading}
            placeholder="••••••••"
          />

          {formData.password && (
            <Box sx={{ mt: 1, mb: 1 }}>
              <LinearProgress
                variant="determinate"
                value={strengthValue[passwordStrength]}
                sx={{
                  height: 6,
                  borderRadius: 10,
                  backgroundColor: "#ddd",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: strengthColor[passwordStrength],
                  },
                }}
              />
              <Typography
                sx={{ mt: 0.5, fontSize: "0.8rem", color: strengthColor[passwordStrength] }}
              >
                Strength: {passwordStrength}
              </Typography>
            </Box>
          )}

          <TextField
            fullWidth size="small" label="Address" name="address"
            margin="dense" value={formData.address} onChange={handleChange}
            error={!!errors.address}
            helperText={getHelperText("address")}
            onFocus={() => handleFocus("address")}
            onBlur={() => handleBlur("address")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home color="primary" />
                </InputAdornment>
              ),
            }}
            disabled={isLoading}
            placeholder="Address including street, city, and ZIP"
/>

          <FormControl component="fieldset" sx={{ mt: 2 }} error={!!errors.role}>
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup
              row
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <FormControlLabel value="user" control={<Radio />} label="User" disabled={isLoading} />
              <FormControlLabel value="admin" control={<Radio />} label="Admin" disabled={isLoading} />
            </RadioGroup>
            {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
          </FormControl>

          <FormControlLabel
            sx={{ mt: 1 }}
            control={
              <Checkbox
                checked={formData.termsAccepted}
                onChange={handleChange}
                name="termsAccepted"
                color="primary"
                disabled={isLoading}
              />
            }
            label={
              <Typography variant="body2">
                I accept the{" "}
                <Button
                  onClick={() => {}}
                  sx={{ p: 0, minWidth: 0, textTransform: "none" }}
                  color="primary"
                >
                  Terms & Conditions
                </Button>
              </Typography>
            }
          />
          {errors.terms && (
            <Typography color="error" variant="body2" sx={{ mb: 1 }}>
              {errors.terms}
            </Typography>
          )}

          <Button
            fullWidth type="submit" variant="contained"
            disabled={isLoading}
            sx={{
              mt: 2, py: 1, fontSize: "0.95rem", fontWeight: 600,
              background: "linear-gradient(to right, #0d47a1, #1976d2)",
              color: "#fff", borderRadius: "24px",
              "&:hover": {
                background: "linear-gradient(to right, #1565c0, #42a5f5)",
              },
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>

          <Grid container justifyContent="center" mt={2}>
            <Grid>
              <Typography variant="body2">
                Already have an account?{" "}
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    onLoginClick();
                  }}
                  sx={{
                    color: "primary.main",
                    fontWeight: "bold",
                    textTransform: "none",
                    p: 0,
                    minWidth: 0,
                  }}
                >
                  Login
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterForm;
