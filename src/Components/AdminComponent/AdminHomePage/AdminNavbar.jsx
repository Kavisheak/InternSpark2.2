import React, { useState } from "react";
import {
  FaUsersCog,
  FaClipboardList,
  FaCogs,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaTachometerAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "User Management", path: "/admin/usermanage", icon: <FaUsersCog /> },
    { name: "Internship Listings", path: "/admin/internshipmanage", icon: <FaClipboardList /> },
    { name: "System Settings", path: "/admin/settings", icon: <FaCogs /> },
  ];

  return (
    <nav className="bg-red-700 w-full mb-10 sticky top-0 z-50">
      <header className="flex justify-between items-center px-6 py-4 text-white">
        <div className="text-2xl font-bold">
          <span className="text-black">Intern</span>Spark Admin
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium transition ${
                    isActive ? "underline underline-offset-4" : "hover:text-gray-300"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/admin/logout"
              className="flex items-center gap-2 text-black hover:underline"
            >
              <FaSignOutAlt />
              Logout
            </NavLink>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-6 pb-4 flex flex-col space-y-3 text-white">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-medium transition ${
                  isActive ? "underline underline-offset-4" : "hover:text-gray-300"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
          <NavLink
            to="/admin/logout"
            className="flex items-center gap-2 text-red-500 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            <FaSignOutAlt />
            Logout
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
