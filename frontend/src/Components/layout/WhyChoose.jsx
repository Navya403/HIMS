// import React from "react";
// import { Box, Typography, Grid, Paper, Container } from "@mui/material";

// const features = [
//   {
//     title: "24/7 Support",
//     description: "Round-the-clock assistance for all your insurance needs",
//   },
//   {
//     title: "Quick Claims",
//     description: "Fast and efficient claim processing",
//   },
//   {
//     title: "Custom Plans",
//     description: "Tailored insurance solutions for your home",
//   },
// ];

// const WhyChoose = () => {
//   return (
//     <Box
//       component="section"
//       sx={{
//         width: "100%",
//         py: 5,
//         px: 3,
//         backgroundColor: "background.paper",
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* Title */}
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           color="text.primary"
//           align="center"
//           gutterBottom
//         >
//           Why Choose Us
//         </Typography>

//         <Typography
//           variant="subtitle1"
//           color="text.secondary"
//           align="center"
//           mb={6}
//         >
//           Discover what makes our home insurance stand out.
//         </Typography>

//         {/* Features */}
//         <Grid container spacing={4} justifyContent="center">
//           {features.map((feature, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 2.5,
//                   borderRadius: 3,
//                   textAlign: "center",
//                   height: "100%",
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   fontWeight="bold"
//                   color="text.primary"
//                   gutterBottom
//                 >
//                   {feature.title}
//                 </Typography>
//                 <Typography variant="body1" color="text.secondary">
//                   {feature.description}
//                 </Typography>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default WhyChoose;
import React from "react";
import { useTheme } from "@mui/material/styles";

const WhyChooseUs = () => {
  const theme = useTheme();

  const features = [
    {
      icon: "🏠",
      title: "Comprehensive Coverage",
      description:
        "Protect your home and belongings with our extensive coverage options tailored to your needs.",
    },
    {
      icon: "⚡",
      title: "Fast Claims Processing",
      description:
        "Our efficient claims process ensures quick resolution and minimal disruption to your life.",
    },
    {
      icon: "💰",
      title: "Competitive Rates",
      description:
        "Get the best value for your money with our competitive pricing and flexible payment options.",
    },
    {
      icon: "👨‍💼",
      title: "Expert Support",
      description:
        "Access to knowledgeable insurance professionals who are ready to assist you 24/7.",
    },
  ];

  const styles = {
    section: {
      padding: "0rem 2rem",
      backgroundColor: theme.palette.background.default,
    },
    title: {
      textAlign: "center",
      fontSize: "2.5rem",
      color: theme.palette.text.primary,
      marginBottom: "3rem",
    },
    features: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    featureCard: {
      backgroundColor: theme.palette.background.paper,
      padding: "2rem",
      borderRadius: "8px",
      textAlign: "center",
      transition: "transform 0.3s ease",
    },
    icon: {
      fontSize: "3rem",
      marginBottom: "1rem",
    },
    featureTitle: {
      fontSize: "1.5rem",
      color: theme.palette.text.primary,
      marginBottom: "1rem",
    },
    featureDescription: {
      color: theme.palette.text.secondary,
      lineHeight: "1.6",
    },
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Why Choose Us</h2>
      <div style={styles.features}>
        {features.map((feature, index) => (
          <div
            key={index}
            style={styles.featureCard}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={styles.icon}>{feature.icon}</div>
            <h3 style={styles.featureTitle}>{feature.title}</h3>
            <p style={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
