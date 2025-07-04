import React, { useState } from "react";
import {
  FiCalendar,
  FiEdit,
  FiTrash,
  FiSearch,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CompanyNavbar from "./CompanyNavbar";
import ListofInternships from "./ListofInternships";
import Footer from "./Footer";

export default function CompanyMyInternships() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white ">
      <CompanyNavbar />
      <div className="flex items-center justify-center px-4 bg-gray-100">
        <div className="relative z-10 max-w-2xl p-10 text-center backdrop-blur-md rounded-2xl">
          <h1 className="text-5xl font-bold sm:text-6xl text-[#2128BD]">
            Post New Internships
          </h1>
          <h2 className="mt-2 text-3xl font-extrabold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700">
            Reach Talented Students Instantly
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            Share internship opportunities with thousands of students and grow
            your future team today.
          </p>
        </div>
      </div>

      <div className="min-h-screen p-6 text-gray-900 bg-transparent md:p-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-9">
          <h1 className="ml-4 text-2xl font-bold text-royalblue">Manage Internships</h1>
          <div className="flex items-center mr-4 space-x-5">
            <div className="flex items-center px-2 py-2 bg-gray-100 rounded-lg w-96">
              <FiSearch className="mr-2 text-gray-900" />
              <input
                type="text"
                placeholder="Search by title or internship name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none"
              />
            </div>

            <button
              className="px-4 py-1.5 font-semibold transition border rounded hover:bg-royalblue hover:text-white"
              onClick={() => navigate("/company/postinternship")}
            >
              + Post New
            </button>
          </div>
        </div>

        {/* List of internships */}
        <ListofInternships searchTerm={searchTerm} />
      </div>
      <Footer />
    </div>
  );
}
