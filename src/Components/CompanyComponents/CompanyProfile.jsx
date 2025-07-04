// CompanyProfile.jsx
import React, { useState } from 'react';
import CompanyNavbar from './CompanyNavbar';
import CompanyProfileForm from './CompanyProfileForm';
import ContactInfo from './ContactInfo';
import './Company.css';

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState('Company Profile');

  return (
    <div className="min-h-screen profile-bg">
      <CompanyNavbar />
      <div className="flex flex-col p-4 bg-transparent">
        <h1 className="mb-6 ml-6 text-3xl font-bold text-white">Company Profile</h1>

        {/* Tab Switcher */}
        <div className="max-w-md ml-6">
          <div className="flex">
            <OutlineButton
              text="Company Profile"
              active={activeTab === 'Company Profile'}
              onClick={() => setActiveTab('Company Profile')}
            />
            <OutlineButton
              text="Contact Info"
              active={activeTab === 'Contact Info'}
              onClick={() => setActiveTab('Contact Info')}
            />
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4 ml-0">
          {activeTab === 'Company Profile' ? <CompanyProfileForm /> : <ContactInfo />}
        </div>
      </div>
    </div>
  );
};

const OutlineButton = ({ text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 px-2 py-1 border transition duration-300 ${
      active
        ? 'bg-white text-black border-white'
        : 'bg-opacity-10 text-white hover:bg-black hover:text-white cursor-pointer'
    } ${text === 'Company Profile' ? 'rounded-l-md' : 'rounded-r-md'} focus:outline-none`}
    style={{ minWidth: '120px' }}
  >
    {text}
  </button>
);

export default CompanyProfile;
