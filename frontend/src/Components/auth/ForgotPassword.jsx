import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Stack,
  Zoom,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Email } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = ({ open, onClose }) => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email.trim() || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      toast.error("🚫 Invalid email!", { position: "top-right", autoClose: 3000 });
      return;
    }

    setError("");

    try {
      await axios.post("http://localhost:8085/auth/reset-password-request", { email });
      toast.success("📩 Reset link sent to your email!", {
        position: "top-right",
        autoClose: 3000,
      });
      setEmail("");
      onClose();
    } catch (err) {
      toast.error("❌ Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleDialogClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    onClose();
  };

  return (
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
          color: theme.palette.text.primary,
        },
      }}
    >
      <DialogTitle sx={{ position: "relative", textAlign: "center", px: 3, pt: 2 }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
          Forgot Password
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Zoom in>
          <form onSubmit={handleReset} noValidate>
            <Stack spacing={2}>
              <Typography variant="body2" textAlign="center">
                Enter your email address below and we’ll send you a link to reset your password.
              </Typography>
              <TextField
                fullWidth
                autoFocus
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error}
                size="small"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  py: 1.4,
                  fontWeight: 600,
                  background: "linear-gradient(to right, #0d47a1, #1976d2)",
                  borderRadius: "24px",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(to right, #1565c0, #42a5f5)",
                  },
                }}
              >
                Send Reset Link
              </Button>
            </Stack>
          </form>
        </Zoom>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
