import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Stack
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SecurityIcon from "@mui/icons-material/Security";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PaymentIcon from "@mui/icons-material/Payment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShieldIcon from "@mui/icons-material/Shield";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarIcon from "@mui/icons-material/Star";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HealingIcon from "@mui/icons-material/Healing";
import GavelIcon from "@mui/icons-material/Gavel";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SearchIcon from "@mui/icons-material/Search";
import ArticleIcon from "@mui/icons-material/Article";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import VerifiedIcon from '@mui/icons-material/Verified';
import DescriptionIcon from "@mui/icons-material/Description";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import Avatar from '@mui/material/Avatar';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BusinessIcon from '@mui/icons-material/Business';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';





// Import the ApplyNowPopup component
import ApplyNowPopup from "./ApplyNowPopup"; // Adjust the path if needed

// These would typically come from your backend in a real application
const policyBenefits = {
  101: [
    "24/7 customer support for emergencies",
    "Quick claim settlement within 7 working days",
    "No hidden charges or fees",
    "Comprehensive coverage for structural damage",
    "Protection against fire, theft, and natural calamities",
    "Coverage for personal belongings up to specified limits",
    "Water damage protection",
    "Optional add-ons available for customization"
  ],
  102: [
    "Premium 24/7 customer support with dedicated agent",
    "Express claim settlement within 3 working days",
    "No hidden charges or fees",
    "Enhanced coverage for structural damage",
    "Protection against fire, theft, and natural calamities",
    "Extended coverage for personal belongings",
    "Water and flood damage protection",
    "Appliance breakdown coverage",
    "Home repair service network",
    "Free annual home inspection",
    "Multiple premium add-ons included at no extra cost"
  ]
};

const policyExclusions = {
  101: [
    "Damage due to war or nuclear hazards",
    "Intentional damage by the policyholder",
    "General wear and tear",
    "Damage from pests or insects",
    "Certain natural disasters without additional coverage"
  ],
  102: [
    "Damage due to war or nuclear hazards",
    "Intentional damage by the policyholder",
    "Certain high-value items without declaration",
    "Pre-existing damages"
  ]
};

const testimonials = [
  {
    name: "Anasiya B.",
    comment: "The claims process was incredibly smooth. My water damage claim was settled within 5 days!",
    rating: 5
  },
  {
    name: "Priya M.",
    comment: "Excellent customer service. They helped me customize my policy to fit my exact needs.",
    rating: 4
  },
  {
    name: "Naren K",
    comment: "Best home insurance I've had. The premium is reasonable for the coverage provided.",
    rating: 5
  }
];

const NavLink = styled(Typography)(({ theme }) => ({
  margin: '0 16px',
  cursor: 'pointer',
  position: 'relative',
  color: '#fff',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    color: '#e3f2fd',
  }
}));

const PolicyHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
  color: "white",
  padding: "50px 0 70px",
  position: "relative",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "28px",
  height: "100%",
  borderRadius: "12px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
  border: "1px solid rgba(25, 118, 210, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(25, 118, 210, 0.1)",
  }
}));

const GradientPaper = styled(Paper)(({ theme }) => ({
  padding: "28px",
  height: "100%",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
  boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
  border: "1px solid rgba(25, 118, 210, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(25, 118, 210, 0.1)",
  }
}));

const HighlightCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  overflow: "hidden",
  height: "100%",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  },
  border: "1px solid rgba(25, 118, 210, 0.15)",
}));

const CheckItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,
}));

const InfoCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  overflow: "hidden",
  height: "100%",
  border: "1px solid rgba(25, 118, 210, 0.15)",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "6px",
    background: "linear-gradient(90deg, #42a5f5 0%, #1976d2 100%)",
  }
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  padding: "20px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  border: "1px solid rgba(25, 118, 210, 0.08)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  }
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  padding: "12px 28px",
  borderRadius: "8px",
  fontSize: "1.1rem",
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

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)",
  marginBottom: "16px",
  color: "#0d47a1",
}));

const PolicyDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { policy, startDate, endDate } = location.state || {};
  const [productsAnchorEl, setProductsAnchorEl] = useState(null);
  const [claimsAnchorEl, setClaimsAnchorEl] = useState(null);
  const [supportAnchorEl, setSupportAnchorEl] = useState(null);
  const [isApplyNowOpen, setIsApplyNowOpen] = useState(false);

  const handleProductsClick = (event) => {
    setProductsAnchorEl(event.currentTarget);
  };

  const handleClaimsClick = (event) => {
    setClaimsAnchorEl(event.currentTarget);
  };

  const handleSupportClick = (event) => {
    setSupportAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setProductsAnchorEl(null);
    setClaimsAnchorEl(null);
    setSupportAnchorEl(null);
  };

  const handleOpenApplyNow = () => {
    setIsApplyNowOpen(true);
  };

  const handleCloseApplyNow = () => {
    setIsApplyNowOpen(false);
  };

  // Navigate to policies page
  const handleBackToPolicies = () => {
    navigate("/policies");
  };

  // In a real application, you would fetch this data if it's not available in location state
  if (!policy) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 5, textAlign: "center" }}>
          Policy not found. Please go back to the policies page.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleBackToPolicies}
          >
            Back to Policies
          </Button>
        </Box>
      </Container>
    );
  }

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <StarIcon key={i} sx={{ color: i < rating ? '#FFD700' : '#e0e0e0', fontSize: 20 }} />
    ));
  };

  return (
    <Box component="main" sx={{ minHeight: "100vh", backgroundColor: "#f7fafd" ,pt:8}}>
        <PolicyHeader>
        <Container maxWidth="lg">
          {/* Fixed button with explicit handler */}
          <Button
            variant="text"
            color="inherit"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToPolicies}
            sx={{ mb: 3, color: 'rgba(255,255,255,0.9)' }}
          >
            Back to Plans
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <ShieldIcon sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {policy.name}
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mb: 3, maxWidth: "800px", opacity: 0.9 }}>
              {policy.description}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {policy.features && policy.features.map((feature, index) => (
                <Chip
                  key={index}
                  label={feature}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: "500",
                  }}
                />
              ))}
            </Box>
          </motion.div>
        </Container>
      </PolicyHeader>

      <Container maxWidth="lg" sx={{ mt: -5, mb: 8, position: "relative", zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Premium Details Card with Rating/Why Choose Us to its right */}
          <Grid item xs={12}>
            <Grid container spacing={4}>
              {/* Premium Details Card */}
              <Grid item xs={12} md={5}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <InfoCard sx={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(25, 118, 210, 0.1)",
                    background: "linear-gradient(145deg, #ffffff 0%, #f5f9ff 100%)",
                    border: "1px solid rgba(25, 118, 210, 0.1)",
                    height: "100%",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 15px 35px rgba(25, 118, 210, 0.15)"
                    }
                  }}>
                    <Box sx={{
                      position: "absolute",
                      right: 0,
                      top: 10,
                      opacity: 0.05,
                      zIndex: 0,
                      overflow: "hidden",
                      height: "90%"
                    }}>
                      <HomeIcon sx={{ fontSize: 220, color: "#1976d2" }} />
                    </Box>

                    <CardContent sx={{
                      p: 4,
                      position: "relative",
                      zIndex: 1
                    }}>
                      <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 4,
                        pb: 2,
                        borderBottom: "2px solid rgba(25, 118, 210, 0.1)"
                      }}>
                        <Avatar sx={{
                          bgcolor: "#1976d2",
                          width: 48,
                          height: 48,
                          mr: 2,
                          boxShadow: "0 4px 8px rgba(25, 118, 210, 0.25)"
                        }}>
                          <PaymentIcon />
                        </Avatar>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: "800", color: "#0d47a1" }}
                        >
                          Premium Details
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 4 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                          Annual Premium
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                          {formatIndianCurrency(policy.monthly_premium)}
                        </Typography>

                      </Box>

                      <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{
                            p: 2,
                            bgcolor: "rgba(25, 118, 210, 0.05)",
                            borderRadius: 2,
                            height: "100%"
                          }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                              Coverage Amount
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0d47a1" }}>
                              {formatIndianCurrency(policy.coverage_amount)}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Box sx={{
                            p: 2,
                            bgcolor: "rgba(25, 118, 210, 0.05)",
                            borderRadius: 2,
                            height: "100%"
                          }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                              Valid Period
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: "medium", color: "#0d47a1" }}>
                              {startDate} to {endDate}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box sx={{
                        mb: 4,
                        p: 2,
                        bgcolor: "rgba(25, 118, 210, 0.05)",
                        borderRadius: 2
                      }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                          Property Type
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: "medium", color: "#0d47a1", textTransform: "capitalize", display: "flex", alignItems: "center" }}>
                          <BusinessIcon sx={{ mr: 1, fontSize: 18 }} />
                          {policy.property_type}
                        </Typography>
                      </Box>

                      <ApplyButton
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                          mt: 2,
                          py: 1.5,
                          fontWeight: "bold",
                          fontSize: "1rem",
                          boxShadow: "0 4px 10px rgba(25, 118, 210, 0.3)",
                          "&:hover": {
                            boxShadow: "0 6px 15px rgba(25, 118, 210, 0.4)"
                          }
                        }}
                        onClick={handleOpenApplyNow}
                      >
                        Apply Now
                      </ApplyButton>

                     
                    </CardContent>
                  </InfoCard>
                </motion.div>
              </Grid>

              {/* Customer Rating and Why Choose Us (to the right of Premium) */}
              <Grid item xs={12} md={7}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Grid container spacing={3}>
                    {/* Customer Rating Card */}
                    <Grid item xs={12} md={6}>
                      <Card sx={{
                        borderRadius: "16px",
                        height: "100%",
                        background: "linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)",
                        overflow: "visible",
                        position: "relative",
                        boxShadow: "0 10px 20px rgba(25, 118, 210, 0.1)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 15px 30px rgba(25, 118, 210, 0.15)"
                        }
                      }}>
                        <Box sx={{
                          position: "absolute",
                          top: -20,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#1976d2",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                        }}>
                          <StarIcon sx={{ color: "#fff" }} />
                        </Box>
                        <CardContent sx={{ pt: 4.5, px: 3, pb: 3.5, textAlign: "center" }}>
                          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2.5, color: "#0d47a1" }}>
                            Customer Rating
                          </Typography>

                          <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 2.5,
                            position: "relative"
                          }}>
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} sx={{ color: '#FFD700', fontSize: 32 }} />
                            ))}
                          </Box>

                          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0d47a1", mb: 1 }}>
                            4.9 out of 5
                          </Typography>

                          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                            Based on 2,500+ verified reviews
                          </Typography>

                          <Box sx={{ mt: 3 }}>

                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Why Choose Us Card */}
                    <Grid item xs={12} md={6}>
                      <Card sx={{
                        borderRadius: "16px",
                        height: "100%",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                        }
                      }}>
                        <CardContent sx={{ p: 3.5 }}>
                          <Typography variant="h6" sx={{
                            fontWeight: "bold",
                            color: "#0d47a1",
                            mb: 3,
                            pb: 1.5,
                            borderBottom: "2px solid rgba(25, 118, 210, 0.1)",
                            display: "flex",
                            alignItems: "center"
                          }}>
                            <ThumbUpIcon sx={{ mr: 1.5, color: "#1976d2" }} />
                            Why Choose Us
                          </Typography>

                          <List sx={{ p: 0 }}>
                            <ListItem sx={{ px: 0, py: 1.2 }}>
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <Avatar sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", width: 32, height: 32 }}>
                                  <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 18 }} />
                                </Avatar>
                              </ListItemIcon>
                              <ListItemText
                                primary="97% claim settlement ratio"
                                primaryTypographyProps={{ fontWeight: "medium" }}
                              />
                            </ListItem>

                            <ListItem sx={{ px: 0, py: 1.2 }}>
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <Avatar sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", width: 32, height: 32 }}>
                                  <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 18 }} />
                                </Avatar>
                              </ListItemIcon>
                              <ListItemText
                                primary="25+ years of trusted service"
                                primaryTypographyProps={{ fontWeight: "medium" }}
                              />
                            </ListItem>

                            <ListItem sx={{ px: 0, py: 1.2 }}>
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <Avatar sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", width: 32, height: 32 }}>
                                  <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 18 }} />
                                </Avatar>
                              </ListItemIcon>
                              <ListItemText
                                primary="5000+ service centers"
                                primaryTypographyProps={{ fontWeight: "medium" }}
                              />
                            </ListItem>

                            <ListItem sx={{ px: 0, py: 1.2 }}>
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <Avatar sx={{ bgcolor: "rgba(76, 175, 80, 0.1)", width: 32, height: 32 }}>
                                  <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 18 }} />
                                </Avatar>
                              </ListItemIcon>
                              <ListItemText
                                primary="Award-winning customer support"
                                primaryTypographyProps={{ fontWeight: "medium" }}
                              />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>

          {/* Middle column - Main Content */}
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              {/* Key Features Section */}
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{
                      fontWeight: "800",
                      color: "#0d47a1",
                      mb: 1,
                      position: "relative",
                      display: "inline-block",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -8,
                        left: 0,
                        width: "60px",
                        height: "4px",
                        backgroundColor: "#1976d2",
                        borderRadius: "2px"
                      }
                    }}>
                      Key Features
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Discover why our home insurance stands out from the rest
                    </Typography>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    gap: 3,
                    justifyContent: 'space-between'
                  }}>
                    <HighlightCard sx={{
                      flex: 1,
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
                      },
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <CardContent sx={{
                        p: 3,
                        textAlign: "center",
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1
                      }}>
                        <FeatureIcon>
                          <VerifiedUserIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                        </FeatureIcon>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1.5, color: "#0d47a1" }}>
                          Comprehensive Coverage
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Protection for your home against all major risks and perils
                        </Typography>
                      </CardContent>
                    </HighlightCard>

                    <HighlightCard sx={{
                      flex: 1,
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
                      },
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <CardContent sx={{
                        p: 3,
                        textAlign: "center",
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1
                      }}>
                        <FeatureIcon>
                          <PaymentIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                        </FeatureIcon>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1.5, color: "#0d47a1" }}>
                          Fast Claims
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                          Hassle-free claims process with quick settlements and immediate assistance when you need it most
                        </Typography>
                      </CardContent>
                    </HighlightCard>

                    <HighlightCard sx={{
                      flex: 1,
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
                      },
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <CardContent sx={{
                        p: 3,
                        textAlign: "center",
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1
                      }}>
                        <FeatureIcon>
                          <SupportAgentIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                        </FeatureIcon>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1.5, color: "#0d47a1" }}>
                          24/7 Support
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Round-the-clock assistance for all your insurance needs
                        </Typography>
                      </CardContent>
                    </HighlightCard>
                  </Box>
                </motion.div>
              </Grid>

              {/* Policy Benefits */}
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <StyledPaper>
                    <Typography
                      variant="h5"
                      sx={{ mb: 3, fontWeight: "bold", color: "#0d47a1", display: "flex", alignItems: "center" }}
                    >
                      <CheckCircleIcon sx={{ mr: 1.5 }} />
                      Policy Benefits
                    </Typography>

                    <Grid container spacing={2}>
                      {policyBenefits[policy.policy_id].map((benefit, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <CheckItem>
                            <ListItemIcon sx={{ minWidth: "36px" }}>
                              <CheckCircleIcon sx={{ color: "#4caf50" }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={benefit}
                              primaryTypographyProps={{ fontWeight: index % 3 === 0 ? 'medium' : 'normal' }}
                            />
                          </CheckItem>
                        </Grid>
                      ))}
                    </Grid>
                  </StyledPaper>
                </motion.div>
              </Grid>


              {/* What's Not Covered */}
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <StyledPaper>
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, fontWeight: "bold", color: "#d32f2f" }}
                    >
                      What's Not Covered
                    </Typography>

                    <Grid container spacing={2}>
                      {policyExclusions[policy.policy_id].map((exclusion, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <ListItem sx={{ pl: 0 }}>
                            <ListItemText
                              primary={exclusion}
                              primaryTypographyProps={{ color: "text.secondary" }}
                            />
                          </ListItem>
                        </Grid>
                      ))}
                    </Grid>
                  </StyledPaper>
                </motion.div>
              </Grid>

             {/* Home Insurance Information Component */}
