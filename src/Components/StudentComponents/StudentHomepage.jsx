"use client"

import { Search, User, Building2 } from "lucide-react"
import { Link } from "react-router-dom"



export default function StudentHomepage() {
  return (
    <div className="min-h-screen text-oxfordblue bg-gray-50 fade-in-up">
      {/* Header */}
      

      {/* Hero Section */}
      <section
        className="relative px-4 text-white bg-center bg-cover py-28 "
        style={{
          backgroundImage: `url("https://i.pinimg.com/736x/b0/5d/f6/b05df6e4eb2d80d5173bcf5916547073.jpg")`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#031B4E] bg-opacity-80"></div>

        {/* Text content on top */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Find Your Perfect Internship
          </h1>
          <p className="max-w-3xl mx-auto mb-12 text-xl opacity-90">
            Start your professional journey with opportunities that match your skills and aspirations.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="internships"
<<<<<<< HEAD
              className="px-8 py-3 text-lg font-medium text-white transition border-2 border-white rounded hover:bg-white hover:text-royalblue"
=======
              className="px-8 py-3 text-lg font-medium text-white transition border-2 border-white rounded hover:bg-white animate-pulse hover:text-oxfordblue"
>>>>>>> fe76ef5e7d7175093fd31a4ebbc64e88adf857c6
            >
              Browse Internships
            </Link>
            <Link
              to="studentProfile"
              className="px-8 py-3 text-lg font-medium text-white transition bg-orange-500 rounded hover:bg-orange-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="mb-16 text-3xl font-bold text-oxfordblue md:text-4xl">
            Your Internship Search Made Easy
          </h2>
          <div className="grid max-w-4xl grid-cols-1 gap-12 mx-auto md:grid-cols-3">
            {/* Feature: Smart Search */}
            <Link to="" className="flex flex-col items-center px-4 text-center transition hover:scale-105">
              <div className="flex items-center justify-center w-20 h-20 mb-6 bg-orange-200 rounded-full">
                <Search className="w-10 h-10 text-orange-700" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#031B4E]">Smart Search</h3>
              <p className="text-gray-600">Find internships that match your skills, interests, and career goals with our intelligent search system.</p>
            </Link>

            {/* Feature: Profile Matching */}
            <Link to="" className="flex flex-col items-center px-4 text-center transition hover:scale-105">
              <div className="flex items-center justify-center w-20 h-20 mb-6 bg-orange-200 rounded-full">
                <User className="w-10 h-10 text-orange-700" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#031B4E]">Profile Matching</h3>
              <p className="text-gray-600">Get personalized recommendations based on your profile, experience, and preferences.</p>
            </Link>

            {/* Feature: Top Companies */}
            <Link to="" className="flex flex-col items-center px-4 text-center transition hover:scale-105">
              <div className="flex items-center justify-center w-20 h-20 mb-6 bg-orange-200 rounded-full">
                <Building2 className="w-10 h-10 text-orange-700" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#031B4E]">Top Companies</h3>
              <p className="text-gray-600">Connect with leading companies and startups offering exciting internship opportunities.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}