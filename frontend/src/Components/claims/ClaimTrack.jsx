import React from "react";
import SampleFooter from "../auth/SampleFooter"; // Adjust the path if necessary

const ClaimTrack = ({ darkMode }) => {
  const steps = ["Claim Received", "In Progress", "Payment Initiated", "Settled"];
  const completedStep = "Settled";

  const styles = {
    wrapper: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: darkMode ? "#121212" : "#f0f4f8", // Dark mode background
    },
    pageWrapper: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start", // Align content from top
      paddingTop: "80px", // Add top space to push content down
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingBottom: "20px",
      boxSizing: "border-box",
      overflowY: "auto",
    },
    formWrapper: {
      width: "90%",
      maxWidth: "1200px",
      padding: "50px 40px",
      border: `1px solid ${darkMode ? "#333333" : "#e0e6ed"}`, // Dark mode border
      borderRadius: "12px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      fontFamily: "Arial, sans-serif",
      backgroundColor: darkMode ? "#1e1e1e" : "#ffffff", // Dark mode background
      margin: "auto",
    },
    title: {
      textAlign: "center",
      fontSize: "36px", // Increased font size
      fontWeight: "bold",
      color: darkMode ? "#f5f5f5" : "#2d3748", // Dark mode title color
      marginBottom: "40px",
    },
    progressWrapper: {
      position: "relative",
      marginBottom: "50px",
    },
    line: {
      position: "absolute",
      top: "32px",
      left: "30px",
      right: "30px",
      height: "6px",
      backgroundColor: "#38a169",
      borderRadius: "3px",
      zIndex: 1,
    },
    steps: {
      display: "flex",
      justifyContent: "space-between",
      position: "relative",
      zIndex: 2,
    },
    step: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
      position: "relative",
    },
    circle: (isCompleted, isLast) => ({
      width: "60px", // Increased circle size
      height: "60px", // Increased circle size
      borderRadius: "50%",
      backgroundColor: isLast ? "#ed8936" : isCompleted ? "#38a169" : "#cbd5e0", // Dark mode circle color
      border: "3px solid white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "28px", // Increased font size for ✓
      color: "white",
      zIndex: 2,
    }),
    label: {
      marginTop: "16px", // Increased margin for label
      fontSize: "18px", // Increased font size
      fontWeight: "bold",
      color: darkMode ? "#e0e0e0" : "#2f855a", // Dark mode label color
      textAlign: "center",
      lineHeight: "1.3",
    },
    info: {
      fontSize: "18px", // Increased font size for info text
      color: darkMode ? "#d1d5db" : "#4a5568", // Dark mode info color
      textAlign: "center",
      marginTop: "30px",
    },
    boldText: {
      fontWeight: "bold",
      marginBottom: "5px",
    },
    text: {
      margin: "4px 0",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.pageWrapper}>
        <div style={styles.formWrapper}>
          <div style={styles.title}>Claim Track</div>
          <div style={styles.progressWrapper}>
            <div style={styles.line}></div>
            <div style={styles.steps}>
              {steps.map((step, index) => {
                const isCompleted = steps.indexOf(completedStep) >= index;
                const isLast = step === completedStep;
                return (
                  <div style={styles.step} key={index}>
                    <div style={styles.circle(isCompleted, isLast)}>
                      {isCompleted && !isLast ? "✓" : ""}
                    </div>
                    <div style={styles.label}>{step}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={styles.info}>
            <p style={styles.boldText}>Claim track details</p>
            <p style={styles.text}>Your claim has been successfully settled.</p>
          </div>
        </div>
      </div>
      <SampleFooter />
    </div>
  );
};

export default ClaimTrack;
