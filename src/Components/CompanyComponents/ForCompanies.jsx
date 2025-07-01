import React from 'react';

const ForCompanies = () => {
  return (
    <div className="flex items-center justify-center bg-white py-28 h-5/6"
    >
      <div className="w-full px-6 mx-auto max-w-7xl">
        <h2 className="mb-12 text-4xl font-bold text-center text-gray-800">
          For Companies
        </h2>
        <div className="grid gap-12 text-center md:grid-cols-3">
          {/* Post Internship Opportunities */}
          <div>
            <div className="flex items-center justify-center mx-auto mb-6 border-2 border-blue-500 rounded-full w-28 h-28">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-blue-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-xl font-semibold text-black">
              Post Internship Roles
            </h3>
            <p className="text-gray-600">
              Create detailed internship listings with role descriptions,
              qualifications, and location.
            </p>
          </div>

          {/* Manage Applications */}
          <div>
            <div className="flex items-center justify-center mx-auto mb-6 border-2 border-blue-500 rounded-full w-28 h-28">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-blue-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2v-5a2 2 0 00-2-2h-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-xl font-semibold text-black">
              Manage Applications
            </h3>
            <p className="text-gray-600">
              View, filter, and track student applications. Shortlist and
              communicate directly from your dashboard.
            </p>
          </div>

          {/* Company Profile Management */}
          <div>
            <div className="flex items-center justify-center mx-auto mb-6 border-2 border-blue-500 rounded-full w-28 h-28">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-blue-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c1.1046 0 2-.8954 2-2s-.8954-2-2-2-2 .8954-2 2 .8954 2 2 2zm0 2c-1.1046 0-2 .8954-2 2v1h4v-1c0-1.1046-.8954-2-2-2zm8-2a8 8 0 11-16 0 8 8 0 0116 0z"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-xl font-semibold text-black">
              Company Profile
            </h3>
            <p className="text-gray-600">
              Customize your company profile to showcase your brand and
              attract quality candidates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForCompanies;
