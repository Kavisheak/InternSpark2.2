"use client"

import {  Search, User, Building2 } from "lucide-react"
import { Link } from "react-router-dom"


export default function StudentHomepage() {
  return (
    <div className="min-h-screen text-blue-900 bg-gray-50">
      {/* Header */}
     
     
      {/* Hero Section */}
      <section className="px-4 py-24 text-white bg-royalblue">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">Find Your Perfect Internship</h1>
          <p className="max-w-3xl mx-auto mb-12 text-xl opacity-90">Start your professional journey with opportunities that match your skills and aspirations.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="internships"
              className="px-8 py-3 text-lg font-medium text-white transition border-2 border-white rounded hover:bg-white hover:text-royalblue"
            >
              Browse Internships
            </Link>
            <Link
              to="/get-started"
              className="px-8 py-3 text-lg font-medium transition bg-white rounded text-royalblue hover:bg-gray-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="mb-16 text-3xl font-bold text-gray-900 md:text-4xl">
            Your Internship Search Made Easy
          </h2>
          <div className="grid max-w-4xl grid-cols-1 gap-12 mx-auto md:grid-cols-3">
            {/* Feature: Smart Search */}
            <Link to="/smart-search" className="flex flex-col items-center px-4 text-center transition hover:scale-105">
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-sky-100">
                <Search className="w-10 h-10 text-royalblue" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Smart Search</h3>
              <p className="text-gray-600">Find internships that match your skills, interests, and career goals with our intelligent search system.</p>
            </Link>

            {/* Feature: Profile Matching */}
            <Link to="/profile-matching" className="flex flex-col items-center px-4 text-center transition hover:scale-105">
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-sky-100">
                <User className="w-10 h-10 text-royalblue" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Profile Matching</h3>
              <p className="text-gray-600">Get personalized recommendations based on your profile, experience, and preferences.</p>
            </Link>

            {/* Feature: Top Companies */}
            <Link to="/top-companies" className="flex flex-col items-center px-4 text-center transition hover:scale-105">
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-sky-100">
                <Building2 className="w-10 h-10 text-royalblue" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Top Companies</h3>
              <p className="text-gray-600">Connect with leading companies and startups offering exciting internship opportunities.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
