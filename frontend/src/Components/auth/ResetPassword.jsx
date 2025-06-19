import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Zoom,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("🔐 Password must be at least 8 characters.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      await axios.post("http://localhost:8085/auth/reset-password", null, {
        params: {
          token,
          newPassword,
        },
      });

      toast.success("✅ Password reset successful!", { 
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/"); // Redirect to home
      }, 2000);
    } catch (err) {
      toast.error("❌ Token is invalid or expired!", { 
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #2193b0, #6dd5ed)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Dialog
        open={true}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxWidth: 420,
            width: "100%",
            p: 4,
            borderRadius: 3,
            boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle sx={{ position: "relative", textAlign: "center", px: 3, pt: 2 }}>
          <Typography variant="h6" sx={{ color: "#0d47a1", fontWeight: "bold" }}>
            Set New Password
          </Typography>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <Zoom in>
            <form onSubmit={handleReset}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                margin="normal"
                required
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
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
                Reset Password
              </Button>
            </form>
          </Zoom>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default ResetPassword;
