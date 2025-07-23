import React from "react";
import { FiPlusCircle, FiFileText, FiUser } from "react-icons/fi";

const ForCompanies = () => {
  return (
    <div className="w-screen -mx-6">
      <div className="flex items-center justify-center w-full pt-10 mb-24 pb-14 bg-royalblue">
        <div className="w-full px-6 mx-auto max-w-7xl">
          <h2 className="mb-16 text-4xl font-bold text-center text-white underline decoration-white">
            For Companies
          </h2>
          <div className="grid gap-12 text-center md:grid-cols-3">
            {/* Post Internship Roles */}
            <div>
              <div className="flex items-center justify-center mx-auto mb-6 transition-all duration-500 border-2 border-white rounded-2xl w-28 h-28 hover:rotate-45 hover:scale-105">
                <FiPlusCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Post Internship Roles
              </h3>
              <p className="text-sky-100">
                Create detailed internship listings with role descriptions,
                qualifications, and location.
              </p>
            </div>

            {/* Manage Applications */}
            <div>
              <div className="flex items-center justify-center mx-auto mb-6 transition-all duration-500 border-2 border-white rounded-2xl w-28 h-28 hover:rotate-45 hover:scale-105">
                <FiFileText className="w-12 h-12 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Manage Applications
              </h3>
              <p className="text-sky-100">
                View, filter, and track student applications. Shortlist and
                communicate directly from your dashboard.
              </p>
            </div>

            {/* Company Profile */}
            <div>
              <div className="flex items-center justify-center mx-auto mb-6 transition-all duration-500 border-2 border-white rounded-2xl w-28 h-28 hover:rotate-45 hover:scale-105">
                <FiUser className="w-12 h-12 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Company Profile
              </h3>
              <p className="text-sky-100">
                Customize your company profile to showcase your brand and
                attract quality candidates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForCompanies;
