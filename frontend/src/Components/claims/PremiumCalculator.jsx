import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PremiumCalculator = () => {
  const [formData, setFormData] = useState({
    propertyAge: '',
    floors: '',
    riskLevel: '',
    security: '',
    floodCover: false,
    earthquakeCover: false,
    theftProtection: false,
    premium: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckPremium = () => {
    const basePremium = 3500;
    let calculatedPremium = basePremium;

    const propertyAge = parseInt(formData.propertyAge);
    if (propertyAge > 3) {
      const ageYearsBeyond3 = propertyAge - 3;
      calculatedPremium += basePremium * 0.02 * ageYearsBeyond3;
    }

    calculatedPremium += basePremium * 0.05 * formData.floors;

    if (formData.riskLevel === 'High') {
      calculatedPremium += basePremium * 0.1;
    } else if (formData.riskLevel === 'Low') {
      calculatedPremium -= basePremium * 0.05;
    }

    const securityFeaturesCount = formData.security ? 1 : 0;
    calculatedPremium -= calculatedPremium * 0.05 * securityFeaturesCount;

    if (formData.floodCover) {
      calculatedPremium += basePremium * 0.05;
    }
    if (formData.earthquakeCover) {
      calculatedPremium += basePremium * 0.05;
    }
    if (formData.theftProtection) {
      calculatedPremium += basePremium * 0.05;
    }

    setFormData((prevData) => ({
      ...prevData,
      premium: calculatedPremium.toFixed(2),
    }));

    toast.success('Premium calculated successfully!');
  };

  return (
    <div className="premium-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: '60px' }}
      />

      <form>
        {/* Row 1: Property Age & Floors */}
        <div className="row">
          <input
            type="number"
            name="propertyAge"
            placeholder="Property Age (years)"
            value={formData.propertyAge}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="floors"
            placeholder="Number of Floors"
            value={formData.floors}
            onChange={handleChange}
            required
          />
        </div>

        {/* Row 2: Risk Level & Security Features */}
        <div className="row">
          <select
            name="riskLevel"
            value={formData.riskLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Risk Level</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            name="security"
            value={formData.security}
            onChange={handleChange}
            required
          >
            <option value="">Select Security Features</option>
            <option value="Fire Alarm">Fire Alarm</option>
            <option value="Fire Escape Steps">Fire Escape Steps</option>
            <option value="Fire Safety Equipment">Fire Safety Equipment</option>
          </select>
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="floodCover"
              checked={formData.floodCover}
              onChange={handleChange}
            />
            Include Flood Cover
          </label>
          <label>
            <input
              type="checkbox"
              name="earthquakeCover"
              checked={formData.earthquakeCover}
              onChange={handleChange}
            />
            Include Earthquake Cover
          </label>
          <label>
            <input
              type="checkbox"
              name="theftProtection"
              checked={formData.theftProtection}
              onChange={handleChange}
            />
            Include Theft Protection
          </label>
        </div>

        <button type="button" className="btn" onClick={handleCheckPremium}>
          Calculate Premium
        </button>

        <div className="premium-output">
          {formData.premium && <p>Estimated Premium: ₹ {formData.premium}</p>}
        </div>
      </form>

      <style jsx>{`
        .premium-container {
          background: #f9f9f9;
          padding: 30px;
          max-width: 650px;
          margin: 100px auto;
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
        }
        form {
          display: flex;
          flex-direction: column;
        }
        .row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        input[type='text'],
        input[type='number'],
        select {
          width: 48%;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #aaa;
          border-radius: 6px;
        }
        select {
          background: white;
        }
        .checkbox-group {
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .checkbox-group label {
          font-size: 16px;
        }
        .btn {
          background-color: #4f83cc;
          color: white;
          border: none;
          padding: 12px;
          margin-top: 15px;
          font-size: 18px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #356bb3;
        }
        .premium-output {
          margin: 20px 0;
          font-weight: bold;
          font-size: 20px;
          color: #333;
          text-align: center;
        }

        input[type="number"] {
          -moz-appearance: textfield;
          -webkit-appearance: none;
          appearance: none;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default PremiumCalculator;
