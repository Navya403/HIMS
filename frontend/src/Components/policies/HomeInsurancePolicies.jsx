import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Box,
  Container,
  Chip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import ShieldIcon from "@mui/icons-material/Shield";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SecurityIcon from "@mui/icons-material/Security";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

// Sample data
const policies = [
  {
    policy_id: 101,
    name: "Standard Home Coverage",
    description: "Comprehensive protection for your home against fire, theft, natural disasters, and more....",
    coverage_amount: 1000000,
    monthly_premium: 3500,
    duration_months: 12,
    property_type: "house",
    features: ["Fire Protection", "Theft Coverage", "Water Damage"],
    color: "#1976d2"
  },
  {
    policy_id: 102,
    name: "Premium Home Shield",
    description: "Enhanced protection with additional benefits like appliance coverage and premium customer support.",
    coverage_amount: 2500000,
    monthly_premium: 6200,
    duration_months: 12,
    property_type: "house",
    features: ["All Standard Features", "Appliance Coverage", "Premium Support", "Flood Coverage"],
    color: "#7e57c2"
  }
];

const StyledCard = styled(Card)(({ color }) => ({
  borderRadius: "16px",
  backgroundColor: "#ffffff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  overflow: "hidden",
  position: "relative",
  height: "100%",
  minHeight: "620px",
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease",
  border: "1px solid rgba(0, 0, 0, 0.04)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "8px",
    backgroundColor: color || "#1976d2",
  }
}));

const FeatureChip = styled(Chip)(({ color }) => ({
  backgroundColor: `${color}15` || "rgba(25, 118, 210, 0.08)",
  color: color || "#1976d2",
  margin: "0 4px 8px 0",
  fontWeight: 500,
  borderRadius: "8px",
  height: "32px",
}));

const PriceBadge = styled(Box)(({ color }) => ({
  position: "absolute",
  top: "20px",
  right: "20px",
  backgroundColor: color || "#1976d2",
  color: "white",
  padding: "8px 16px",
  borderRadius: "30px",
  fontWeight: "bold",
  fontSize: "1rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  zIndex: 1,
}));

const HomeInsurancePolicies = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedStartDate = today.toISOString().split('T')[0];
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    const formattedEndDate = nextYear.toISOString().split('T')[0];
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
  }, []);

  const handleViewDetails = (policyId) => {
    navigate(`/policies/${policyId}`, {
      state: {
        policy: policies.find(p => p.policy_id === policyId),
        startDate,
        endDate
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{
        background: 'linear-gradient(135deg, #f5f9ff 0%, #eef7fe 100%)',
        flexGrow: 1,
        pt: 12, // 🔺 Increased padding from 8 to 12 to move content down
        pb: 10
      }}>
        <Container maxWidth="lg">
          <Box
            sx={{ mb: 8, textAlign: "center" }}
            component={motion.div}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: "#0d47a1",
                fontWeight: 800,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
              }}
            >
              <SecurityIcon sx={{ fontSize: 40, mr: 1.5, color: '#1976d2' }} />
              Home Insurance Plans
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "#546e7a",
                maxWidth: "700px",
                mx: "auto",
                mb: 4,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Protect what matters most with our comprehensive home insurance solutions,
              tailored to provide the security and peace of mind you deserve.
            </Typography>

            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
              mb: 2
            }}>
              {["24/7 Customer Support", "Hassle-free Claims", "Customizable Coverage"].map((label, i) => (
                <Chip
                  key={i}
                  icon={<CheckCircleOutlineIcon />}
                  label={label}
                  sx={{
                    bgcolor: '#e3f2fd',
                    color: '#1976d2',
                    borderRadius: '50px',
                    px: 1
                  }}
                />
              ))}
            </Box>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {policies.map((policy) => (
              <Grid item xs={12} md={6} key={policy.policy_id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ width: '100%', maxWidth: '500px' }}
                >
                  <StyledCard color={policy.color}>
                    <PriceBadge color={policy.color}>
                      ₹{policy.monthly_premium.toLocaleString()}/year
                    </PriceBadge>

                    <CardContent sx={{ p: 4, flexGrow: 1, pt: 5 }}>
                      <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 3,
                        mt: 3,
                        maxWidth: "70%"
                      }}>
                        {policy.policy_id === 101
                          ? <ShieldIcon sx={{ color: policy.color, mr: 1.5, fontSize: 28 }} />
                          : <AccountBalanceIcon sx={{ color: policy.color, mr: 1.5, fontSize: 28 }} />}
                        <Typography variant="h5" sx={{ color: policy.color, fontWeight: 700, lineHeight: 1.2 }}>
                          {policy.name}
                        </Typography>
                      </Box>

                      <Typography variant="body1" sx={{ mb: 4, color: "#546e7a", lineHeight: 1.6 }}>
                        {policy.description}
                      </Typography>

                      <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle2" sx={{ color: policy.color, mb: 2, fontWeight: 600 }}>
                          Key Features:
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                          {policy.features.map((feature, idx) => (
                            <FeatureChip
                              key={idx}
                              label={feature}
                              color={policy.color}
                              icon={<CheckCircleOutlineIcon style={{ fontSize: 16 }} />}
                              size="small"
                            />
                          ))}
                        </Box>
                      </Box>

                      <Box sx={{
                        borderRadius: '12px',
                        backgroundColor: '#f8fafd',
                        p: 2.5,
                        mb: 3
                      }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                          <Typography variant="body2" sx={{ color: "#546e7a", fontWeight: 500 }}>Coverage Amount:</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: policy.color }}>
                            ₹{policy.coverage_amount.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                          <Typography variant="body2" sx={{ color: "#546e7a", fontWeight: 500 }}>Duration:</Typography>
                          <Typography variant="body1" sx={{ color: "#0d47a1", fontWeight: 600 }}>
                            {policy.duration_months} months
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="body2" sx={{ color: "#546e7a", fontWeight: 500 }}>Valid Period:</Typography>
                          <Typography variant="body1" sx={{ color: "#0d47a1", fontWeight: 600 }}>
                            {formatDate(startDate)} - {formatDate(endDate)}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ p: 4, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: policy.color,
                          color: "white",
                          fontWeight: 600,
                          borderRadius: "12px",
                          py: 1.5,
                          fontSize: "1rem",
                          boxShadow: `0 4px 14px ${policy.color}40`,
                          '&:hover': {
                            backgroundColor: policy.color,
                            opacity: 0.9,
                            boxShadow: `0 6px 20px ${policy.color}60`,
                          }
                        }}
                        onClick={() => handleViewDetails(policy.policy_id)}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomeInsurancePolicies;
