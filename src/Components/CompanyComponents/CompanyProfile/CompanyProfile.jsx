import { useState } from "react";

import CompanyNavbar from "../CompanyNavbar";
import CompanyProfileForm from "./CompanyProfileForm";
import ContactInfo from "./ContactInfo";

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState("Company Profile");

  return (
    <div className="min-h-screen bg-white">
      <CompanyNavbar />
      <div className="flex flex-col p-4 text-gray-800 fade-in-up">
        <h1 className="mb-6 ml-6 text-3xl font-extrabold text-oxfordblue">
          Company Profile
        </h1>

        {/* Tab Switcher */}
        <div className="max-w-md ml-6">
          <div className="flex overflow-hidden border rounded-md border-oxfordblue">
            <OutlineButton
              text="Company Profile"
              active={activeTab === "Company Profile"}
              onClick={() => setActiveTab("Company Profile")}
            />
            <OutlineButton
              text="Contact Info"
              active={activeTab === "Contact Info"}
              onClick={() => setActiveTab("Contact Info")}
            />
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full p-4 mt-4 ml-6 bg-white border border-gray-200 rounded-md shadow-md md:w-3/4">
          {activeTab === "Company Profile" ? (
            <CompanyProfileForm />
          ) : (
            <ContactInfo />
          )}
        </div>
      </div>
    </div>
  );
};

const OutlineButton = ({ text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 px-4 py-2 text-sm font-semibold transition duration-300 focus:outline-none ${
      active
        ? "bg-oxfordblue text-white"
        : "bg-transparent text-oxfordblue hover:bg-orange-100"
    }`}
  >
    {text}
  </button>
);

export default CompanyProfile;
