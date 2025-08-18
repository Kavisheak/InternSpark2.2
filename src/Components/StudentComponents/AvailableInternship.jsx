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
      .catch((err) => {
        console.error('Failed to fetch internships', err);
        setError('Failed to fetch internships. Please try again later.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    const saved = JSON.parse(localStorage.getItem('bookmarkedInternships') || '[]');
    setBookmarkedInternships(saved);

    return () => { cancelled = true; };
  }, []);

  const handleBookmarkToggle = (internship) => {
    const exists = bookmarkedInternships.some((i) => i.id === internship.id);
    const updated = exists
      ? bookmarkedInternships.filter((i) => i.id !== internship.id)
      : [...bookmarkedInternships, internship];

    setBookmarkedInternships(updated);
    localStorage.setItem('bookmarkedInternships', JSON.stringify(updated));
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
        activeFilter === 'All' || normalize(internship.workType) === normalize(activeFilter);

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

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
              className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg sm:w-80 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Titles</option>
              {internshipTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            {selectedTitle && (
              <button
                aria-label="Clear selection"
                onClick={() => setSelectedTitle('')}
                className="absolute -translate-y-1/2 right-3 top-1/2"
              >
                <X className="w-4 h-4 text-gray-500" />
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
                  key={internship.id}
                  internship={internship}
                  isBookmarked={bookmarkedInternships.some((item) => item.id === internship.id)}
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
