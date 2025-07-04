// CompanyProfileForm.jsx
import React, { useState } from 'react';
import {
  FaUsers,
  FaMapMarkerAlt,
  FaGlobe,
  FaEnvelope,
  FaInfoCircle,
} from 'react-icons/fa';
import { BsBuildingsFill } from 'react-icons/bs';

const CompanyProfileForm = () => {
  const [formData, setFormData] = useState({
    companyName: 'TechCorp Solutions',
    industry: 'Information Technology',
    companySize: '50-200',
    location: 'San Francisco, CA',
    website: 'https://techcorpsolutions.example',
    email: 'careers@techcorpsolutions.example',
    about: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    console.log('Saved Company Profile!', formData);
    alert('Company profile saved successfully!');
  };

  const fields = [
    { label: 'Company Name', name: 'companyName', type: 'text', placeholder: 'e.g. TechCorp Solutions' },
    { label: 'Industry', name: 'industry', type: 'text', placeholder: 'e.g. Information Technology' },
    { label: 'Company Size', name: 'companySize', type: 'text', placeholder: 'e.g. 50-200' },
    { label: 'Location', name: 'location', type: 'text', placeholder: 'e.g. San Francisco, CA' },
    { label: 'Website', name: 'website', type: 'text', placeholder: 'e.g. https://techcorpsolutions.example' },
    { label: 'Company Email', name: 'email', type: 'email', placeholder: 'e.g. careers@techcorpsolutions.example' },
  ];

  return (
    <div className="p-6 mt-1 profile-bg">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <div className="flex flex-col justify-between min-h-full p-6 overflow-hidden text-white bg-white border border-white shadow-xl bg-opacity-10 rounded-xl">
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center justify-center w-24 h-24 mb-4 text-white border-2 border-white rounded-full shadow-lg">
              <BsBuildingsFill className="text-4xl animate-spin-slow" />
            </div>
            <h2 className="w-full max-w-full text-3xl font-bold text-center break-words">
              {formData.companyName || 'Company Name'}
            </h2>
            <p className="w-full text-xl text-center text-indigo-200 break-words">
              {formData.industry || 'Industry'}
            </p>
          </div>

          <div className="w-full max-w-full space-y-4 break-words text-x">
            <div className="flex items-center max-w-full gap-2 break-words">
              <FaUsers className="text-indigo-300" />
              <span><strong>Size:</strong> {formData.companySize}</span>
            </div>
            <div className="flex items-center max-w-full gap-2 break-words">
              <FaMapMarkerAlt className="text-indigo-300" />
              <span><strong>Location:</strong> {formData.location}</span>
            </div>
            <div className="flex items-center max-w-full gap-2 break-all">
              <FaGlobe className="text-indigo-300" />
              <span>
                <strong>Website:</strong>{' '}
                <a href={formData.website} target="_blank" rel="noreferrer" className="underline">
                  {formData.website}
                </a>
              </span>
            </div>
            <div className="flex items-center max-w-full gap-2 break-all">
              <FaEnvelope className="text-indigo-300" />
              <span><strong>Email:</strong> {formData.email}</span>
            </div>
            <div className="flex items-start max-w-full gap-2 break-words">
              <FaInfoCircle className="mt-1 text-indigo-300" />
              <div>
                <p className="font-semibold">About:</p>
                <p className="whitespace-pre-line">
                  {formData.about || 'No description provided.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="flex flex-col justify-between h-full p-6 text-white border border-gray-300 shadow-md rounded-xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fields.map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-semibold">{label}</label>
                <input
                  type={type}
                  name={name}
                 
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 mt-1 placeholder-gray-400 bg-transparent border border-gray-400 rounded-md focus:ring-indigo-500 focus:ring-2 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Write about your company here..."
              rows="4"
              className="w-full px-3 py-2 mt-1 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-2"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="px-5 py-1 text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileForm;
