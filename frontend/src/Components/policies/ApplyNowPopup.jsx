import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Snackbar
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    padding: theme.spacing(1),
    maxWidth: "500px",
    width: "100%"
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  padding: "12px 28px",
  borderRadius: "8px",
  fontWeight: "600",
  textTransform: "none",
  boxShadow: "0 4px 14px rgba(25, 118, 210, 0.3)",
  transition: "all 0.3s ease",
  background: "linear-gradient(45deg, #1976d2 0%, #42a5f5 100%)",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 20px rgba(25, 118, 210, 0.4)",
    background: "linear-gradient(45deg, #1565c0 0%, #1976d2 100%)",
  },
}));

const DateInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "rgba(25, 118, 210, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(25, 118, 210, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
  "& .MuiInputAdornment-root": {
    color: "#1976d2",
  }
}));

const PropertySelect = styled(FormControl)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "rgba(25, 118, 210, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(25, 118, 210, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  }
}));

const ApplyNowPopup = ({ open, handleClose, policyId }) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [premium, setPremium] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [userId, setUserId] = useState(null); // Add state to track userId

  // Debug logging for user authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log("Auth debug - Token exists:", !!token);
    console.log("Auth debug - UserId:", userId);
    
    // Store userId in component state for later use
    if (userId) {
      setUserId(userId);
    }
  }, []);

  // Set premium based on policyId
  useEffect(() => {
    // Convert policyId to number to ensure proper comparison
    const policyIdNum = parseInt(policyId);
    console.log("PolicyId received:", policyIdNum);
    
    if (policyIdNum === 101) {
      setPremium(3500);
    } else if (policyIdNum === 102) {
      setPremium(6500);
    } else {
      // Default value for other policy IDs
      setPremium(0);
    }
  }, [policyId]);

  const showSnackbar = (message, severity = "info") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
    
    // Also show toast if available
    if (toast && typeof toast[severity] === 'function') {
      toast[severity](message);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Fetch user properties with improved error handling
  const fetchUserProperties = async () => {
    setIsLoading(true);
    setFetchError("");
    
    try {
      // First, verify authentication
      const token = localStorage.getItem("token");
      let storedUserId = localStorage.getItem("userId");
      
      if (!token) {
        throw new Error("Authentication required. Please login again.");
      }
      
      // Verify userId exists and has a proper value
      if (!storedUserId) {
        console.error("UserId missing from localStorage");
        // Try to extract userId from token if possible (example implementation)
        try {
          // This is a placeholder for actual token decoding
          // In a real app, you would decode the JWT token
          const parts = token.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            if (payload && payload.sub) {
              storedUserId = payload.sub;
              console.log("Extracted userId from token:", storedUserId);
              // Save it to localStorage for future use
              localStorage.setItem("userId", storedUserId);
              // Update the component state
              setUserId(storedUserId);
            }
          }
        } catch (tokenError) {
          console.error("Failed to extract userId from token:", tokenError);
        }
        
        // If still no userId, throw error
        if (!storedUserId) {
          throw new Error("User ID is missing. Please login again.");
        }
      }
      
      // Try various API endpoints to get properties
      let propertiesData = [];
      
      // First attempt - try to get user properties
      try {
        const response = await axios.get(`http://localhost:8085/api/properties/my`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data && Array.isArray(response.data)) {
          propertiesData = response.data;
          console.log("Properties fetched successfully:", propertiesData.length);
        }
      } catch (firstError) {
        console.log("First API attempt failed:", firstError);
        
        // Second attempt - try with specific userId
        try {
          const response = await axios.get(`http://localhost:8085/api/properties/user/${storedUserId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.data && Array.isArray(response.data)) {
            propertiesData = response.data;
            console.log("Properties fetched with userId:", propertiesData.length);
          }
        } catch (secondError) {
          console.log("Second API attempt failed:", secondError);
          
          // Final attempt - fetch properties one by one
          const mockProperties = [];
          for (let i = 1; i <= 10; i++) {
            try {
              const propertyResponse = await axios.get(`http://localhost:8085/api/properties/${i}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              
              // Check if this property belongs to current user
              if (propertyResponse.data) {
                // Different ways the API might return property ownership
                if (
                  (propertyResponse.data.user && propertyResponse.data.user.id == storedUserId) ||
                  (propertyResponse.data.userId == storedUserId)
                ) {
                  mockProperties.push(propertyResponse.data);
                }
              }
            } catch (singleError) {
              // Ignore errors for individual properties
            }
          }
          
          if (mockProperties.length > 0) {
            propertiesData = mockProperties;
            console.log("Properties fetched individually:", propertiesData.length);
          }
        }
      }
      
      // Process the fetched properties
      if (propertiesData.length === 0) {
        setFetchError("You don't have any properties. Please add a property first.");
      } else {
        setProperties(propertiesData);
        // Get the first property's ID as a string
        const firstPropertyId = propertiesData[0].id || 
                            propertiesData[0].propertyId || 
                            propertiesData[0].property_id;
        setSelectedProperty(String(firstPropertyId));
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      
      let errorMessage = error.message || "Failed to load properties";
      if (error.response) {
        errorMessage = `Server error (${error.response.status}): ${error.response.data?.message || error.response.data || "Unknown error"}`;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }
      
      setFetchError(errorMessage);
      showSnackbar(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchUserProperties();
    }
  }, [open]);

  const validateForm = () => {
    if (!selectedProperty) {
      setError("Please select a property");
      return false;
    }
    
    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for proper comparison
    
    if (start >= end) {
      setError("End date must be after start date");
      return false;
    }

    if (start < today) {
      setError("Start date cannot be in the past");
      return false;
    }

    // Check if premium is set correctly
    if (premium <= 0) {
      setError("Invalid premium amount for this policy");
      return false;
    }

    // Check if userId is available
    if (!userId) {
      setError("User ID is missing. Please login again.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    // Validate form first
    if (!validateForm()) {
      showSnackbar("Please fix the form errors before submitting", "error");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem("token");
      const storedUserId = userId || localStorage.getItem("userId");
      
      // Double check authentication
      if (!token) {
        throw new Error("Authentication required. Please login again.");
      }
      
      if (!storedUserId) {
        throw new Error("User ID is missing. Please login again.");
      }
      
      // Parse values - Make sure userId is included as both string and number formats
      const policyIdNum = parseInt(policyId);
      const propertyIdNum = parseInt(selectedProperty);
      const userIdNum = parseInt(storedUserId);
      
      console.log("Submitting with values:", {
        policyId: policyIdNum,
        propertyId: propertyIdNum,
        userId: userIdNum,
        userIdStr: storedUserId
      });
      
      // Determine policy type based on policyId
      let policyType = "";
      if (policyIdNum === 101) {
        policyType = "BASIC";
      } else if (policyIdNum === 102) {
        policyType = "PREMIUM";
      } else {
        policyType = "STANDARD"; // Default type
      }
      
      // Create a complete payload with all possible fields the API might expect
      const payload = {
        // Core fields with userId in multiple formats to ensure it's captured correctly
        propertyId: propertyIdNum,
        userId: userIdNum,
        user_id: userIdNum,           // Alternate format
        user: {                       // Nested user object format
          id: userIdNum,
          userId: userIdNum
        },
        startDate: startDate,
        endDate: endDate,
        premium: premium,
        type: policyType,
        
        // Additional fields that might be required
        policyId: policyIdNum,
        policyNumber: `POL-${policyIdNum}-${userIdNum}`, // Format policy number with userId
        coverageDetails: policyType === "BASIC" ? "Basic coverage for fire and theft" :
                       policyType === "PREMIUM" ? "Premium coverage including natural disasters and liability" :
                       "Standard coverage for common risks",
        exclusions: "Standard exclusions apply"
      };
      
      console.log("Sending payload:", payload);
      
      // Add a timeout to the request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      try {
        const response = await axios.post(
          "http://localhost:8085/api/policies/submit", 
          payload, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "X-User-ID": storedUserId // Also include userId in headers
            },
            signal: controller.signal
          }
        );
        
        clearTimeout(timeoutId);
        console.log("Response received:", response.data);
        
        // Show success message
        showSnackbar("Policy application submitted successfully!", "success");
        
        // Determine payment ID from response
        const paymentId = response.data?.paymentId || response.data?.id || "unknown";
        
        // Close dialog before navigation
        handleClose();
        
        // Use setTimeout to allow the dialog to close before navigation
        setTimeout(() => {
          // Redirect to payment page with all required details
          navigate("/payment", { 
            state: { 
              policyId: policyIdNum,
              policyNumber: `POL-${policyIdNum}-${userIdNum}`,
              propertyId: propertyIdNum,
              userId: userIdNum,           // Include userId in navigation state
              startDate: startDate,
              endDate: endDate,
              paymentId: paymentId,
              premium: premium
            } 
          });
        }, 300);
      } catch (timeoutError) {
        clearTimeout(timeoutId);
        if (timeoutError.name === 'AbortError') {
          throw new Error("Request timed out. Please try again.");
        }
        throw timeoutError;
      }
    } catch (error) {
      console.error("Application submission failed:", error);
      
      let errorMessage = error.message || "Failed to submit your application";
      if (error.response) {
        console.error("Error response:", error.response);
        errorMessage = `Error (${error.response.status}): ${error.response.data?.message || 
          (typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data))}`;
      } else if (error.request) {
        console.error("No response received:", error.request);
        errorMessage = "No response from server. The server may be down or your connection lost.";
      }
      
      setError(errorMessage);
      showSnackbar(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPropertyAddressById = (propertyId) => {
    if (!propertyId || !properties.length) return "Unknown property";
    
    const property = properties.find(p => {
      // Check all possible property ID field names
      const propId = p.id || p.propertyId || p.property_id;
      return propId == propertyId;
    });
    
    if (!property) return "Unknown property";
    
    return `${property.address || ""}${property.city ? `, ${property.city}` : ""}${property.zipcode ? ` ${property.zipcode}` : ""}`;
  };

  const handleAddProperty = () => {
    // Close this dialog and navigate to add property page
    handleClose();
    navigate("/add-property");
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <>
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="apply-now-dialog-title"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pt: 2 }}>
          <DialogTitle id="apply-now-dialog-title" sx={{ p: 0, fontWeight: "bold" }}>
            Apply for Home Insurance
          </DialogTitle>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <DialogContent sx={{ px: 3, pt: 2 }}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : fetchError ? (
            <Box>
              <Typography variant="body1" color="error" sx={{ my: 2 }}>
                {fetchError}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={fetchUserProperties}
                  startIcon={<HomeIcon />}
                >
                  Retry Loading Properties
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleAddProperty}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Add New Property
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
                Please select the property you want to insure and your preferred coverage period.
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "medium" }}>
                  Select Property
                </Typography>
                <PropertySelect fullWidth error={!!error && !selectedProperty}>
                  <InputLabel id="property-select-label">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <HomeIcon fontSize="small" sx={{ mr: 1 }} />
                      Your Property
                    </Box>
                  </InputLabel>
                  <Select
                    labelId="property-select-label"
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <HomeIcon fontSize="small" sx={{ mr: 1 }} />
                        Your Property
                      </Box>
                    }
                  >
                    {properties.map((property) => {
                      // Handle different property object structures
                      const propId = property.id || property.propertyId || property.property_id;
                      const address = property.address || "Unknown address";
                      const city = property.city || "";
                      const zipcode = property.zipcode || property.zip || "";
                      
                      return (
                        <MenuItem key={propId} value={propId.toString()}>
                          {address}
                          {city ? `, ${city}` : ""}
                          {zipcode ? ` ${zipcode}` : ""}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {!!error && !selectedProperty && (
                    <FormHelperText error>Please select a property</FormHelperText>
                  )}
                </PropertySelect>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "medium" }}>
                  Start Date
                </Typography>
                <DateInput
                  fullWidth
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  error={!!error && !startDate}
                  helperText={!!error && !startDate ? "Start date is required" : ""}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                        <CalendarTodayIcon fontSize="small" />
                      </Box>
                    ),
                  }}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "medium" }}>
                  End Date
                </Typography>
                <DateInput
                  fullWidth
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  error={!!error && !endDate}
                  helperText={!!error && !endDate ? "End date is required" : ""}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                        <CalendarTodayIcon fontSize="small" />
                      </Box>
                    ),
                  }}
                />
              </Box>
              
              {/* Premium information display */}
              <Box sx={{ mb: 3, p: 2, bgcolor: "rgba(25, 118, 210, 0.08)", borderRadius: "8px" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "medium", mb: 1 }}>
                  Policy Premium:
                </Typography>
                <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  {formatCurrency(premium)}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Policy Number: {policyId}
                </Typography>
                {userId && (
                  <Typography variant="caption" sx={{ display: 'block', color: "text.secondary" }}>
                    User ID: {userId}
                  </Typography>
                )}
              </Box>

              {selectedProperty && (
                <Box sx={{ mb: 3, p: 2, bgcolor: "rgba(25, 118, 210, 0.08)", borderRadius: "8px" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "medium", mb: 1 }}>
                    Selected Property:
                  </Typography>
                  <Typography variant="body2">
                    {getPropertyAddressById(selectedProperty)}
                  </Typography>
                </Box>
              )}
              
              {error && error !== "Please select a property" && error.indexOf("date") === -1 && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
            </>
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
          <Button 
            onClick={handleClose} 
            variant="outlined" 
            sx={{ 
              borderColor: "#1976d2", 
              color: "#1976d2",
              "&:hover": {
                borderColor: "#0d47a1",
                backgroundColor: "rgba(25, 118, 210, 0.04)"
              }
            }}
          >
            Cancel
          </Button>
          <GradientButton 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={isSubmitting || isLoading || !!fetchError}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Proceed to Payment"
            )}
          </GradientButton>
        </DialogActions>
      </StyledDialog>
      
      {/* Global notification system */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ApplyNowPopup;

