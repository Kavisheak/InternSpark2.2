import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaBriefcase,
  FaDollarSign,
  FaBookmark,
  FaShareAlt,
} from 'react-icons/fa';

export default function InternshipDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [internship, setInternship] = useState(location.state?.internship || null);

  useEffect(() => {
    if (!internship) {
      const stored = JSON.parse(sessionStorage.getItem('internshipsData') || '[]');
      const found = stored.find((item) => item.id === parseInt(id));
      setInternship(found || null);
    }
  }, [id, internship]);

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-10 text-gray-700">
        <div>
          <h1 className="text-3xl font-bold mb-2">Internship Not Found</h1>
          <p className="mb-4">Please go back and select a valid internship.</p>
          <button
            onClick={() => navigate('/student/internships')}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Back to Internships
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div
        className="flex items-center gap-2 p-4 bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>Back to Internships</span>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-blue-200">
          <div className="flex justify-between items-start flex-wrap gap-6">
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">{internship.company.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-700">{internship.title}</h1>
                <p className="text-gray-600">{internship.company}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
                <FaBookmark />
                Save
              </button>
              <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
                <FaShareAlt />
                Share
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <Detail icon={<FaMapMarkerAlt />} label="Location" value={internship.location} />
            <Detail icon={<FaClock />} label="Duration" value={internship.duration} />
            <Detail icon={<FaCalendarAlt />} label="Deadline" value={internship.deadline} />
            <Detail icon={<FaBriefcase />} label="Work Type" value={internship.workType} />
            <Detail icon={<FaDollarSign />} label="Pay" value={internship.pay} />
            <Detail
              icon={<FaCalendarAlt />}
              label="Status"
              value={internship.status === 'open' ? 'Applications Open' : 'Applications Closed'}
            />
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              {internship.workType}
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              {internship.pay}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                internship.status === 'open'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {internship.status === 'open' ? 'Applications Open' : 'Applications Closed'}
            </span>
          </div>
        </div>

        {/* Description Section */}
        <Section title="About the Internship">
          <p className="text-gray-700 leading-relaxed">{internship.aboutInternship}</p>
        </Section>

        <Section title="Responsibilities">
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {internship.requirements?.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </Section>

        {/* Call to Action */}
        <div className="bg-blue-600 text-white p-8 rounded-xl text-center shadow-md mt-10">
          <h2 className="text-2xl font-bold mb-2">Ready to Apply?</h2>
          <p className="mb-4">
            {internship.status === 'open'
              ? `Submit your application before ${internship.deadline}`
              : 'This internship is currently closed.'}
          </p>
          <button
            className={`px-6 py-3 rounded-md font-medium transition ${
              internship.status === 'open'
                ? 'bg-white text-blue-700 hover:bg-gray-100'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
            disabled={internship.status === 'closed'}
          >
            {internship.status === 'open' ? 'Apply Now' : 'Applications Closed'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="mt-1 text-blue-700">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">{title}</h3>
      {children}
    </div>
  );
}