<Grid item xs={12} sx={{ width: '100%', mb: 4 }}>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    style={{ width: '100%' }}
  >
    <StyledPaper sx={{ width: '100%', maxWidth: '100%', p: 4, borderRadius: 2 }}>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={6} sx={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: '100%', borderLeft: '4px solid #1976d2', borderRadius: 2 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#1976d2", mb: 1, display: 'flex', alignItems: 'center' }}>
                <ArticleIcon sx={{ mr: 1 }} />
                Policy Number
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                HO-{policy.policy_id}-{new Date().getFullYear()}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#1976d2", mb: 1, display: 'flex', alignItems: 'center' }}>
                <CalendarTodayIcon sx={{ mr: 1 }} />
                Coverage Period
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                1 Year (Renewable)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Next renewal date: {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#1976d2", mb: 1, display: 'flex', alignItems: 'center' }}>
                <VerifiedIcon sx={{ mr: 1 }} />
                Policy Status
              </Typography>
              <Chip label="Active" size="small" color="primary" />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: '100%', borderLeft: '4px solid #9c27b0', borderRadius: 2 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#9c27b0", mb: 1, display: 'flex', alignItems: 'center' }}>
                <SupportAgentIcon sx={{ mr: 1 }} />
                Customer Support
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                24/7 Dedicated Assistance
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <PhoneIcon sx={{ fontSize: 'small', mr: 0.5, verticalAlign: 'text-bottom' }} />
                +1-800-HOME-INS
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                <EmailIcon sx={{ fontSize: 'small', mr: 0.5, verticalAlign: 'text-bottom' }} />
                support@homeinsurance.com
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#9c27b0", mb: 1, display: 'flex', alignItems: 'center' }}>
                <DescriptionIcon sx={{ mr: 1 }} />
                Claims Process
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                Simple 3-Step Process
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <LooksOneIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Document the damage" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <LooksTwoIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Submit claim with documentation" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <Looks3Icon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Assessment and resolution" />
                </ListItem>
              </List>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: '100%', borderLeft: '4px solid #2e7d32', borderRadius: 2 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#2e7d32", mb: 1, display: 'flex', alignItems: 'center' }}>
                <GavelIcon sx={{ mr: 1 }} />
                Cancellation Policy
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                30-day free look period with full refund
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Pro-rated refund available after free look period
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#2e7d32", mb: 1, display: 'flex', alignItems: 'center' }}>
                <HomeWorkIcon sx={{ mr: 1 }} />
                Coverage Areas
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                Nationwide coverage
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                All 50 states and territories
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#2e7d32", mb: 1, display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ mr: 1 }} />
                Policy Benefits
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <Chip size="small" label="Dwelling Coverage" color="success" variant="outlined" />
                <Chip size="small" label="Personal Property" color="success" variant="outlined" />
              </Stack>
              <Stack direction="row" spacing={1}>
                <Chip size="small" label="Liability Protection" color="success" variant="outlined" />
                <Chip size="small" label="Additional Living Expenses" color="success" variant="outlined" />
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="body2">
            Have questions about your home insurance policy? Our support team is available 24/7 to assist you.
          </Typography>
        </Box>
      </Box>
    </StyledPaper>
  </motion.div>
</Grid>
{/* Call to Action Section */}
<Grid item xs={12} sx={{ width: '100%', mb: 4 }}>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    style={{ width: '100%' }}
  >
    <StyledPaper
      sx={{
        width: '100%',
        maxWidth: '100%',
        backgroundColor: "#e3f2fd",
        borderColor: "#bbdefb",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: { xs: "center", sm: "flex-start" },
        p: 4,
        borderRadius: 2
      }}
    >
      <Box sx={{ mb: { xs: 2, sm: 0 }, flex: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0d47a1", mb: 1 }}>
          Ready to secure your home?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Get protected with our comprehensive home insurance today.
        </Typography>
      </Box>
      
      <Box sx={{ ml: { sm: 4 } }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1976d2",
            fontWeight: "medium",
            px: 3,
            py: 1,
            '&:hover': {
              bgcolor: "#0d47a1"
            }
          }}
          onClick={handleOpenApplyNow}
        >
          Apply Now
        </Button>
      </Box>
    </StyledPaper>
  </motion.div>
</Grid>
</Grid>
</Grid>
</Grid>
</Container>
<ApplyNowPopup
  open={isApplyNowOpen}
  handleClose={handleCloseApplyNow}
  policyId={policy.policy_id}
/>
</Box>
);
};

export default PolicyDetails;