// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Typography,
//   Grid,
//   Box,
//   Container,
//   Chip,
//   AppBar,
//   Toolbar,
//   Menu,
//   MenuItem
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { motion } from "framer-motion";
// import HomeIcon from "@mui/icons-material/Home";
// import ShieldIcon from "@mui/icons-material/Shield";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import LightModeIcon from "@mui/icons-material/LightMode";

// // Sample data - in a real application, this would come from your API
// const policies = [
//   {
//     policy_id: 101,
//     name: "Standard Home Coverage",
//     description: "Comprehensive protection for your home against fire, theft, natural disasters, and more....",
//     coverage_amount: 1000000,
//     monthly_premium: 3500,
//     duration_months: 12,
//     property_type: "house",
//     features: ["Fire Protection", "Theft Coverage", "Water Damage"],
//     image: "/api/placeholder/600/400"
//   },
//   {
//     policy_id: 102,
//     name: "Premium Home Shield",
//     description: "Enhanced protection with additional benefits like appliance coverage and premium customer support.",
//     coverage_amount: 2500000,
//     monthly_premium: 6200,
//     duration_months: 12,
//     property_type: "house",
//     features: ["All Standard Features", "Appliance Coverage", "Premium Support", "Flood Coverage"],
//     image: "https://unsplash.com/photos/white-and-brown-concrete-building-under-blue-sky-during-daytime-_TPTXZd9mOo"
//   }
// ];

// const NavLink = styled(Typography)(({ theme }) => ({
//   margin: '0 16px',
//   cursor: 'pointer',
//   position: 'relative',
//   color: '#fff',
//   fontWeight: 500,
//   display: 'flex',
//   alignItems: 'center',
//   '&:hover': {
//     color: '#e3f2fd',
//   }
// }));

// const StyledCard = styled(Card)(({ theme }) => ({
//   borderRadius: "12px",
//   backgroundColor: "#ffffff",
//   boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//   overflow: "hidden",
//   position: "relative",
//   height: "100%",
//   minHeight: "580px", // Fixed height for all cards
//   width: "100%", // Fixed width for all cards
//   maxWidth: "500px", // Maximum width constraint
//   margin: "0 auto", // Center the card
//   display: "flex",
//   flexDirection: "column",
//   transition: "all 0.3s ease",
//   border: "1px solid rgba(25, 118, 210, 0.08)",
// }));

// const FeatureChip = styled(Chip)(({ theme }) => ({
//   backgroundColor: "rgba(25, 118, 210, 0.08)",
//   color: "#1976d2",
//   margin: "0 4px 4px 0",
//   fontWeight: 500,
// }));

// const PriceBadge = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   top: "16px",
//   right: "16px",
//   backgroundColor: "#1976d2",
//   color: "white",
//   padding: "6px 12px",
//   borderRadius: "20px",
//   fontWeight: "bold",
//   fontSize: "0.9rem",
//   boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
// }));

// const HomeInsurancePolicies = () => {
//   const navigate = useNavigate();
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [productsAnchorEl, setProductsAnchorEl] = useState(null);
//   const [claimsAnchorEl, setClaimsAnchorEl] = useState(null);
//   const [supportAnchorEl, setSupportAnchorEl] = useState(null);

//   const handleProductsClick = (event) => {
//     setProductsAnchorEl(event.currentTarget);
//   };

//   const handleClaimsClick = (event) => {
//     setClaimsAnchorEl(event.currentTarget);
//   };

//   const handleSupportClick = (event) => {
//     setSupportAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setProductsAnchorEl(null);
//     setClaimsAnchorEl(null);
//     setSupportAnchorEl(null);
//   };

//   useEffect(() => {
//     // Calculate the start date (today)
//     const today = new Date();
//     const formattedStartDate = today.toISOString().split('T')[0];
    
//     // Calculate end date (1 year from today)
//     const nextYear = new Date();
//     nextYear.setFullYear(today.getFullYear() + 1);
//     const formattedEndDate = nextYear.toISOString().split('T')[0];
    
//     setStartDate(formattedStartDate);
//     setEndDate(formattedEndDate);
//   }, []);

//   const handleViewDetails = (policyId) => {
//     navigate(`/policies/${policyId}`, { 
//       state: { 
//         policy: policies.find(p => p.policy_id === policyId),
//         startDate,
//         endDate
//       } 
//     });
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       {/* Header */}
//       <AppBar position="static" sx={{ backgroundColor: '#1976d2', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
//         <Toolbar sx={{ padding: '0 24px' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
//             <HomeIcon sx={{ mr: 1, fontSize: 28 }} />
//             <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//               Home Insurance
//             </Typography>
//           </Box>
          
//           <Box sx={{ flexGrow: 1, display: 'flex' }}>
//             <NavLink onClick={handleProductsClick}>
//               Products <KeyboardArrowDownIcon />
//             </NavLink>
//             <Menu
//               anchorEl={productsAnchorEl}
//               open={Boolean(productsAnchorEl)}
//               onClose={handleMenuClose}
//             >
//               <MenuItem onClick={handleMenuClose}>Home Insurance</MenuItem>
//               <MenuItem onClick={handleMenuClose}>Auto Insurance</MenuItem>
//               <MenuItem onClick={handleMenuClose}>Life Insurance</MenuItem>
//             </Menu>
            
