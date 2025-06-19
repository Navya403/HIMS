import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Coverage = () => {
  const [formData, setFormData] = useState({
    damageReason: '',
    propertyValue: '',
    propertyDamageValue: '',
    propertyAgeYears: '',
    description: '',
    premium: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckPremium = () => {
    const {
      propertyValue,
      propertyDamageValue,
      propertyAgeYears,
      description,
    } = formData;

    if (
      !propertyValue ||
      !propertyDamageValue ||
      propertyAgeYears === '' ||
      !description
    ) {
      toast.error('Please fill all required fields!');
      return;
    }

    const value = parseFloat(propertyValue);
    let damageValue = parseFloat(propertyDamageValue);
    const ageYears = parseInt(propertyAgeYears);

    if (damageValue > value) {
      toast.error('Damage value cannot exceed property value!');
      return;
    }

    // Step 1: Subtract 5% tax
    let adjustedPremium = damageValue * 0.95;

    // Step 2: Subtract 2% for each year after 3 years
    if (ageYears > 3) {
      const extraYears = ageYears - 3;
      const ageReduction = extraYears * 0.02;
      adjustedPremium *= (1 - ageReduction);
    }

    setFormData((prev) => ({
      ...prev,
      premium: adjustedPremium.toFixed(2),
    }));

    toast.success('Coverage calculated successfully!');
  };

  return (
    <div className="premium-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <form>
        <div className="row">
          <input
            type="text"
            name="damageReason"
            placeholder="Damage Reason (e.g., Fire, Floods, Theft)"
            value={formData.damageReason}
            onChange={handleChange}
          />

          <input
            type="number"
            name="propertyValue"
            placeholder="Property Value"
            value={formData.propertyValue}
            onChange={handleChange}
            className="no-spinner"
          />
        </div>

        <div className="row">
          <input
            type="number"
            name="propertyDamageValue"
            placeholder="Property Damage Value"
            value={formData.propertyDamageValue}
            onChange={handleChange}
            className="no-spinner"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <select
            name="propertyAgeYears"
            value={formData.propertyAgeYears}
            onChange={handleChange}
          >
            <option value="">Property Age (Years)</option>
            {Array.from({ length: 51 }, (_, i) => (
              <option key={i} value={i}>{i} yr</option>
            ))}
          </select>
        </div>

        <button type="button" className="btn" onClick={handleCheckPremium}>
          Calculate Coverage
        </button>

        <div className="premium-output">
          {formData.premium && <p>Estimated Coverage Amount: ₹ {formData.premium}</p>}
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
        input,
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
        .no-spinner::-webkit-outer-spin-button,
        .no-spinner::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-spinner {
          -moz-appearance: textfield;
        }
        @media (max-width: 600px) {
          .row {
            flex-direction: column;
            gap: 10px;
          }
          input,
          select {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Coverage;
