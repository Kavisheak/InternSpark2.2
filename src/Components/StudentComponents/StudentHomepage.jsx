"use client"

import { Bell, Search, User, Building2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function StudentHomepage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">InternSpark</span>
        </div>

        <nav className="hidden md:flex space-x-8 ml-8">
          <Link to="/internships" className="text-gray-600 hover:text-gray-900 font-medium">Internships</Link>
          <Link to="/applications" className="text-gray-600 hover:text-gray-900 font-medium">Applications</Link>
          <Link to="/bookmarks" className="text-gray-600 hover:text-gray-900 font-medium">Bookmarks</Link>
          <Link to="/profile" className="text-gray-600 hover:text-gray-900 font-medium">Profile</Link>
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <Link to="/notifications" className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-2 -right-2 text-white text-xs bg-purple-600 w-5 h-5 rounded-full flex items-center justify-center">3</span>
          </Link>
          <Link to="/profile" className="text-gray-700 font-medium hover:underline">
            My Profile
          </Link>
          <Link
            to="/companies"
            className="border border-purple-600 text-purple-600 px-4 py-1.5 rounded text-sm hover:bg-purple-50 transition"
          >
            For Companies
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-400 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect Internship
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Start your professional journey with opportunities that match your skills and aspirations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/internships"
              className="border-2 border-white text-white px-8 py-3 text-lg font-medium rounded hover:bg-white hover:text-purple-600 transition"
            >
              Browse Internships
            </Link>
            <Link
              to="/get-started"
              className="bg-white text-purple-600 px-8 py-3 text-lg font-medium rounded hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
            Your Internship Search Made Easy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {/* Feature 1 */}
            <Link to="/smart-search" className="flex flex-col items-center text-center px-4 hover:scale-105 transition">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Search</h3>
              <p className="text-gray-600">
                Find internships that match your skills, interests, and career goals with our intelligent search system.
              </p>
            </Link>

            {/* Feature 2 */}
            <Link to="/profile-matching" className="flex flex-col items-center text-center px-4 hover:scale-105 transition">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <User className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Profile Matching</h3>
              <p className="text-gray-600">
                Get personalized recommendations based on your profile, experience, and preferences.
              </p>
            </Link>

            {/* Feature 3 */}
            <Link to="/top-companies" className="flex flex-col items-center text-center px-4 hover:scale-105 transition">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Building2 className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Top Companies</h3>
              <p className="text-gray-600">
                Connect with leading companies and startups offering exciting internship opportunities.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
