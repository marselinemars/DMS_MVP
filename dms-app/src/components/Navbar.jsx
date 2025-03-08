import React, { useState } from "react";
import { FaSearch, FaBell, FaCog, FaUserCircle } from "react-icons/fa";
import "./Navbar.css"; // Import the CSS

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar-container">
      {/* Search Bar */}
      <div className="navbar-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search"
          className="search-input"
        />
      </div>

      {/* Navbar Right Section */}
      <div className="navbar-icons">
        {/* Notification Icon with Red Dot */}
        <div className="icon-container">
          <FaBell className="icon" aria-label="Notifications" />
          <span className="notification-dot"></span>
        </div>

        {/* Settings Icon */}
        <FaCog className="icon" aria-label="Settings" />

        {/* User Profile Picture with Dropdown */}
        <div
          className="profile-container"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img
            src="https://randomuser.me/api/portraits/women/50.jpg"
            alt="User"
            className="profile-pic"
            aria-label="User Profile"
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item">Profile</div>
              <div className="dropdown-item">Settings</div>
              <div className="dropdown-item">Logout</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
