import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  IconButton,
  InputAdornment,
  Fade,
} from '@mui/material';
import { Close as CloseIcon, Home as HomeIcon, LocationOn as LocationIcon, Phone as PhoneIcon, Email as EmailIcon, Person as PersonIcon } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuotePopup = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    propertyValue: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePropertyValueChange = (e) => {
    const value = e.target.value;
    // Allow empty value or numeric input
    if (value === '' || /^\d+$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        propertyValue: value
      }));
    }
  };

  const formatPropertyValue = (value) => {
    if (!value) return '';
    const numericValue = parseInt(value) * 100000; // Convert to actual rupees
    return new Intl.NumberFormat('en-IN').format(numericValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert property value to actual rupees before sending
      const submissionData = {
        ...formData,
        propertyValue: formData.propertyValue ? parseInt(formData.propertyValue) * 100000 : 0
      };

      // Make API call to submit the quote request
      await axios.post('http://localhost:8085/api/quotes', submissionData);
      
      // Show success toast
      toast.success('Quote request sent successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Close the popup
      onClose();
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error('Failed to send quote request. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
            maxHeight: '90vh',
          }
        }}
      >
        <Fade in={open}>
          <Paper elevation={0}>
            <Box sx={{ 
              position: 'relative',
              background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
              color: 'white',
              p: 3,
            }}>
              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogTitle sx={{ 
                color: 'white',
                p: 0,
                mb: 1,
              }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                  Get Your Free Quote
                </Typography>
              </DialogTitle>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Fill in your details to get a personalized insurance quote
              </Typography>
            </Box>

            <Box sx={{ overflowY: 'auto', maxHeight: 'calc(90vh - 200px)' }}>
              <DialogContent sx={{ p: 3 }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    margin="normal"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Property Type</InputLabel>
                    <Select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      required
                      startAdornment={
                        <InputAdornment position="start">
                          <HomeIcon color="action" />
                        </InputAdornment>
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    >
                      <MenuItem value="house">House</MenuItem>
                      <MenuItem value="apartment">Apartment</MenuItem>
                      <MenuItem value="condo">Condo</MenuItem>
                      <MenuItem value="townhouse">Townhouse</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Property Value (in lakhs)"
                    name="propertyValue"
                    type="text"
                    value={formData.propertyValue}
                    onChange={handlePropertyValueChange}
                    margin="normal"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          ₹
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography variant="body2" color="text.secondary">
                            {formData.propertyValue ? `(${formatPropertyValue(formData.propertyValue)} in total)` : ''}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    helperText="Enter value in lakhs (e.g., 10 for ₹10,00,000)"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    margin="normal"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  />
                </Box>
              </DialogContent>
              <DialogActions sx={{ 
                p: 3,
                borderTop: '1px solid rgba(0, 0, 0, 0.12)',
              }}>
                <Button 
                  onClick={onClose} 
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{
                    backgroundColor: '#1976d2',
                    borderRadius: '8px',
                    px: 3,
                    py: 1,
                    '&:hover': {
                      backgroundColor: '#1565c0',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Get Quote
                </Button>
              </DialogActions>
            </Box>
          </Paper>
        </Fade>
      </Dialog>
    </>
  );
};

export default QuotePopup; 