import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Home } from "@mui/icons-material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import ContactPopup from "./ContactPopup"; // ✅ Adjust the path based on your structure

const Header = ({
  isDarkMode,
  toggleDarkMode,
  isLoggedIn,
  onLogout,
  onSignInClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [menuName, setMenuName] = useState("");
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleMenuOpen = (event, name) => {
    setAnchorEl(event.currentTarget);
    setMenuName(name);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setProfileAnchorEl(null);
    setMenuName("");
  };

  const handleItemClick = (item) => {
    switch (item) {
      case "Raise New Claim":
        navigate("/raise-claim");
        break;
      case "Track Claim":
        navigate("/track-claim");
        break;
      case "Policies":
        navigate("/policies");
        break;
      case "Premium":
        navigate("/premium");
        break;
      case "Coverage":
        navigate("/coverage");
        break;
      case "Contact Us":
        setContactModalOpen(true);
        break;
      case "Chat Support":
        navigate("/chat-support");
        break;
      default:
        break;
    }
    handleMenuClose();
  };

  const renderMenuItems = () => {
    const items = {
      Products: [
        ...(isLoggedIn ? ["Policies"] : []),
        "Premium",
        "Coverage",
      ],
      Claims: ["Raise New Claim", "Track Claim"],
      Support: ["Contact Us", "Chat Support"],
    };

    return items[menuName]?.map((item, index) => (
      <MenuItem key={index} onClick={() => handleItemClick(item)}>
        {item}
      </MenuItem>
    ));
  };

  const renderProfileMenuItems = () => [
    <MenuItem
      key="profile"
      onClick={() => {
        navigate("/profile");
        handleMenuClose();
      }}
    >
      My Profile
    </MenuItem>,
    <MenuItem
      key="logout"
      onClick={() => {
        onLogout();
        handleMenuClose();
      }}
    >
      Logout
    </MenuItem>,
  ];

  return (
    <>
      <AppBar position="fixed" color="default" elevation={1} sx={{ width: "100%", zIndex: 1201 }}>
        <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
          {/* Left Section */}
          <Box display="flex" alignItems="center" gap={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Home fontSize="medium" />
              <Button sx={{ textTransform: "none", padding: 0 }} onClick={() => navigate("/")}>
                <Typography variant="h6" fontWeight="bold">
                  Home Shield
                </Typography>
              </Button>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                onClick={(e) => handleMenuOpen(e, "Products")}
                endIcon={<ArrowDropDownIcon />}
                sx={{ textTransform: "none" }}
              >
                Products
              </Button>

              {isLoggedIn && (
                <Button
                  onClick={(e) => handleMenuOpen(e, "Claims")}
                  endIcon={<ArrowDropDownIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Claims
                </Button>
              )}

              <Button sx={{ textTransform: "none" }} onClick={() => navigate("/add-property")}>
                Property
              </Button>

              {isLoggedIn && (
                <Button sx={{ textTransform: "none" }} onClick={() => navigate("/renewals")}>
                  Renewals
                </Button>
              )}
            </Box>
          </Box>

          {/* Right Section */}
          <Box display="flex" alignItems="center" gap={2}>
            <Button
              onClick={(e) => handleMenuOpen(e, "Support")}
              endIcon={<ArrowDropDownIcon />}
              sx={{ textTransform: "none" }}
            >
              Support
            </Button>

            <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <IconButton onClick={toggleDarkMode} color="inherit">
                {isDarkMode ? <DarkModeIcon /> : <WbSunnyIcon />}
              </IconButton>
            </Tooltip>

            {isLoggedIn ? (
              <>
                <IconButton onClick={handleProfileMenuOpen}>
                  <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
                    <AccountCircleIcon fontSize="small" />
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={profileAnchorEl}
                  open={Boolean(profileAnchorEl)}
                  onClose={handleMenuClose}
                  disableScrollLock
                >
                  {renderProfileMenuItems()}
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={onSignInClick}
                sx={{ textTransform: "none" }}
              >
                Sign In
              </Button>
            )}
          </Box>

          {/* Dropdown Menus */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            disableScrollLock
          >
            {renderMenuItems()}
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Contact Popup */}
      <ContactPopup open={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  );
};

export default Header;
