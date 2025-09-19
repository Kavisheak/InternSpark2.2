import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { ChevronDown } from "lucide-react";
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
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  // Fetch notifications
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
      await axios.post(
        "http://localhost/InternBackend/api/logout.php?action=logout",
        {},
        { withCredentials: true }
      );
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
    toast(
      (t) => (
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
      ),
      { id: "logout-confirm-c", duration: 8000 }
    );
  };

  const markNotificationsAsRead = async () => {
    try {
      await axios.post(`${API_BASE}/markAsRead.php`, {}, { withCredentials: true });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  // Navbar links
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
    {
      name: "Mentor Management",
      path: "/company/mentor-management/add",
      dropdown: [
        { name: "Add New Mentors", path: "/company/mentor-management/add" },
        { name: "Allocate Mentors", path: "/company/mentor-management/allocate" },
      ],
    },
    { name: "My Profile", path: "/company/profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#01165A] shadow-md">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Brand */}
        <h1 className="text-2xl font-bold text-white">Internspark</h1>

        {/* Desktop Menu */}
        <ul className="items-center hidden space-x-6 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            if (item.dropdown) {
              return (
                <li key={item.name} className="relative dropdown-parent">
                  <button
                    type="button"
                    className={`flex items-center gap-1 text-sm font-medium transition ${
                      isActive
                        ? "text-white underline underline-offset-4"
                        : "text-white hover:text-gray-300"
                    }`}
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === item.name ? null : item.name
                      )
                    }
                  >
                    {item.name}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {/* Dropdown */}
                  <div
                    className={`absolute left-0 mt-2 w-56 bg-white border rounded-lg shadow-lg overflow-hidden ${
                      activeDropdown === item.name ? "block" : "hidden"
                    }`}
                  >
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#01165A]/10 hover:text-[#01165A]"
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
                    isActive
                      ? "text-white underline underline-offset-4"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}

          {/* Notifications */}
          <li className="relative" ref={notificationsRef}>
            <button
              className="relative p-1 text-white hover:text-[#F97316]"
              onClick={() => {
                setShowNotifications((prev) => !prev);
                markNotificationsAsRead();
              }}
            >
              <FaBell size={18} />
              {notifications.some((n) => parseInt(n.seen) === 0) && (
                <span className="absolute flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full -top-1 -right-1">
                  {notifications.filter((n) => parseInt(n.seen) === 0).length}
                </span>
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

          {/* Logout */}
          <li>
            <button
              onClick={confirmLogout}
              className="px-4 py-1 text-sm font-medium text-white transition rounded-md bg-[#F97316] hover:bg-[#ea580c]"
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="text-2xl text-white md:hidden focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="px-6 pb-4 space-y-2 bg-[#01165A] md:hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            if (item.dropdown) {
              return (
                <div key={item.name} className="mb-2">
                  <button
                    onClick={() =>
                      setActiveMobileDropdown(
                        activeMobileDropdown === item.name ? null : item.name
                      )
                    }
                    className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-white hover:text-[#F97316]"
                  >
                    {item.name}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        activeMobileDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeMobileDropdown === item.name && (
                    <div className="mt-1 ml-4 space-y-1">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block px-3 py-2 text-sm text-white bg-[#01165A] rounded hover:bg-[#F97316]/20 hover:text-gray-300"
                          onClick={() => {
                            setMenuOpen(false);
                            setActiveMobileDropdown(null);
                          }}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-2 py-2 text-sm font-medium ${
                  isActive
                    ? "text-white underline underline-offset-4"
                    : "text-white hover:text-gray-300"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}

          <button
            onClick={confirmLogout}
            className="w-full px-4 py-2 mt-2 text-sm font-medium text-white transition rounded-md bg-[#F97316] hover:bg-[#ea580c]"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default CompanyNavbar;
