import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { toast } from "react-hot-toast";
import CompanyNotifications from "./Notification/CompanyNotifications"; // Make sure this exists

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

  useEffect(() => {
    // Fetch notifications from backend
    fetch("http://localhost/InternBackend/company/api/get_company_notifications.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.notifications)) {
          setNotifications(data.notifications.map((n, i) => ({
            id: i + 1,
            message: n.message,
            time: n.time,
            read: false,
          })));
        }
      });
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const confirmLogout = () => {
    toast(
      (t) => (
        <div className="p-3">
          <p className="mb-2 font-semibold text-white">Are you sure you want to logout?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleLogout();
              }}
              className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      ),
      { duration: 8000 }
    );
  };

  const handleLogout = () => {
    // Call backend to destroy session
    fetch("http://localhost/InternBackend/api/logout.php", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("notifications");
    toast.success(" Logged out successfully!");
    setTimeout(() => navigate("/"), 1000);
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
              onClick={confirmLogout}
              className="px-4 py-1 text-sm font-medium text-blue-600 transition bg-white rounded-md hover:bg-blue-100"
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Toggle */}
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

          <button
            onClick={confirmLogout}
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
