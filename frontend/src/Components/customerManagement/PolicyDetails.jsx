import React from "react";
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
  CardMedia,
  AppBar,
  Toolbar,
  Menu,
  MenuItem
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
  backgroundColor: "#1976d2",
  color: "white",
  padding: "40px 0 60px",
  position: "relative",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  height: "100%",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  border: "1px solid rgba(25, 118, 210, 0.08)",
}));

const CheckItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,
}));

const InfoCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
  overflow: "hidden",
  height: "100%",
  border: "1px solid rgba(25, 118, 210, 0.08)",
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  padding: "10px 24px",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: "600",
  textTransform: "none",
  boxShadow: "0 4px 10px rgba(25, 118, 210, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 14px rgba(25, 118, 210, 0.3)",
  },
}));

const PolicyDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { policy, startDate, endDate } = location.state || {};
  const [productsAnchorEl, setProductsAnchorEl] = React.useState(null);
  const [claimsAnchorEl, setClaimsAnchorEl] = React.useState(null);
  const [supportAnchorEl, setSupportAnchorEl] = React.useState(null);

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

  console.log("Rendering PolicyDetails, navigate is:", navigate);

  return (
    <Box component="main" sx={{ minHeight: "100vh", backgroundColor: "#f5f9ff" }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <Toolbar sx={{ padding: '0 24px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <HomeIcon sx={{ mr: 1, fontSize: 28 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              Home Insurance
            </Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <NavLink onClick={handleProductsClick}>
              Products <KeyboardArrowDownIcon />
            </NavLink>
            <Menu
              anchorEl={productsAnchorEl}
              open={Boolean(productsAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Home Insurance</MenuItem>
              <MenuItem onClick={handleMenuClose}>Auto Insurance</MenuItem>
              <MenuItem onClick={handleMenuClose}>Life Insurance</MenuItem>
            </Menu>
            
            <NavLink onClick={handleClaimsClick}>
              Claims <KeyboardArrowDownIcon />
            </NavLink>
            <Menu
              anchorEl={claimsAnchorEl}
              open={Boolean(claimsAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>File a Claim</MenuItem>
              <MenuItem onClick={handleMenuClose}>Track Claim Status</MenuItem>
              <MenuItem onClick={handleMenuClose}>Claim Resources</MenuItem>
            </Menu>
            
            <NavLink>Property</NavLink>
            
            <NavLink>Renewals</NavLink>
            
            <NavLink onClick={handleSupportClick}>
              Support <KeyboardArrowDownIcon />
            </NavLink>
            <Menu
              anchorEl={supportAnchorEl}
              open={Boolean(supportAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Contact Us</MenuItem>
              <MenuItem onClick={handleMenuClose}>FAQs</MenuItem>
              <MenuItem onClick={handleMenuClose}>Resources</MenuItem>
            </Menu>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LightModeIcon sx={{ color: 'white', mx: 2 }} />
            <Button variant="contained" sx={{ 
              backgroundColor: 'white', 
              color: '#1976d2', 
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#e3f2fd',
              }
            }}>
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

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
              {policy.features.map((feature, index) => (
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

      <Container maxWidth="lg" sx={{ mt: -4, mb: 8, position: "relative", zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Premium Card */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <InfoCard>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{ mb: 3, fontWeight: "bold", color: "#0d47a1", display: "flex", alignItems: "center" }}
                  >
                    <PaymentIcon sx={{ mr: 1.5 }} />
                    Premium Details
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary">Annual Premium</Typography>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                      {formatIndianCurrency(policy.monthly_premium)}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Coverage Amount</Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0d47a1" }}>
                      {formatIndianCurrency(policy.coverage_amount)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Valid From</Typography>
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      {startDate} to {endDate}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary">Property Type</Typography>
                    <Typography variant="body1" sx={{ fontWeight: "medium", textTransform: "capitalize" }}>
                      {policy.property_type}
                    </Typography>
                  </Box>
                  
                  <ApplyButton
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 2, backgroundColor: "#1976d2" }}
                  >
                    Apply Now
                  </ApplyButton>
                </CardContent>
              </InfoCard>
            </motion.div>
          </Grid>
          
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
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
                            <ListItemText primary={benefit} />
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
                  transition={{ duration: 0.5, delay: 0.4 }}
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
              
              {/* Why Choose Us */}
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <StyledPaper sx={{ backgroundColor: "rgba(25, 118, 210, 0.05)" }}>
                    <Typography
                      variant="h5"
                      sx={{ mb: 3, fontWeight: "bold", color: "#0d47a1", display: "flex", alignItems: "center" }}
                    >
                      <SecurityIcon sx={{ mr: 1.5 }} />
                      Why Choose Our Insurance?
                    </Typography>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: "600", mb: 1 }}>
                            Trusted By Millions
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            With over 20 years of experience and 5 million satisfied customers, 
                            we are one of India's most trusted insurance providers.
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: "600", mb: 1 }}>
                            Quick Claim Settlement
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Our award-winning claim settlement process ensures you get your 
                            claims processed and settled without unnecessary delays.
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: "600", mb: 1 }}>
                            24/7 Customer Support
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Our dedicated customer service team is available round-the-clock 
                            to assist you with any queries or emergencies.
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: "600", mb: 1 }}>
                            Transparent Policies
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            We believe in complete transparency. Our policies are written in 
                            simple language with no hidden terms or conditions.
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </StyledPaper>
                </motion.div>
              </Grid>
              
              {/* FAQs */}
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <StyledPaper>
                    <Typography
                      variant="h5"
                      sx={{ mb: 3, fontWeight: "bold", color: "#0d47a1" }}
                    >
                      Frequently Asked Questions
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "600", mb: 1 }}>
                        How do I file a claim?
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        You can file a claim by logging into your account on our website or mobile app. 
                        Alternatively, you can call our 24/7 customer service helpline. Our team will 
                        guide you through the process and required documentation.
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "600", mb: 1 }}>
                        Can I modify my policy after purchase?
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Yes, you can make changes to your policy by contacting our customer service. 
                        Certain modifications might affect your premium, which our representatives 
                        will explain in detail.
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "600", mb: 1 }}>
                        How long does the claim settlement process take?
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Most straightforward claims are settled within 7 working days. Complex claims 
                        may take longer depending on the documentation and verification required.
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: "600", mb: 1 }}>
                        Are there any discounts available?
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Yes, we offer various discounts including multi-policy discounts, 
                        claim-free renewal benefits, and special offers for senior citizens. 
                        Contact our sales team to learn about current promotions.
                      </Typography>
                    </Box>
                  </StyledPaper>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        {/* CTA Section */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#0d47a1" }}>
            Ready to Secure Your Home?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: "700px", mx: "auto" }}>
            Get started with our comprehensive home insurance today and enjoy 
            peace of mind knowing your property is protected.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                backgroundColor: "#1976d2",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Apply Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderColor: "#1976d2",
                color: "#1976d2",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PolicyDetails;