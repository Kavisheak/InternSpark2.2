// AvailableInternship.jsx
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import InternshipCard from './InternshipCard';

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
      description: 'Join our team to develop modern web applications using React and TypeScript. You\'ll work alongside senior developers on real-world projects.',
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

  // Load bookmarked internships from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedInternships') || '[]');
    setBookmarkedInternships(savedBookmarks);
  }, []);

  // Handle bookmark toggle
  const handleBookmarkToggle = (internship) => {
    const isCurrentlyBookmarked = bookmarkedInternships.some(item => item.id === internship.id);
    let updatedBookmarks;

    if (isCurrentlyBookmarked) {
      // Remove from bookmarks
      updatedBookmarks = bookmarkedInternships.filter(item => item.id !== internship.id);
    } else {
      // Add to bookmarks
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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Internships</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="text-gray-600 mb-6">
          Showing {filteredInternships.length} internships
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No internships found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableInternship;
