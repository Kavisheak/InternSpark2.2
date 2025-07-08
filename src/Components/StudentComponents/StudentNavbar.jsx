import { Link } from "react-router-dom"
import { Bell, User } from "lucide-react"

export default function StudentNavbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white text-blue-600 rounded-md flex items-center justify-center font-bold text-sm">
              I
            </div>
            <span className="text-[18px] font-bold text-white tracking-tight">Internspark</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-12 text-sm font-medium text-white">
            <Link
              to="/dashboard"
              className="hover:bg-white/10 px-4 py-2 rounded-md transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/internships"
              className="hover:bg-white/10 px-4 py-2 rounded-md transition-colors"
            >
              My Internships
            </Link>
            <Link
              to="/applications"
              className="bg-white/20 px-4 py-2 rounded-md font-semibold"
            >
              Applications
            </Link>
            <Link
              to="/profile"
              className="hover:bg-white/10 px-4 py-2 rounded-md transition-colors"
            >
              My Profile
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6 text-white text-sm">
            <Link
              to="/notifications"
              className="hover:bg-white/10 p-2 rounded-md transition-colors"
            >
              <Bell className="h-5 w-5" />
            </Link>
            <Link
              to="/profile"
              className="flex items-center hover:bg-white/10 px-3 py-2 rounded-md transition-colors"
            >
              <User className="h-4 w-4 mr-2" />
              My Profile
            </Link>
            <Link
              to="/logout"
              className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium transition-colors flex items-center"
            >
              Logout
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:bg-white/10 p-2 rounded-md">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden bg-black/10">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/dashboard"
            className="block hover:bg-white/10 px-3 py-2 rounded-md text-base font-medium text-white"
          >
            Dashboard
          </Link>
          <Link
            to="/internships"
            className="block hover:bg-white/10 px-3 py-2 rounded-md text-base font-medium text-white"
          >
            My Internships
          </Link>
          <Link
            to="/applications"
            className="block bg-white/20 px-3 py-2 rounded-md text-base font-medium text-white"
          >
            Applications
          </Link>
          <Link
            to="/profile"
            className="block hover:bg-white/10 px-3 py-2 rounded-md text-base font-medium text-white"
          >
            My Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}
