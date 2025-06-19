import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SampleFooter from "../auth/SampleFooter";

const RaiseNewClaim = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    damageLocation: "",
    damageDescription: "",
    damageDate: "",
    estimatedCost: "",
    imageUrl: "",
    termsAccepted: false,
    policyId: "",
  });

  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Unauthorized! Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8085/api/policies/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPolicies(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Session expired or unauthorized. Please log in again.");
        } else {
          toast.error("Error fetching policies!");
        }
      }
    };

    fetchPolicies();
  }, []);

  const styles = {
    // (same as your styles object)
    wrapper: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: darkMode ? "#121212" : "#f5f5f5",
    },
    page: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      fontFamily: "'Arial', sans-serif",
      padding: "20px",
      paddingTop: "80px",
      overflowY: "auto",
    },
    formContainer: {
      width: "90%",
      maxWidth: "650px",
      backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      color: darkMode ? "#f0f0f0" : "#333333",
    },
    title: {
      fontSize: "30px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "25px",
      color: darkMode ? "#ffffff" : "#222222",
    },
    formGroup: {
      marginBottom: "18px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      fontSize: "18px",
      color: darkMode ? "#cccccc" : "#444444",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      fontSize: "18px",
      border: `1px solid ${darkMode ? "#555555" : "#cccccc"}`,
      borderRadius: "6px",
      backgroundColor: darkMode ? "#2c2c2c" : "#ffffff",
      color: darkMode ? "#ffffff" : "#333333",
    },
    textarea: {
      width: "100%",
      padding: "12px 14px",
      fontSize: "18px",
      border: `1px solid ${darkMode ? "#555555" : "#cccccc"}`,
      borderRadius: "6px",
      minHeight: "100px",
      resize: "vertical",
      backgroundColor: darkMode ? "#2c2c2c" : "#ffffff",
      color: darkMode ? "#ffffff" : "#333333",
      fontFamily: "'Arial', sans-serif",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      margin: "18px 0 25px",
    },
    checkbox: {
      width: "18px",
      height: "18px",
      accentColor: darkMode ? "#646cff" : "#007bff",
    },
    checkboxLabel: {
      fontSize: "16px",
      color: darkMode ? "#dddddd" : "#555555",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
      gap: "15px",
      marginTop: "15px",
    },
    button: {
      flex: 1,
      padding: "12px",
      fontSize: "18px",
      border: "none",
      borderRadius: "6px",
      color: "#ffffff",
      cursor: "pointer",
    },
    backButton: {
      backgroundColor: darkMode ? "#555555" : "#6c757d",
    },
    submitButton: {
      backgroundColor: darkMode ? "#646cff" : "#007bff",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      damageLocation,
      damageDescription,
      damageDate,
      estimatedCost,
      imageUrl,
      termsAccepted,
      policyId,
    } = formData;

    if (!damageLocation || !damageDescription || !damageDate || !estimatedCost || !imageUrl || !termsAccepted || !policyId) {
      toast.error("Please fill out all fields and accept the terms!");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.error("Unauthorized! Please log in.");
      return;
    }

    const requestPayload = {
      damageLocation,
      damageDescription,
      incidentDate: damageDate,
      estimatedCost,
      imageUrl,
      status: "SUBMITTED",
      policyId,
    };

    try {
      await axios.post("http://localhost:8085/claims/create", requestPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Claim submitted successfully!");
      setFormData({
        damageLocation: "",
        damageDescription: "",
        damageDate: "",
        estimatedCost: "",
        imageUrl: "",
        termsAccepted: false,
        policyId: "",
      });
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Unauthorized! Token may be expired. Please log in again.");
      } else {
        toast.error(err.response?.data?.message || "Error submitting claim!");
      }
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.page}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>Raise New Claim</h1>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Policy</label>
              <select
                style={styles.input}
                value={formData.policyId}
                onChange={(e) => setFormData({ ...formData, policyId: e.target.value })}
              >
                <option value="">Select a policy</option>
                {policies.map((policy) => (
                  <option key={policy.policyId} value={policy.policyId}>
                    {policy.policyType} - {policy.policyName}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Damage Location</label>
              <input
                type="text"
                style={styles.input}
                value={formData.damageLocation}
                onChange={(e) => setFormData({ ...formData, damageLocation: e.target.value })}
                placeholder="Where did the damage occur?"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Damage Description</label>
              <textarea
                style={styles.textarea}
                value={formData.damageDescription}
                onChange={(e) => setFormData({ ...formData, damageDescription: e.target.value })}
                placeholder="Describe the damage in detail..."
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Date of Damage</label>
              <input
                type="date"
                style={styles.input}
                value={formData.damageDate}
                onChange={(e) => setFormData({ ...formData, damageDate: e.target.value })}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Estimated Cost</label>
              <input
                type="text"
                style={styles.input}
                value={formData.estimatedCost}
                onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                placeholder="Enter estimated repair cost"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Image URL</label>
              <input
                type="text"
                style={styles.input}
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="Enter image URL"
              />
            </div>

            <div style={styles.checkboxContainer}>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                required
              />
              <span style={styles.checkboxLabel}>
                I accept the <strong>terms and conditions</strong>
              </span>
            </div>

            <div style={styles.buttonGroup}>
              <button
                type="button"
                style={{ ...styles.button, ...styles.backButton }}
                onClick={() => window.history.back()}
              >
                Back
              </button>
              <button type="submit" style={{ ...styles.button, ...styles.submitButton }}>
                Submit Claim
              </button>
            </div>
          </form>
        </div>
        <ToastContainer position="top-right" autoClose={4000} theme={darkMode ? "dark" : "light"} />
      </div>
      <SampleFooter />
    </div>
  );
};

export default RaiseNewClaim;
