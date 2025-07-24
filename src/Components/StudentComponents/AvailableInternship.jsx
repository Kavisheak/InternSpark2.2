import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import InternshipCard from './InternshipCard';
import Footer from '../CompanyComponents/Footer';

const AvailableInternship = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedInternships, setBookmarkedInternships] = useState([]);

  const filters = ['All', 'Remote', 'On-site', 'Hybrid'];

  const internships = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechCorp Solutions',
      location: 'Colombo 05, Sri Lanka',
      duration: '3 months',
      workType: 'Hybrid',
      pay: '$25/hour',
      description: "Join our team to develop modern web applications using React and TypeScript. You'll work alongside senior developers on real-world projects.",
      status: 'closed'
    },
    {
      id: 2,
      title: 'UX Design Intern',
      company: 'CreativeMinds Agency',
      location: 'Kandy',
      duration: '6 months',
      workType: 'On-site',
      pay: '$22/hour',
      description: 'Work with our design team to create user-friendly interfaces for web and mobile applications. Help conduct user research and testing.',
      status: 'closed'
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'DataViz Analytics',
      location: 'Remote',
      duration: '4 months',
      workType: 'Remote',
      pay: '$24/hour',
      description: 'Apply machine learning techniques to real-world datasets. Help develop predictive models and visualize insights.',
      status: 'open'
    },
    {
      id: 4,
      title: 'Marketing Intern',
      company: 'BrandBoost',
      location: 'Colombo , Sri lanka',
      duration: '3 months',
      workType: 'Hybrid',
      pay: '$20/hour',
      description: 'Support our marketing team in campaign planning, social media management, and content creation. Gain hands-on experience in digital marketing strategies.',
      status: 'open'
    }
  ];

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedInternships') || '[]');
    setBookmarkedInternships(savedBookmarks);
  }, []);

  const handleBookmarkToggle = (internship) => {
    const isCurrentlyBookmarked = bookmarkedInternships.some(item => item.id === internship.id);
    let updatedBookmarks;

    if (isCurrentlyBookmarked) {
      updatedBookmarks = bookmarkedInternships.filter(item => item.id !== internship.id);
    } else {
      updatedBookmarks = [...bookmarkedInternships, internship];
    }

    setBookmarkedInternships(updatedBookmarks);
    localStorage.setItem('bookmarkedInternships', JSON.stringify(updatedBookmarks));
  };

  const filteredInternships = internships.filter(internship => {
    const matchesFilter = activeFilter === 'All' || internship.workType === activeFilter;
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-8 mx-auto max-w-7xl fade-in-up">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-oxfordblue">Available Internships</h1>
          <div className="relative">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search by title, company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex mb-6 space-x-4">
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

        <p className="mb-6 text-white">
          Showing {filteredInternships.length} internships
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredInternships.map((internship) => (
            <InternshipCard 
              key={internship.id} 
              internship={internship}
              isBookmarked={bookmarkedInternships.some(item => item.id === internship.id)}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="py-12 text-center text-white">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 text-xl font-semibold">No internships found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default AvailableInternship;
