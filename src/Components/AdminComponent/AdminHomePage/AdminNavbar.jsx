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
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "User Management", path: "/admin/usermanage", icon: <FaUsersCog /> },
    { name: "Internship Listings", path: "/admin/internshipmanage", icon: <FaClipboardList /> },
    { name: "System Settings", path: "/admin/settings", icon: <FaCogs /> },
  ];

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

  const confirmLogout = () => {
    toast((t) => (
      <div className="p-3">
        <p className="mb-2 font-semibold text-black">
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
    <nav className="sticky top-0 z-50 w-full mb-10 bg-orange-500">
      <header className="flex items-center justify-between px-6 py-4 text-white">
        <div className="text-2xl font-bold">
          <span className="text-black">Intern</span>Spark Admin
        </div>

        {/* Desktop Menu */}
        <ul className="items-center hidden space-x-6 md:flex">
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
            <button
              onClick={confirmLogout}
              className="flex items-center gap-2 text-black hover:underline"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col px-6 pb-4 space-y-3 text-white bg-blue-700 md:hidden">
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
          <button
            onClick={() => {
              setMenuOpen(false);
              confirmLogout();
            }}
            className="flex items-center gap-2 text-red-500 hover:underline"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;