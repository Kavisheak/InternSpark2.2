import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CompanyNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'My Internships', path: '/internships' },
    { name: 'Applications', path: '/applications' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b shadow-md backdrop-blur-lg bg-white/10 border-white/20">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Internspark</h1>

        {/* Desktop Nav */}
        <ul className="items-center hidden space-x-6 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`relative text-sm font-medium px-1 pb-1 transition duration-300 ease-in-out ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] w-full transform transition-all duration-300 ease-in-out ${
                      isActive
                        ? 'bg-white scale-x-100'
                        : 'bg-white/50 scale-x-0 group-hover:scale-x-100'
                    }`}
                    style={{ transformOrigin: 'left' }}
                  />
                </Link>
              </li>
            );
          })}
          <li>
            <button className="text-sm font-medium transition text-red-50 hover:text-red-100">
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="text-2xl text-white md:hidden focus:outline-none"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <ul className="px-6 pb-4 space-y-2 bg-white/10 backdrop-blur-lg md:hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 text-sm font-medium transition duration-300 ${
                    isActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          <li>
            <button className="block w-full py-2 text-sm font-medium text-left text-red-400 transition hover:text-red-500">
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default CompanyNavbar;
