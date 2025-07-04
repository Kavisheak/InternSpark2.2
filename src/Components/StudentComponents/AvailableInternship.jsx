import React, { useState } from 'react';
import { Search, MapPin, Clock, Bookmark } from 'lucide-react';

// Individual internship card component
const InternshipCard = ({ internship }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getWorkTypeStyle = (type) => {
    switch (type.toLowerCase()) {
      case 'hybrid':
        return 'bg-gray-100 text-gray-800';
      case 'on-site':
        return 'bg-blue-100 text-blue-800';
      case 'remote':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {internship.company.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{internship.title}</h3>
            <p className="text-gray-600">{internship.company}</p>
          </div>
        </div>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current text-blue-600' : ''}`} />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{internship.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{internship.duration}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getWorkTypeStyle(internship.workType)}`}>
          {internship.workType}
        </span>
        <span className="text-green-600 font-medium">{internship.pay}</span>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{internship.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-red-500 text-sm">
          {internship.status === 'closed' ? '🔒 Application closed' : '🔒 Application closes'}
        </span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

// Main component
const InternshipListings = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = ['All', 'Remote', 'On-site', 'Hybrid'];

  const internships = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
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
      location: 'New York, NY',
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
      location: 'Chicago, IL',
      duration: '3 months',
      workType: 'Hybrid',
      pay: '$20/hour',
      description: 'Support our marketing team in campaign planning, social media management, and content creation. Gain hands-on experience in digital marketing strategies.',
      status: 'open'
    }
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesFilter = activeFilter === 'All' || internship.workType === activeFilter;
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
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

        {/* Filter Buttons */}
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

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing {filteredInternships.length} internships
        </p>

        {/* Internship Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInternships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>

        {/* Empty State */}
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

export default InternshipListings;