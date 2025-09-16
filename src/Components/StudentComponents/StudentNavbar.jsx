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
  const [activeDropdown, setActiveDropdown] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const notificationsRef = useRef(null);

  const fetchNotifications = () => {
    axios
      .get("http://localhost/InternBackend/students/api/get_notifications.php", {
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

    const interval = setInterval(fetchAndCheck, 60000);
    return () => clearInterval(interval);
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
    {
      name: "Interviews",
      path: "/student/interviews",
      dropdown: [
        { name: "My Interviews", path: "/student/interviews" },
        { name: "Interview Process", path: "/student/interview-process" },
      ],
    },
    { name: "My Profile", path: "/student/studentprofile" },
  ];

  const isActive = (path) => location.pathname === path;

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
    toast.dismiss("logout-confirm");
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
    ), { id: "logout-confirm" });
  };

  return (
    <nav className="sticky top-0 left-0 z-50 w-full text-white shadow-md bg-oxfordblue">
      <div className="flex items-center justify-between px-4 py-5">
        <Link to="/" className="text-xl font-bold">
          Internspark
        </Link>
        <ul className="items-center hidden space-x-6 text-sm font-medium md:flex">
          {navItems.map((item) => {
            if (item.dropdown) {
              return (
                <li key={item.name} className="relative dropdown-parent">
                  <button
                    type="button"
                    className={`transition text-sm font-medium ${
                      isActive(item.path)
                        ? "underline underline-offset-4"
                        : "hover:text-white/80"
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
                  className={`transition text-sm font-medium ${
                    isActive(item.path)
                      ? "underline underline-offset-4"
                      : "hover:text-white/80"
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
          <li>
            <button
              onClick={confirmLogout}
              className="px-4 py-1 transition bg-white rounded-md text-royalblue hover:bg-blue-100"
            >
              Logout
            </button>
          </li>
        </ul>
        <button
          onClick={toggleMenu}
          className="text-2xl text-white md:hidden focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {menuOpen && (
        <ul className="px-6 pb-4 space-y-2 text-base font-medium bg-oxfordblue md:hidden">
          {navItems.map((item) => {
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
                onClick={() => setMenuOpen(false)}
                className={`block py-2 transition text-sm font-medium ${
                  isActive(item.path)
                    ? "underline underline-offset-4"
                    : "hover:text-white/80"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
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
