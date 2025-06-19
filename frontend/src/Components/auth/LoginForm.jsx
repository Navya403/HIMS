import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  CircularProgress,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ open, onClose, onLoginSuccess, onRegisterClick }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [forgotOpen, setForgotOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const lastActiveTimeRef = useRef(Date.now());
  const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  useEffect(() => {
    const resetSessionTimer = () => {
      lastActiveTimeRef.current = Date.now();
      setSessionExpired(false);
    };

    window.addEventListener("mousemove", resetSessionTimer);
    window.addEventListener("keydown", resetSessionTimer);
    window.addEventListener("click", resetSessionTimer);

    const checkSessionTimeout = setInterval(() => {
      const currentTime = Date.now();
      const sessionDuration = currentTime - lastActiveTimeRef.current;

      if (sessionDuration > SESSION_TIMEOUT && !sessionExpired) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("loginTimestamp");

        toast.info("Your session has expired due to inactivity.", {
          position: "top-right",
          autoClose: 3000,
        });

        setSessionExpired(true);
      }
    }, 60 * 1000); // Check every minute

    return () => {
      window.removeEventListener("mousemove", resetSessionTimer);
      window.removeEventListener("keydown", resetSessionTimer);
      window.removeEventListener("click", resetSessionTimer);
      clearInterval(checkSessionTimeout);
    };
  }, [sessionExpired]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8085/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("loginTimestamp", Date.now().toString());

      toast.success(`Welcome, ${email}!`, {
        position: "top-right",
        autoClose: 2000,
      });

      setEmail("");
      setPassword("");
      setErrors({});

      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    setEmail("");
    setPassword("");
    setErrors({});
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            maxWidth: 420,
            width: "100%",
            p: 4,
            borderRadius: 3,
            boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <DialogTitle sx={{ position: "relative", textAlign: "center", px: 3, pt: 2 }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
            LOGIN
          </Typography>
          <IconButton
            onClick={handleDialogClose}
            size="small"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={1.5}>
              <Typography variant="body2" fontWeight={500}>
                Email
              </Typography>
              <TextField
                placeholder="Email Address"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                size="small"
                disabled={isLoading}
              />

              <Typography variant="body2" fontWeight={500}>
                Password
              </Typography>
              <TextField
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                size="small"
                disabled={isLoading}
              />

              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isLoading}
                sx={{
                  mt: 1,
                  py: 1,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  background: "linear-gradient(to right, #0d47a1, #1976d2)",
                  color: "#fff",
                  borderRadius: "20px",
                  "&:hover": {
                    background: "linear-gradient(to right, #1565c0, #42a5f5)",
                  },
                }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "LOGIN"}
              </Button>
            </Stack>
          </form>

          {!isLoading && (
            <>
              <Box textAlign="center" mt={2}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => setForgotOpen(true)}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <DialogActions sx={{ justifyContent: "center", pt: 0, pb: 2 }}>
                <Typography fontSize="0.85rem">
                  Don't have an account?{" "}
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      onRegisterClick();
                    }}
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                      textTransform: "none",
                      p: 0,
                      minWidth: 0,
                    }}
                  >
                    Register
                  </Button>
                </Typography>
              </DialogActions>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ForgotPassword open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </>
  );
};

export default LoginForm;
