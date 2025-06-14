import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function CompanyNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Internships", path: "/my-internships" },
    { name: "Applications", path: "/applications" },
    { name: "Profile", path: "/profile" },
  ];

  const handleLogout = () => {
    // Handle your logout here
    console.log("Logging out...");
    // e.g.: clear auth, navigate to login, etc.
  };
  
  return (
    <nav className="p-4 text-gray-200 bg-gray-900">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        {/* Logo or Title */}
        <Link to="/" className="text-2xl font-semibold">
          MyApp
        </Link>

        {/* Menu button (Mobile) */}
        <button
          aria-label="Toggle Menu"
          onClick={() => setIsOpen((prev) => !prev)}
          className="ml-4 text-gray-200 md:hidden"
        >
          {/* Hamburg icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#ffffff"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Menu Links */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0`}
        >
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                   isActive ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {/* Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className="px-3 py-1 ml-0 transition duration-300 bg-red-500 rounded-md hover:bg-red-600 md:ml-4"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default CompanyNavbar;
