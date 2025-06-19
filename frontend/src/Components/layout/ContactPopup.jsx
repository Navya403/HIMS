import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const ContactPopup = ({ open, onClose }) => {
  const theme = useTheme();
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!firstName) newErrors.firstName = "First Name is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    else if (!phoneRegex.test(phoneNumber)) newErrors.phoneNumber = "Invalid phone number";
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    if (!subject) newErrors.subject = "Subject is required";
    if (!message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Your message has been sent successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setFirstName("");
      setPhoneNumber("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({});
    } catch (err) {
      toast.error("Failed to send your message. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    setFirstName("");
    setPhoneNumber("");
    setEmail("");
    setSubject("");
    setMessage("");
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      PaperProps={{
        sx: {
          maxWidth: 500,
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
          CONTACT US
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
          <Stack spacing={2}>
            {/* First Name */}
            <Box>
              <Typography variant="body2" fontWeight={500}>
                First Name
              </Typography>
              <TextField
                placeholder="Your First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName}
                size="small"
              />
            </Box>

            {/* Phone Number */}
            <Box>
              <Typography variant="body2" fontWeight={500}>
                Phone Number
              </Typography>
              <TextField
                placeholder="Phone Number"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                size="small"
              />
            </Box>

            {/* Email */}
            <Box>
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
                size="small"
              />
            </Box>

            {/* Subject */}
            <Box>
              <Typography variant="body2" fontWeight={500}>
                Subject
              </Typography>
              <TextField
                placeholder="Subject"
                variant="outlined"
                fullWidth
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                error={!!errors.subject}
                helperText={errors.subject}
                size="small"
              />
            </Box>

            {/* Message */}
            <Box>
              <Typography variant="body2" fontWeight={500}>
                Message
              </Typography>
              <TextField
                placeholder="Your Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                error={!!errors.message}
                helperText={errors.message}
                size="small"
              />
            </Box>

            {/* Submit */}
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
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "SEND MESSAGE"}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;
