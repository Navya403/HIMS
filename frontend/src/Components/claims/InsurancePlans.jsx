import React from "react";
import { useNavigate } from "react-router-dom";
import "./InsurancePlans.css";
import SampleFooter from "../auth/SampleFooter";
import Header from "../layout/Header"; // ✅ Import the Header component

const plans = [
  {
    id: 1,
    name: "Standard Home Insurance",
    description: "Covers basic structural damage, fire, and theft.",
    price: 3500,
    startDate: "2025-05-01",
    endDate: "2026-04-30",
  },
  {
    id: 2,
    name: "Premium Home Protection",
    description: "Includes all standard coverage plus flood and earthquake.",
    price: 6200,
    startDate: "2025-05-01",
    endDate: "2026-04-30",
  },
  {
    id: 3,
    name: "Appliance Safety Plan",
    description: "Covers major home appliances from accidental damage.",
    price: 2200,
    startDate: "2025-05-01",
    endDate: "2026-04-30",
  },
  {
    id: 4,
    name: "Tenant's Home Insurance",
    description: "For rented homes. Covers belongings and personal liability.",
    price: 2800,
    startDate: "2025-05-01",
    endDate: "2026-04-30",
  },
  {
    id: 5,
    name: "Complete Family Plan",
    description: "Covers house, belongings, and family health integration.",
    price: 7500,
    startDate: "2025-05-01",
    endDate: "2026-04-30",
  },
  {
    id: 6,
    name: "Luxury Home Shield",
    description: "Tailored for high-value properties. Full risk coverage.",
    price: 11000,
    startDate: "2025-05-01",
    endDate: "2026-04-30",
  },
];

const InsurancePlans = ({
  isDarkMode,
  toggleDarkMode,
  isLoggedIn,
  onLogout,
  onSignInClick,
}) => {
  const navigate = useNavigate();

  const handleBuy = (planId) => {
    navigate("/payment", { state: { planId } });
  };

  return (
    <>
      {/* ✅ Header at the top */}
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        onSignInClick={onSignInClick}
      />

      {/* Add top padding to avoid content being hidden behind the fixed AppBar */}
      <div style={{ paddingTop: "80px" }}>
        <div className="plans-container">
          <h1 className="plans-title">🏠 Home Insurance Plans</h1>
          <div className="plans-grid">
            {plans.map((plan) => (
              <div className="plan-card" key={plan.id}>
                <div className="date-overlay">
                  <p>Start: {plan.startDate}</p>
                  <p>End: {plan.endDate}</p>
                </div>
                <div className="card-content">
                  <h2 className="plan-name">{plan.name}</h2>
                  <p className="plan-description">{plan.description}</p>
                  <p className="plan-price">₹{plan.price} / year</p>
                </div>
                <button
                  className="buy-button"
                  onClick={() => handleBuy(plan.id)}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Footer at the bottom */}
      <SampleFooter />
    </>
  );
};

export default InsurancePlans;
