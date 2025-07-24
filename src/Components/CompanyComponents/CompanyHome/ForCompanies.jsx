import { FiPlusCircle, FiFileText, FiUser } from "react-icons/fi";

const ForCompanies = () => {
  return (
    <div className="w-full py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <h2 className="mb-16 text-4xl font-bold text-center text-oxfordblue">
          For Companies
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {/* Post Internship Roles */}
          <div className="overflow-hidden transition-transform duration-300 transform bg-white shadow-xl rounded-2xl hover:-translate-y-2 hover:shadow-2xl">
            <img
              src={"https://i.pinimg.com/736x/c7/24/a5/c724a525848f3a4028fde9e0aad015cb.jpg"}
              alt="Post Internship"
              className="object-cover w-full h-48"
            />
            <div className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <FiPlusCircle className="w-10 h-10 text-oxfordblue" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-oxfordblue">
                Post Internship Roles
              </h3>
              <p className="text-gray-600">
                Create detailed internship listings with role descriptions,
                qualifications, and location.
              </p>
            </div>
          </div>

          {/* Manage Applications */}
          <div className="overflow-hidden transition-transform duration-300 transform bg-white shadow-xl rounded-2xl hover:-translate-y-2 hover:shadow-2xl">
            <img
              src={"https://i.pinimg.com/1200x/51/4c/55/514c55eb79e9ae00128de1e537b7562d.jpg"}
              alt="Manage Applications"
              className="object-cover w-full h-48"
            />
            <div className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <FiFileText className="w-10 h-10 text-oxfordblue" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-oxfordblue">
                Manage Applications
              </h3>
              <p className="text-gray-600">
                View, filter, and track student applications. Shortlist and
                communicate directly from your dashboard.
              </p>
            </div>
          </div>

          {/* Company Profile */}
          <div className="overflow-hidden transition-transform duration-300 transform bg-white shadow-xl rounded-2xl hover:-translate-y-2 hover:shadow-2xl">
            <img
              src={"https://i.pinimg.com/1200x/bc/a6/a2/bca6a2f116903f52a92c6213d833be06.jpg"}
              alt="Company Profile"
              className="object-cover w-full h-48"
            />
            <div className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <FiUser className="w-10 h-10 text-oxfordblue" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-oxfordblue">
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
    </div>
  );
};

export default ForCompanies;
