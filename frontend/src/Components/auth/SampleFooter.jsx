import React from "react";
import { Box, Typography, IconButton, Grid, useTheme } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const SampleFooter = () => {
  const theme = useTheme(); // Access the current theme

  // Define color variables based on the current theme mode
  const iconColor = theme.palette.mode === "dark" ? "#ccc" : "#333"; // Light gray for dark mode, dark gray for light mode
  const footerBgColor = theme.palette.mode === "dark" ? "#333" : "#f5f5f5"; // Dark gray for dark mode, light gray for light mode
  const footerTextColor = theme.palette.mode === "dark" ? "#ccc" : "#333"; // Light gray text for dark mode, dark gray for light mode

  return (
    <Box
      component="footer"
      sx={{
        mt: 4, // Reduced margin-top
        py: 2, // Reduced padding
        backgroundColor: footerBgColor, // Background color based on theme
        color: footerTextColor, // Text color based on theme
        border: "1px solid #333", // Full border around the footer
        // No borderRadius to keep corners sharp like a cube
      }}
    >
      <Grid container justifyContent="center" spacing={0}> {/* Reduced spacing */}
        <Grid item>
          <IconButton href="#" sx={{ color: iconColor, fontSize: 20 }}> {/* Reduced icon size */}
            <Facebook />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton href="#" sx={{ color: iconColor, fontSize: 20 }}> {/* Reduced icon size */}
            <Twitter />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton href="#" sx={{ color: iconColor, fontSize: 20 }}> {/* Reduced icon size */}
            <Instagram />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton href="#" sx={{ color: iconColor, fontSize: 20 }}> {/* Reduced icon size */}
            <LinkedIn />
          </IconButton>
        </Grid>
      </Grid>

      <Typography variant="body2" align="center" sx={{ mt: 1, color: footerTextColor, fontSize: "0.875rem" }}> {/* Reduced font size */}
        © 2024 HomeShield. All rights reserved.
      </Typography>
    </Box>
  );
};

export default SampleFooter;
