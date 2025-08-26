import React, { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import InternshipCard from './InternshipCard';
import Footer from '../CompanyComponents/Footer';
import axios from 'axios';

const internshipTitles = [
  "AI Research Intern",
  "AR/VR Development Intern",
  "Backend Developer Intern",
  "Big Data Intern",
  "Blockchain Development Intern",
  "Business Intelligence Intern",
  "Cloud Computing Intern",
  "Computer Graphics Intern",
  "Computer Vision Intern",
  "CRM Development Intern",
  "Cybersecurity Intern",
  "Data Analyst Intern",
  "Data Engineering Intern",
  "Data Science Intern",
  "Database Administration Intern",
  "Database Management Intern",
  "DevOps Intern",
  "Digital Forensics Intern",
  "E-Commerce Development Intern",
  "Embedded Systems Intern",
  "Enterprise Software Intern",
  "Full Stack Developer Intern",
  "Game Development Intern",
  "Hardware Engineering Intern",
  "Human-Computer Interaction Intern",
  "Information Security Intern",
  "Information Systems Intern",
  "IT Project Management Intern",
  "IT Support Intern",
  "Machine Learning Intern",
  "Mobile App Developer Intern",
  "Natural Language Processing Intern",
  "Network Administration Intern",
  "Network Security Intern",
  "Product Management Intern",
  "QA / Software Testing Intern",
  "Quantum Computing Intern",
  "Robotics Intern",
  "SEO & Digital Marketing Intern",
  "Site Reliability Engineering Intern",
  "Software Development Intern",
  "Software Engineering Intern",
  "Solutions Architect Intern",
  "Systems Administration Intern",
  "Systems Analyst Intern",
  "Technical Support Intern",
  "Technical Writing Intern",
  "UI/UX Design Intern",
  "Virtualization Intern",
  "Web Development Intern"
];

const normalize = (str = '') => str.toLowerCase().replace(/\s+/g, '');

const AvailableInternship = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [bookmarkedInternships, setBookmarkedInternships] = useState([]);
  const [internships, setInternships] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const filters = ['All', 'Remote', 'On-site', 'Hybrid'];

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    axios
      .get('http://localhost/InternBackend/students/api/get_all_internships.php')
      .then((res) => {
        if (cancelled) return;
        if (res.data.success) {
          setInternships(res.data.internships);
        } else {
          setError('Failed to load internships.');
        }
      })
      .catch(() => {
        setError('Failed to fetch internships. Please try again later.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    axios
      .get('http://localhost/InternBackend/students/api/get_bookmarked_internships.php', { withCredentials: true })
      .then((res) => {
        if (res.data.success) setBookmarkedInternships(res.data.internships);
      });

    return () => { cancelled = true; };
  }, []);

  const handleBookmarkToggle = async (internship) => {
    try {
      const res = await axios.post(
        'http://localhost/InternBackend/students/api/toggle_bookmark.php',
        { internship_id: internship.Internship_Id || internship.id },
        { withCredentials: true }
      );
      if (res.data.success) {
        const bookmarksRes = await axios.get(
          'http://localhost/InternBackend/students/api/get_bookmarked_internships.php',
          { withCredentials: true }
        );
        if (bookmarksRes.data.success) setBookmarkedInternships(bookmarksRes.data.internships);
      }
    } catch {
      // ignore
    }
  };

  const filteredInternships = useMemo(() => {
    const today = new Date();
    return internships.filter((internship) => {
      if (internship.deadline && new Date(internship.deadline) < today) return false;
      if (
        typeof internship.application_limit === 'number' &&
        typeof internship.application_count === 'number' &&
        internship.application_count >= internship.application_limit
      ) return false;
      const matchesFilter =
        activeFilter === 'All' || normalize(internship.internship_type || internship.workType) === normalize(activeFilter);
      const matchesTitle =
        selectedTitle === '' || internship.title === selectedTitle;
      return matchesFilter && matchesTitle;
    });
  }, [internships, activeFilter, selectedTitle]);

  const internshipsToShow = showAll ? filteredInternships : filteredInternships.slice(0, 10);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-8 mx-auto max-w-7xl fade-in-up">
        <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-oxfordblue">Available Internships</h1>

          {/* Dropdown + Clear Button */}
          <div className="relative w-full sm:w-80">
            <select
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
              className={`w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                selectedTitle ? "appearance-none" : ""  // hide dropdown arrow if X shown
              }`}
            >
              <option value="">All Titles</option>
              {internshipTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>

            {/* Show clear button only when a title is selected */}
            {selectedTitle && (
              <button
                aria-label="Clear selection"
                onClick={() => setSelectedTitle('')}
                className="absolute flex items-center justify-center w-6 h-6 text-gray-600 transition -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeFilter === filter
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="mb-4 font-medium text-gray-700">
          Showing {internshipsToShow.length}
          {internshipsToShow.length === 1 ? ' internship' : ' internships'}
        </p>

        {error && (
          <div className="p-4 mb-6 text-red-800 bg-red-100 rounded">{error}</div>
        )}

        {loading ? (
          <div className="py-12 text-center text-gray-600">Loading internships...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {internshipsToShow.map((internship) => (
                <InternshipCard
                  key={internship.Internship_Id || internship.id}
                  internship={{
                    ...internship,
                    id: internship.Internship_Id || internship.id,
                    company: internship.company_name || internship.company,
                    workType: internship.internship_type || internship.workType,
                    pay: internship.salary || internship.pay,
                  }}
                  isBookmarked={bookmarkedInternships.some(
                    (item) =>
                      (item.Internship_Id || item.id) ===
                      (internship.Internship_Id || internship.id)
                  )}
                  onBookmarkToggle={handleBookmarkToggle}
                />
              ))}
            </div>

            {filteredInternships.length > 10 && !showAll && (
              <div className="flex justify-center mt-8">
                <button
                  className="px-6 py-2 font-semibold text-white transition bg-orange-500 rounded hover:bg-orange-600"
                  onClick={() => setShowAll(true)}
                >
                  See All
                </button>
              </div>
            )}

            {filteredInternships.length === 0 && (
              <div className="py-12 text-center text-gray-700">
                <div className="mb-4 text-6xl">🔍</div>
                <h3 className="mb-2 text-xl font-semibold">No internships found</h3>
                <p>Try adjusting your selection or filters</p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AvailableInternship;