//             <NavLink onClick={handleClaimsClick}>
//               Claims <KeyboardArrowDownIcon />
//             </NavLink>
//             <Menu
//               anchorEl={claimsAnchorEl}
//               open={Boolean(claimsAnchorEl)}
//               onClose={handleMenuClose}
//             >
//               <MenuItem onClick={handleMenuClose}>File a Claim</MenuItem>
//               <MenuItem onClick={handleMenuClose}>Track Claim Status</MenuItem>
//               <MenuItem onClick={handleMenuClose}>Claim Resources</MenuItem>
//             </Menu>
            
//             <NavLink>Property</NavLink>
            
//             <NavLink>Renewals</NavLink>
            
//             <NavLink onClick={handleSupportClick}>
//               Support <KeyboardArrowDownIcon />
//             </NavLink>
//             <Menu
//               anchorEl={supportAnchorEl}
//               open={Boolean(supportAnchorEl)}
//               onClose={handleMenuClose}
//             >
//               <MenuItem onClick={handleMenuClose}>Contact Us</MenuItem>
//               <MenuItem onClick={handleMenuClose}>FAQs</MenuItem>
//               <MenuItem onClick={handleMenuClose}>Resources</MenuItem>
//             </Menu>
//           </Box>
          
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <LightModeIcon sx={{ color: 'white', mx: 2 }} />
//             <Button variant="contained" sx={{ 
//               backgroundColor: 'white', 
//               color: '#1976d2', 
//               fontWeight: 'bold',
//               '&:hover': {
//                 backgroundColor: '#e3f2fd',
//               }
//             }}>
//               Sign In
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Main Content */}
//       <Box sx={{ 
//         backgroundColor: "#f5f9ff", 
//         flexGrow: 1,
//         pt: 8,
//         pb: 10
//       }}>
//         <Container maxWidth="lg">
//           <Box 
//             sx={{
//               mb: 6,
//               textAlign: "center"
//             }}
//             component={motion.div}
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Typography
//               variant="h3"
//               component="h1"
//               sx={{
//                 color: "#0d47a1",
//                 fontWeight: 700,
//                 mb: 2,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
//               }}
//             >
//               <HomeIcon sx={{ fontSize: 36, mr: 1 }} />
//               Home Insurance Plans
//             </Typography>
            
//             <Typography
//               variant="h6"
//               sx={{
//                 color: "#546e7a",
//                 maxWidth: "800px",
//                 mx: "auto",
//                 mb: 4,
//                 fontSize: { xs: '1rem', sm: '1.1rem' }
//               }}
//             >
//               Protect your home and belongings with our comprehensive coverage options
//             </Typography>
//           </Box>

//           <Grid container spacing={4} justifyContent="center">
//             {policies.map((policy) => (
//               <Grid item xs={12} md={6} key={policy.policy_id} sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <motion.div 
//                   whileHover={{ y: -5 }}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   style={{ width: '100%', maxWidth: '500px' }}
//                 >
//                   <StyledCard>
//                     <PriceBadge>
//                       ₹{policy.monthly_premium}/year
//                     </PriceBadge>
                    
//                     <CardContent sx={{ p: 3, flexGrow: 1 }}>
//                       <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                         <ShieldIcon sx={{ color: "#1976d2", mr: 1.5 }} />
//                         <Typography
//                           variant="h5"
//                           sx={{ color: "#0d47a1", fontWeight: "600" }}
//                         >
//                           {policy.name}
//                         </Typography>
//                       </Box>
                      
//                       <Typography
//                         variant="body1"
//                         sx={{ mb: 3, color: "#546e7a" }}
//                       >
//                         {policy.description}
//                       </Typography>
                      
//                       <Box sx={{ mb: 3 }}>
//                         <Typography variant="subtitle2" sx={{ color: "#1976d2", mb: 1, fontWeight: 600 }}>
//                           Key Features:
//                         </Typography>
//                         <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//                           {policy.features.map((feature, idx) => (
//                             <FeatureChip key={idx} label={feature} size="small" />
//                           ))}
//                         </Box>
//                       </Box>
                      
//                       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                         <Typography variant="body2" sx={{ color: "#546e7a" }}>
//                           Coverage Amount:
//                         </Typography>
//                         <Typography variant="body1" sx={{ fontWeight: "600", color: "#0d47a1" }}>
//                           ₹{policy.coverage_amount.toLocaleString()}
//                         </Typography>
//                       </Box>
                      
//                       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                         <Typography variant="body2" sx={{ color: "#546e7a" }}>
//                           Duration:
//                         </Typography>
//                         <Typography variant="body1" sx={{ color: "#0d47a1" }}>
//                           {policy.duration_months} months
//                         </Typography>
//                       </Box>
                      
//                       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                         <Typography variant="body2" sx={{ color: "#546e7a" }}>
//                           Valid From:
//                         </Typography>
//                         <Typography variant="body1" sx={{ color: "#0d47a1" }}>
//                           {startDate.replace(/-/g, '-')} - {endDate.replace(/-/g, '-')}
//                         </Typography>
//                       </Box>
//                     </CardContent>

//                     <CardActions sx={{ p: 3, pt: 0 }}>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         sx={{ 
//                           backgroundColor: "#1976d2", 
//                           color: "white", 
//                           fontWeight: "600",
//                           borderRadius: "8px", 
//                           py: 1,
//                           textTransform: "none",
//                           fontSize: "1rem",
//                           '&:hover': {
//                             backgroundColor: "#0d47a1",
//                           }
//                         }}
//                         onClick={() => handleViewDetails(policy.policy_id)}
//                       >
//                         View Details
//                       </Button>
//                     </CardActions>
//                   </StyledCard>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default HomeInsurancePolicies;