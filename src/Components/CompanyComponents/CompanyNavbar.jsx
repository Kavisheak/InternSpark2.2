import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CompanyNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { name: 'Home', path: '/company/' },
    { name: 'Dashboard', path: '/company/dashboard' },
    { name: 'My Internships', path: '/company/internships' },
    { name: 'Applications', path: '/company/applications' },
    { name: 'My Profile', path: '/company/profile' },
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
                    isActive ? 'underline underline-offset-4' : 'hover:text-white/80'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          <li>
            <button className="text-sm font-medium text-red-200 transition hover:text-red-300">
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="text-2xl text-white md:hidden focus:outline-none"
        >
          {menuOpen ? '✕' : '☰'}
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
                    isActive ? 'underline underline-offset-4' : 'hover:text-white/80'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          <li>
            <button className="block w-full py-2 text-sm font-medium text-left text-red-200 hover:text-red-300">
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default CompanyNavbar;
