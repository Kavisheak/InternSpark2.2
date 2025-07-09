import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBell } from "react-icons/fa"; // 🔔 Notification Icon

const CompanyNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { name: "Home", path: "/company/" },
    { name: "Dashboard", path: "/company/dashboard" },
    { name: "My Internships", path: "/company/internships" },
    { name: "Applications", path: "/company/applications" },
    { name: "My Profile", path: "/company/profile" },
  ];

  return (
    <nav className="sticky top-0 left-0 z-50 w-full text-white shadow-md bg-royalblue">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">Internspark</h1>

        {/* Desktop Nav */}
        <ul className="items-center hidden space-x-6 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "underline underline-offset-4"
                      : "hover:text-white/80"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}

          {/* 🔔 Notification Icon */}
          <li>
            <button className="relative p-1 rounded hover:text-white/80">
              <FaBell size={18} />
 
            </button>
          </li>

          {/* Logout */}
          <li>
            <button className="px-4 py-1 text-sm font-medium transition bg-white rounded-md text-royalblue hover:bg-red-100">
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="text-2xl text-white md:hidden focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <ul className="px-6 pb-4 space-y-2 bg-[#2128BD] md:hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 text-sm font-medium transition ${
                    isActive
                      ? "underline underline-offset-4"
                      : "hover:text-white/80"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}

    

          {/* Logout */}
          <li>
            <button className="block w-full px-4 py-2 text-sm font-medium text-center text-red-600 transition bg-white rounded-md hover:bg-red-100">
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default CompanyNavbar;
