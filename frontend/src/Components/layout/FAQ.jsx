import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Collapse,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const handleClick = (index) => {
    setOpen(open === index ? null : index);
  };

  const questions = [
    "What does home insurance cover?",
    "How do I file a claim?",
    "Can I customize my coverage?",
  ];

  const answers = [
    "Our home insurance covers structural damage, personal belongings, liability protection, and additional living expenses.",
    "You can file a claim through our website, mobile app, or by calling our 24/7 support line.",
    "Yes, we offer flexible plans that can be customized to meet your specific needs.",
  ];

  return (
    <Box
      component="section"
      sx={{
        pt: 10,
        pb: 0,
        px: 1,
        backgroundColor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        {/* FAQ Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          color="text.primary"
          align="center"
          gutterBottom
        >
          Frequently Asked Questions
        </Typography>

        {/* FAQ Items */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            mt: 4,
          }}
        >
          {questions.map((question, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                width: "100%",
                maxWidth: 600,
                p: 2,
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleClick(index)}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="text.primary"
                >
                  {question}
                </Typography>
                <IconButton size="small">
                  {open === index ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
              </Box>
              <Collapse in={open === index}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {answers[index]}
                </Typography>
              </Collapse>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
