// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaUsers,
  FaMapMarkedAlt,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  const navItems = [
    { label: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { label: "Usuarios", path: "/reportes", icon: <FaUsers /> },
    { label: "Reportes", path: "/usuarios", icon: <FaClipboardList /> },
    { label: "Zonas", path: "/zonas", icon: <FaMapMarkedAlt /> },
  ];

  const linkStyle = ({ isActive }) =>
    `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
      isActive ? "bg-primary text-white fw-semibold" : "text-white"
    }`;

  return (
    <div
      className="bg-dark d-flex flex-column justify-content-between position-fixed"
      style={{ width: "240px", height: "100vh", padding: "1.5rem" }}
    >
      {/* Parte superior */}
      <div>
        <h4 className="text-center fw-bold text-white mb-4">SAFY</h4>
        <ul className="nav flex-column mb-2">
          {navItems.map(({ label, path, icon }) => (
            <li className="nav-item" key={path}>
              <NavLink to={path} className={linkStyle}>
                {icon}
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Configuración abajo */}
      <div>
        <NavLink to="/configuracion" className={linkStyle}>
          <FaCog />
          Configuración
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
