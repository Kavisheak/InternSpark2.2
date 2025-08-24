import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";
import StudentNotifications from "./StudentNotifications";

const StudentNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const notificationsRef = useRef(null);

  const fetchNotifications = () => {
    axios
      .get("http://localhost/InternBackend/students/api/get_company_notifications.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          const fixed = res.data.notifications.map((n) => ({
            ...n,
            seen: Number(n.seen),
          }));
          setNotifications(fixed);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch notifications:", err);
        // Optionally show a toast or alert
      });
  };

  useEffect(() => {
    const fetchAndCheck = async () => {
      try {
        await axios.get(
          "http://localhost/InternBackend/students/api/check_bookmark_deadlines.php",
          { withCredentials: true }
        );
        await axios.get(
          "http://localhost/InternBackend/students/api/check_student_reports.php",
          { withCredentials: true }
        );
        fetchNotifications();
      } catch (err) {
        console.error(err);
      }
    };

    fetchAndCheck();

    const interval = setInterval(fetchAndCheck, 60000); // auto-check every 1 min
    return () => clearInterval(interval);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { name: "Home", path: "/student" },
    { name: "Internships", path: "/student/internships" },
    { name: "My Applications", path: "/student/applications" },
    { name: "Bookmarks", path: "/student/bookmarks" },
    { name: "My Profile", path: "/student/studentprofile" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    fetch("http://localhost/InternBackend/api/logout.php", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("studentNotifications");
    toast.success(" Logged out successfully!");
    setTimeout(() => navigate("/"), 1000);
  };

  const confirmLogout = () => {
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
    ));
  };

  return (
    <nav className="sticky top-0 left-0 z-50 w-full text-white shadow-md bg-oxfordblue">
      <div className="flex items-center justify-between px-4 py-5">
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
          <li className="relative" ref={notificationsRef}>
            <button
              className="relative p-1 rounded hover:text-white/80"
              onClick={() => setShowNotifications((prev) => !prev)}
            >
              <FaBell size={18} />
              {notifications.some((n) => !n.seen) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            {showNotifications && (
              <StudentNotifications
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
              className="px-4 py-1 transition bg-white rounded-md text-royalblue hover:bg-blue-100"
            >
              Logout
            </button>
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
        <ul className="px-6 pb-4 space-y-2 text-base font-medium bg-oxfordblue md:hidden">
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

          <li ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="block py-2 hover:text-white/80"
            >
              Notifications
            </button>
            {showNotifications && (
              <StudentNotifications
                notifications={notifications}
                setNotifications={setNotifications}
                fetchNotifications={fetchNotifications}
              />
            )}
          </li>

          <li>
            <button
              onClick={() => {
                setMenuOpen(false);
                confirmLogout();
              }}
              className="block w-full px-4 py-2 text-center text-red-600 bg-white rounded-md hover:bg-blue-100"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default StudentNavbar;
