"use client"

import { Bell, Search, User, Building2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function StudentHomepage() {
  return (
    <div className="min-h-screen bg-gray-50 text-blue-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">InternSpark</span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-8 ml-8">
          <Link to="/internships" className="text-gray-600 hover:text-blue-900 font-medium">Internships</Link>
          <Link to="/applications" className="text-gray-600 hover:text-blue-900 font-medium">Applications</Link>
          <Link to="/bookmarks" className="text-gray-600 hover:text-blue-900 font-medium">Bookmarks</Link>
          <Link to="/profile" className="text-gray-600 hover:text-blue-900 font-medium">Profile</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/notifications" className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
          </Link>
          <Link to="/profile" className="hover:underline text-gray-700 font-medium">My Profile</Link>
          <Link to="/companies" className="text-sm border border-purple-600 text-purple-600 px-4 py-1.5 rounded hover:bg-purple-50 transition">
            For Companies
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-400 py-24 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Find Your Perfect Internship</h1>
          <p className="text-xl opacity-90 mb-12 max-w-3xl mx-auto">Start your professional journey with opportunities that match your skills and aspirations.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/internships"
              className="text-white border-white border-2 px-8 py-3 text-lg font-medium rounded hover:bg-white hover:text-purple-600 transition"
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
            {/* Feature: Smart Search */}
            <Link to="/smart-search" className="flex flex-col items-center px-4 text-center hover:scale-105 transition">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Smart Search</h3>
              <p className="text-gray-600">Find internships that match your skills, interests, and career goals with our intelligent search system.</p>
            </Link>

            {/* Feature: Profile Matching */}
            <Link to="/profile-matching" className="flex flex-col items-center px-4 text-center hover:scale-105 transition">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <User className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Profile Matching</h3>
              <p className="text-gray-600">Get personalized recommendations based on your profile, experience, and preferences.</p>
            </Link>

            {/* Feature: Top Companies */}
            <Link to="/top-companies" className="flex flex-col items-center px-4 text-center hover:scale-105 transition">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Building2 className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Top Companies</h3>
              <p className="text-gray-600">Connect with leading companies and startups offering exciting internship opportunities.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
