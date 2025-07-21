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
    <div className="p-6 transition-shadow duration-200 bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-lg font-bold text-white">
              {internship.company.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{internship.title}</h3>
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

      <div className="mb-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{internship.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{internship.duration}</span>
        </div>
      </div>

      <div className="flex items-center mb-4 space-x-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getWorkTypeStyle(internship.workType)}`}>
          {internship.workType}
        </span>
        <span className="font-medium text-green-600">{internship.pay}</span>
      </div>

      <p className="mb-4 text-sm text-gray-700 line-clamp-3">{internship.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-red-500">
          {internship.status === 'closed' ? '🔒 Application closed' : '🔒 Application closes'}
        </span>
        <button className="px-4 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
          View Details
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;