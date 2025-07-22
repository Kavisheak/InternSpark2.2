import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";

const StudentNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

 const navItems = [
  { name: "Home", path: "/student" },
  { name: "Internships", path: "/student/internships" },
  { name: "Applications", path: "/student/applications" },
  { name: "Bookmarks", path: "/student/bookmarks" },
  { name: "My Profile", path: "/student/studentprofile" },
];


  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 left-0 z-50 w-full text-white shadow-md bg-royalblue">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Internspark
        </Link>

        {/* Desktop Nav */}
        <ul className="items-center hidden space-x-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`transition ${
                  isActive(item.path)
                    ? "underline underline-offset-4"
                    : "hover:text-white/80"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}

          {/* Notification */}
          <li>
            <Link
              to="/notifications"
              className="p-1 rounded hover:text-white/80"
              aria-label="Notifications"
            >
              <FaBell size={18} />
            </Link>
          </li>

          {/* Logout */}
          <li>
            <Link
              to="/logout"
              className="px-4 py-1 transition bg-white rounded-md text-royalblue hover:bg-red-100"
            >
              Logout
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-2xl text-white md:hidden focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <ul className="px-6 pb-4 space-y-2 bg-[#2128BD] md:hidden text-base font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 transition ${
                  isActive(item.path)
                    ? "underline underline-offset-4"
                    : "hover:text-white/80"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}

          <li>
            <Link
              to="/notifications"
              onClick={() => setMenuOpen(false)}
              className="block py-2 hover:text-white/80"
            >
              Notifications
            </Link>
          </li>

          <li>
            <Link
              to="/logout"
              onClick={() => setMenuOpen(false)}
              className="block w-full px-4 py-2 text-center text-red-600 bg-white rounded-md hover:bg-red-100"
            >
              Logout
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default StudentNavbar;