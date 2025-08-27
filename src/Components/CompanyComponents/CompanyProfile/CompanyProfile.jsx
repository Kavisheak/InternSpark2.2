import { useState } from "react";
import CompanyProfileForm from "./CompanyProfileForm";
import ContactInfo from "./ContactInfo";
import Footer from "../Footer";

const tabs = [
  { label: "Company Profile", value: "Company Profile" },
  { label: "Contact Info", value: "Contact Info" },
];

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState("Company Profile");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e9ecef] to-[#f3f4f6] flex flex-col">
      <div className="flex flex-col items-center justify-center flex-1 py-10">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-center text-oxfordblue">
            Company Profile
          </h1>
          {/* Tab Switcher */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex overflow-hidden bg-white border rounded-lg shadow-sm border-oxfordblue">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.value}
                  active={activeTab === tab.value}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label}
                </TabButton>
              ))}
            </div>
          </div>
          {/* Tab Content */}
          <div className="w-full p-8 transition-all duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl">
            {activeTab === "Company Profile" ? (
              <CompanyProfileForm />
            ) : (
              <ContactInfo />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 focus:outline-none ${
      active
        ? "bg-oxfordblue text-white"
        : "bg-transparent text-oxfordblue hover:bg-orange-100"
    }`}
    style={{
      borderRight: active ? "none" : "1px solid #002147",
    }}
  >
    {children}
  </button>
);

export default CompanyProfile;
