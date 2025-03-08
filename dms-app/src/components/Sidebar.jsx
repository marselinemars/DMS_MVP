import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaFileAlt,
  FaChartBar,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css"; // We'll style it separately

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>
      <ul>
        <li>
          <Link to="/">
            <FaChartBar /> {isOpen && "Dashboard"}
          </Link>
        </li>
        <li>
          <Link to="/users">
            <FaUser /> {isOpen && "Users"}
          </Link>
        </li>
        <li>
          <Link to="/documents">
            <FaFileAlt /> {isOpen && "Documents"}
          </Link>
        </li>
        <li className="logout">
          <Link to="/login">
            <FaSignOutAlt /> {isOpen && "Logout"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
