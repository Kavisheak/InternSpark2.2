import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import CompanyNotifications from "./Notification/CompanyNotifications"; // Ensure this component exists

const CompanyNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem("notifications");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            message: "Your post 'Web Developer' is expiring in 3 days.",
            time: "2h ago",
            read: false,
          },
          {
            id: 2,
            message: "5 new applications for 'UI/UX Intern'.",
            time: "5h ago",
            read: false,
          },
          {
            id: 3,
            message: "'Data Analyst Intern' successfully posted.",
            time: "1d ago",
            read: true,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("notifications");

    // Redirect to login
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/company/" },
    { name: "Dashboard", path: "/company/dashboard" },
    { name: "My Internships", path: "/company/internships" },
    { name: "Applications", path: "/company/applications" },
    { name: "My Profile", path: "/company/profile" },
  ];

  return (
    <nav className="sticky top-0 left-0 z-50 w-full text-white bg-[#01165A] shadow-md">
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

          {/* Bell Icon */}
          <li className="relative">
            <button
              className="relative p-1 rounded hover:text-white/80"
              onClick={() => setShowNotifications((prev) => !prev)}
            >
              <FaBell size={18} />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            {showNotifications && (
              <CompanyNotifications
                notifications={notifications}
                setNotifications={setNotifications}
              />
            )}
          </li>

          {/* Logout */}
          <li>
            <button
              onClick={handleLogout}
              className="px-4 py-1 text-sm font-medium text-blue-600 transition bg-white rounded-md hover:bg-blue-100"
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMenu}
          className="text-2xl text-white md:hidden focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="px-6 pb-4 space-y-2 text-white bg-oxfordblue md:hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`block text-sm font-medium transition ${
                  isActive
                    ? "underline underline-offset-4"
                    : "hover:text-white/80"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 mt-2 text-sm font-medium text-blue-900 transition bg-white rounded-md hover:bg-blue-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default CompanyNavbar;
