import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { toast } from "react-hot-toast";
import CompanyNotifications from "./Notification/CompanyNotifications";
import axios from "axios";

const API_BASE = "http://localhost/InternBackend/company/api";

const CompanyNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const notificationsRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get_company_notifications.php`, {
        withCredentials: true,
      });
      if (res.data.success && Array.isArray(res.data.notifications)) {
        setNotifications(res.data.notifications);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      // Close dropdown if clicked outside
      if (!event.target.closest(".dropdown-parent")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost/InternBackend/api/logout.php?action=logout", {}, { withCredentials: true });
      localStorage.clear();
      toast.success("Logged out successfully!");
      navigate("/", { replace: true });
      setTimeout(() => window.location.reload(), 800);
    } catch (err) {
      toast.error("Logout failed", err);
    }
  };

  const confirmLogout = () => {
    toast.dismiss("logout-confirm-c");
    toast((t) => (
      <div className="p-3">
        <p className="mb-2 font-semibold text-white">
          Are you sure you want to logout?
        </p>
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
    ), { id: "logout-confirm-c", duration: 8000 });
  };

  const markNotificationsAsRead = async () => {
    try {
      await axios.post(`${API_BASE}/markAsRead.php`, {}, { withCredentials: true });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  // Dropdown nav items
  const navItems = [
    { name: "Home", path: "/company/" },
    { name: "Dashboard", path: "/company/dashboard" },
    { name: "My Internships", path: "/company/internships" },
    { name: "Applications", path: "/company/applications" },
    {
      name: "Interview",
      path: "/company/interview",
      dropdown: [
        { name: "Schedule Interview", path: "/company/schedule-interview" },
        { name: "Update Interview Status", path: "/company/update-interview-status" },
      ],
    },
    { name: "My Profile", path: "/company/profile" },
  ];

  return (
    <nav className="sticky top-0 left-0 z-50 w-full text-white bg-[#01165A] shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">Internspark</h1>
        <ul className="items-center hidden space-x-6 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            if (item.dropdown) {
              return (
                <li key={item.name} className="relative dropdown-parent">
                  <button
                    type="button"
                    className={`text-sm font-medium cursor-pointer transition ${
                      isActive ? "underline underline-offset-4" : "hover:text-white/80"
                    }`}
                    onClick={() =>
                      setActiveDropdown(activeDropdown === item.name ? null : item.name)
                    }
                  >
                    {item.name}
                  </button>
                  <div
                    className={`absolute left-0 z-10 w-56 py-2 mt-2 bg-white rounded shadow-lg ${
                      activeDropdown === item.name ? "block" : "hidden"
                    }`}
                  >
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block px-4 py-2 text-sm text-[#01165A] hover:bg-blue-50 hover:text-blue-700"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </li>
              );
            }
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`text-sm font-medium transition ${
                    isActive ? "underline underline-offset-4" : "hover:text-white/80"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          <li className="relative" ref={notificationsRef}>
            <button
              className="relative p-1 rounded hover:text-white/80"
              onClick={() => {
                setShowNotifications((prev) => !prev);
                markNotificationsAsRead();
              }}
            >
              <FaBell size={18} />
              {notifications.some((n) => parseInt(n.seen) === 0) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            {showNotifications && (
              <CompanyNotifications
                notifications={notifications}
                setNotifications={setNotifications}
                fetchNotifications={fetchNotifications}
              />
            )}
          </li>
          <li>
            <button
              onClick={confirmLogout}
              className="px-4 py-1 text-sm font-medium text-blue-600 transition bg-white rounded-md hover:bg-blue-100"
            >
              Logout
            </button>
          </li>
        </ul>
        <button
          onClick={toggleMenu}
          className="text-2xl text-white md:hidden focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div className="px-6 pb-4 space-y-2 text-white bg-oxfordblue md:hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            if (item.dropdown) {
              return (
                <div key={item.name} className="mb-2">
                  <span className="block text-sm font-medium">{item.name}</span>
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      className="block px-4 py-2 text-sm text-[#01165A] bg-white rounded hover:bg-blue-50 hover:text-blue-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              );
            }
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`block text-sm font-medium transition ${
                  isActive ? "underline underline-offset-4" : "hover:text-white/80"
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