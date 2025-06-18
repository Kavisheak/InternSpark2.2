import React, { useState } from 'react';
import {
  FaIndustry,
  FaUsers,
  FaMapMarkerAlt,
  FaGlobe,
  FaEnvelope,
  FaInfoCircle,
} from 'react-icons/fa';
import { BsBuildingsFill } from 'react-icons/bs';

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState('Company Profile');

  return (
    <div className="flex flex-col p-4 bg-transparent">
      <h1 className='mb-6 ml-6 text-3xl font-bold text-white'>Company Profile</h1>
      <div className="max-w-md">
        <div className="flex ml-6">
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
      <div className='ml-0'>{activeTab === 'Company Profile' ? <CompanyProfileForm /> : <ContactInfoForm />}</div>
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

const CompanyProfileForm = () => {
  const [formData, setFormData] = useState({ companyName:'TechCorp Solutions', industry:'Information Technology', companySize:'50-200', location:'San Francisco, CA', website:'https://techcorpsolutions.example', email:'careers@techcorpsolutions.example', about:'' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    console.log('Saved Company Profile!', formData);
    alert('Company profile saved successfully!');
  };

  const fields = [
    { label:'Company Name', name:'companyName', type:'text', placeholder:'e.g. TechCorp Solutions' },
    { label:'Industry', name:'industry', type:'text', placeholder:'e.g. Information Technology' },
    { label:'Company Size', name:'companySize', type:'text', placeholder:'e.g. 50-200' },
    { label:'Location', name:'location', type:'text', placeholder:'e.g. San Francisco, CA' },
    { label:'Website', name:'website', type:'text', placeholder:'e.g. https://techcorpsolutions.example' },
    { label:'Company Email', name:'email', type:'email', placeholder:'e.g. careers@techcorpsolutions.example' },
  ];

  return (
    <div className="p-6 mt-1">
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
              <span className="w-full max-w-full break-words"><strong>Size:</strong> {formData.companySize}</span>
            </div>
            <div className="flex items-center max-w-full gap-2 break-words">
              <FaMapMarkerAlt className="text-indigo-300" />
              <span className="w-full max-w-full break-words"><strong>Location:</strong> {formData.location}</span>
            </div>
            <div className="flex items-center max-w-full gap-2 break-all">
              <FaGlobe className="text-indigo-300" />
              <span className="w-full max-w-full break-all">
                <strong>Website:</strong> <a
                   href={formData.website}
                   target="_blank"
                   rel="noreferrer"
                   className="underline"
                 >{formData.website}</a>
              </span>
            </div>
            <div className="flex items-center max-w-full gap-2 break-all">
              <FaEnvelope className="text-indigo-300" />
              <span className="w-full max-w-full break-all"><strong>Email:</strong> {formData.email}</span>
            </div>
            <div className="flex items-start max-w-full gap-2 break-words">
              <FaInfoCircle className="mt-1 text-indigo-300" />
              <div className="w-full break-words">
                <p className="font-semibold">About:</p>
                <p className="whitespace-pre-line">{formData.about || 'No description provided.'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="flex flex-col justify-between h-full p-6 text-black bg-gray-100 border border-black shadow-md rounded-xl">
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

const ContactInfoForm = () => {
  const [formData, setFormData] = useState({ primaryName:'Alex Morgan', primaryEmail:'alex.morgan@techcorpsolutions.example', primaryPhone:'555-123-4567', secondaryName:'Jordan Taylor', secondaryEmail:'jordan.taylor@techcorpsolutions.example', secondaryPhone:'555-987-6543' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  };
  
  const handleSave = () => {
    console.log('Saved Contact Info!', formData);
    alert('Contact information saved successfully!');
  };

  return (
    <div className='p-3 mx-6 bg-gray-100 mt-7 rounded-xl'>
      <div className="flex p-4 mt-4 ml-2">
        <div className="grid w-full grid-cols-1 gap-6 max-w-10xl md:grid-cols-2">
          {/* Primary Contact Card */}
          <div className="p-6 bg-white border border-gray-300 shadow-lg rounded-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Primary Contact</h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Contact Name
              </label>
              <input
                type="text"
                name="primaryName"
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="primaryEmail"
                onChange={handleChange}
                placeholder="e.g. alex@company.com"
                className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="primaryPhone"
                onChange={handleChange}
                placeholder="e.g. 555-123-4567"
                className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Secondary Contact Card */}
          <div className="p-6 bg-white border border-gray-300 shadow-lg rounded-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Secondary Contact (Optional)
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Contact Name
              </label>
              <input
                type="text"
                name="secondaryName"
                onChange={handleChange}
                placeholder="e.g. Jordan Taylor"
                className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="secondaryEmail"
                onChange={handleChange}
                placeholder="e.g. jordan@company.com"
                className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="secondaryPhone"
                onChange={handleChange}
                placeholder="e.g. 555-987-6543"
                className="w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end col-span-1 md:col-span-2">
            <button
              onClick={handleSave}
              className="px-6 py-1 mt-2 text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CompanyProfile;
