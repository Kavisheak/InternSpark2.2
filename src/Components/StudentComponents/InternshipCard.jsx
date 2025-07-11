import React from 'react';
import { MapPin, Clock, Bookmark } from 'lucide-react';

const InternshipCard = ({ internship, isBookmarked, onBookmarkToggle }) => {
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

  const handleBookmarkClick = () => {
    onBookmarkToggle(internship);
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
          onClick={handleBookmarkClick}
          className={`transition-colors duration-200 ${
            isBookmarked 
              ? 'text-blue-600 hover:text-blue-700' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
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

export default InternshipCard;