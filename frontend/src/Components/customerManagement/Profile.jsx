import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [editPersonal, setEditPersonal] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/90");
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [address, setAddress] = useState({
   
    street: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });
  const [properties, setProperties] = useState({
    propertyAddress: "",
    city: "",
    zipCode: "",
    propertySize: "",
    estimationValue: "",
    propertyType: "",
    rooms: "",
    dateOfBirth: "",
    file: null,
  });

  const policies = [
    { id: "POL1001", type: "Home Insurance", coverage: "₹10,00,000", status: "Active" },
    { id: "POL1002", type: "Health Insurance", coverage: "₹5,00,000", status: "Deactivated" },
  ];

  const parseAddress = (addressString) => {
    if (!addressString) return {};
    
    try {
      // Handle different address formats
      const parts = addressString.split(/,\s*/);
      if (parts.length === 1) {
        // Just street address
        return { street: parts[0] };
      } else if (parts.length >= 6) {
        // Full address format
        const statePincode = parts[3].split(/\s*-\s*/);
        return {
          
          street: parts[1],
          city: parts[2],
          state: statePincode[0] || "",
          pincode: statePincode[1] || "",
          country: parts[4] || ""
        };
      } else {
        // Partial address
        return {
          street: parts[0] || "",
          city: parts[1] || "",
          state: parts[2] || "",
          pincode: parts[3] || "",
          country: parts[4] || ""
        };
      }
    } catch (error) {
      console.error("Error parsing address:", error);
      return {};
    }
  };

  const formatAddressForBackend = (addressObj) => {
    return ` ${addressObj.street}, ${addressObj.city}, ${addressObj.state} - ${addressObj.pincode}, ${addressObj.country}`;
  };

  const toggleEditMode = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    if (activeTab === "personal") {
      if (editPersonal) {
        try {
          const payload = {
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
          };
          await axios.put("http://localhost:8085/auth/update", payload, config);
          toast.success("Personal info updated successfully");
        } catch (err) {
          toast.error(err.response?.data || "Failed to update personal info");
        }
      }
      setEditPersonal(!editPersonal);
    } else if (activeTab === "address") {
      if (editAddress) {
        try {
          const addressString = formatAddressForBackend(address);
          await axios.put("http://localhost:8085/auth/update", { address: addressString }, config);
          toast.success("Address updated successfully");
        } catch (err) {
          toast.error(err.response?.data || "Failed to update address");
        }
      }
      setEditAddress(!editAddress);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const response = await axios.get("http://localhost:8085/auth/profile", config);
        setPersonalInfo({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
        });
        
        if (response.data.address) {
          const parsedAddress = parseAddress(response.data.address);
          setAddress(prev => ({
            ...prev,
            ...parsedAddress
          }));
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
        toast.error("Failed to load profile data");
      }
    };

    fetchProfileData();
  }, []);

  const handlePersonalChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePropertiesChange = (e) => {
    const { name, value, files } = e.target;
    setProperties({
      ...properties,
      [name]: name === "file" ? files[0] : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const handleSaveProperties = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    Object.entries(properties).forEach(([key, value]) => {
      if (key === "file" && value) {
        formData.append(key, value);
      } else if (key !== "file") {
        formData.append(key, value);
      }
    });

    try {
      await axios.post("http://localhost:8085/auth/save-property", formData, config);
      toast.success("Property details saved successfully");
    } catch (error) {
      toast.error(error.response?.data || "Failed to save property details");
    }
  };

  const handleViewPolicyDetails = (policyId) => {
    toast.info(`Viewing details for policy: ${policyId}`);
  };

  return (
    <div>
      <style>
        {`
          body {
            font-family: Arial;
            margin: 0;
            padding: 0;
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            margin: 0px;
            color: #333;
          }
          .layout {
            display: flex;
            width: 100%;
            min-height: 100vh;
            margin: 0;
          }
          .sidebar {
            width: 25%;
            background-color: #1a2238;
            padding: 20px;
            margin: 0;
          }
          .profile-section {
            text-align: center;
            margin-bottom: 20px;
          }
          .profile-image {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            margin-bottom: 10px;
          }
          .profile-name {
            margin: 10px 0 5px;
            font-size: 18px;
            color: #ffffff;
          }
          .change-profile-link {
            cursor: pointer;
            color: #007bff;
            font-size: 14px;
            text-decoration: underline;
          }
          .sidebar-title {
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0 10px;
            color: #ffffff;
          }
          .nav-list {
            list-style: none;
            padding: 0;
            margin-bottom: 30px;
          }
          .nav-item {
            margin: 12px 0;
            cursor: pointer;
            font-weight: normal;
            color: #ffffff;
          }
          .nav-item.active {
            font-weight: bold;
            color: #007bff;
          }
          .main-content {
            width: 75%;
            background-color: #ffffff;
            padding: 25px;
            margin: 0;
            border-left: 1px solid #ddd;
          }
          .dashboard-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #333;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #444;
          }
          .form-label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
          }
          .form-input {
            width: 50%;
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 5px;
            border: 1px solid #ddd;
            font-size: 14px;
          }
          .read-only-input {
            background-color: #f8f9fa;
          }
          .edit-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
          }
          .save-button {
            background-color: #28a745;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
          }
          .table-header {
            background-color: #f8f9fa;
            text-align: left;
          }
          .table-cell {
            padding: 12px 15px;
            border-bottom: 1px solid #ddd;
          }
          .status-button {
            background-color: #28a745;
            color: white;
            border-radius: 15px;
            padding: 5px 10px;
            border: none;
            font-size: 12px;
            font-weight: bold;
          }
          .deactivated-status {
            background-color: #dc3545;
          }
          .view-button {
            background-color: #007bff;
            color: white;
            border-radius: 15px;
            padding: 5px 15px;
            cursor: pointer;
            border: none;
            font-size: 12px;
            font-weight: bold;
          }
          .two-column-form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .save-property-button {
            background-color: #28a745;
            color: white;
            border-radius: 5px;
            padding: 12px 25px;
            border: none;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
          }
        `}
      </style>

      <h1 className="header">Home Insurance</h1>

      <div className="layout">
        <div className="sidebar">
          <div className="profile-section">
            <img src={profileImage} alt="Profile" className="profile-image" />
            <h3 className="profile-name">
              {personalInfo.firstName} {personalInfo.lastName}
            </h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="uploadProfileImage"
              style={{ display: "none" }}
            />
            <label htmlFor="uploadProfileImage" className="change-profile-link">
              Change Profile Picture
            </label>
          </div>

          <ul className="nav-list">
            {["personal", "address", "policies", "properties"].map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`nav-item ${activeTab === tab ? "active" : ""}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        <div className="main-content">
          {activeTab === "personal" && (
            <section>
              <h3 className="section-title">Personal Information</h3>
              <div style={{ marginBottom: 15 }}>
                <label className="form-label">First Name</label>
                <input
                  name="firstName"
                  value={personalInfo.firstName}
                  onChange={handlePersonalChange}
                  disabled={!editPersonal}
                  className="form-input"
                />
              </div>
              <div style={{ marginBottom: 15 }}>
                <label className="form-label">Last Name</label>
                <input
                  name="lastName"
                  value={personalInfo.lastName}
                  onChange={handlePersonalChange}
                  disabled={!editPersonal}
                  className="form-input"
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="form-label">Email</label>
                <input
                  name="email"
                  value={personalInfo.email}
                  readOnly
                  className="form-input read-only-input"
                />
              </div>
              <button
                onClick={toggleEditMode}
                className={`edit-button ${editPersonal ? "save-button" : ""}`}
              >
                {editPersonal ? "Save Changes" : "Edit Profile"}
              </button>
            </section>
          )}

          {activeTab === "address" && (
            <section>
              <h3 className="section-title">Address</h3>
              {Object.keys(address).map((key) => (
                <div key={key} style={{ marginBottom: 15 }}>
                  <label className="form-label" style={{ textTransform: "capitalize" }}>
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    name={key}
                    value={address[key]}
                    onChange={handleAddressChange}
                    disabled={!editAddress}
                    className="form-input"
                  />
                </div>
              ))}
              <button
                onClick={toggleEditMode}
                className={`edit-button ${editAddress ? "save-button" : ""}`}
              >
                {editAddress ? "Save Changes" : "Edit Profile"}
              </button>
            </section>
          )}

          {activeTab === "policies" && (
            <section>
              <h3 className="section-title">Policies</h3>
              <table className="table">
                <thead>
                  <tr className="table-header">
                    <th className="table-cell">Policy ID</th>
                    <th className="table-cell">Type</th>
                    <th className="table-cell">Coverage</th>
                    <th className="table-cell">Status</th>
                    <th className="table-cell">Policy Details</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.map((policy) => (
                    <tr key={policy.id} style={{ borderBottom: "1px solid #ddd" }}>
                      <td className="table-cell">{policy.id}</td>
                      <td className="table-cell">{policy.type}</td>
                      <td className="table-cell">{policy.coverage}</td>
                      <td className="table-cell">
                        <button
                          className={`status-button ${policy.status !== "Active" ? "deactivated-status" : ""}`}
                        >
                          {policy.status}
                        </button>
                      </td>
                      <td className="table-cell">
                        <button
                          onClick={() => handleViewPolicyDetails(policy.id)}
                          className="view-button"
                        >
                          View Policy Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {activeTab === "properties" && (
            <section>
              <h3 className="section-title">Property Details</h3>
              <div className="two-column-form">
                {[
                  "propertyAddress",
                  "city",
                  "zipCode",
                  "propertySize",
                  "estimationValue",
                  "propertyType",
                  "rooms",
                  "dateOfBirth",
                ].map((field) => (
                  <div key={field}>
                    <label className="form-label">
                      {field.replace(/([A-Z])/g, " $1").replace(/^\w/, (c) => c.toUpperCase())}
                    </label>
                    <input
                      name={field}
                      value={properties[field]}
                      onChange={handlePropertiesChange}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="form-label">File Upload</label>
                <input
                  type="file"
                  name="file"
                  onChange={handlePropertiesChange}
                  className="form-input"
                />
              </div>
              <button onClick={handleSaveProperties} className="save-property-button">
                Save Property Details
              </button>
            </section>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000}/>
    </div>
  );
}