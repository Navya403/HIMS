import React from "react";
import {
  Box,
  Typography,
  Container,
  Link,
  Grid,
  useTheme,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#000", // Set background to black
        color: "#fff", // White text for visibility
        py: 2.1,
        mt: 5,
        borderTop: "1px solid",
        borderColor: "#333", // Darker border to match black bg
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2.4}>
          {/* About Insurer */}
          <Grid item xs={12} sm={4} sx={{ pr: { sm: 3 } }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              About Insurer
            </Typography>
            {[
              "HomeShield offers comprehensive home insurance solutions",
              "designed to protect your property, belongings, and family.",
              "With customizable plans, quick claim processing, and coverage",
              "for natural disasters, theft, and more — we ensure your peace of",
              "mind when it matters most.",
            ].map((text, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{
                  mt: i === 0 ? 0 : 0.5,
                  color: "#ccc", // Slightly lighter for better contrast
                }}
              >
                {text}
              </Typography>
            ))}
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4} sx={{ px: { sm: 8 } }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            {["Home", "About Us", "Blog", "Gallery"].map((link) => (
              <Typography key={link} variant="body2" sx={{ py: 0.3 }}>
                <Link href="#" color="inherit" underline="hover">
                  › {link}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={4} sx={{ pl: { sm: 6 } }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ py: 0.3 }}>
              <strong>Phone:</strong> +44 123 456 7890
            </Typography>
            <Typography variant="body2" sx={{ py: 0.3 }}>
              <strong>E-mail:</strong>{" "}
              <Link
                href="mailto:info@sitename.com"
                color="inherit"
                underline="hover"
              >
                info@sitename.com
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ py: 0.3 }}>
              <strong>Website:</strong>{" "}
              <Link
                href="https://yourdomain.com"
                target="_blank"
                color="inherit"
                underline="hover"
              >
                https://yourdomain.com
              </Link>
            </Typography>
          </Grid>
        </Grid>

        {/* Social Media Icons */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 8,
            display: "flex",
            gap: 1,
          }}
        >
          {[Facebook, Instagram, Twitter, LinkedIn].map((Icon, i) => (
            <IconButton
              key={i}
              href="#"
              sx={{
                color: "#000",
                backgroundColor: "#a3e635",
                "&:hover": {
                  backgroundColor: "#bef264",
                },
              }}
            >
              <Icon fontSize="small" />
            </IconButton>
          ))}
        </Box>
      </Container>

      {/* Footer Bottom */}
      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 2.1, color: "grey.500" }}
      >
        © 2024 HomeShield. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
