import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Bookmark } from 'lucide-react';

const Bookmarks = () => {
  const [bookmarkedInternships, setBookmarkedInternships] = useState([]);

  // Load bookmarked internships from localStorage
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedInternships') || '[]');
    setBookmarkedInternships(savedBookmarks);
  }, []);

  // Handle removing bookmark
  const handleRemoveBookmark = (internshipId) => {
    const updatedBookmarks = bookmarkedInternships.filter(item => item.id !== internshipId);
    setBookmarkedInternships(updatedBookmarks);
    localStorage.setItem('bookmarkedInternships', JSON.stringify(updatedBookmarks));
  };

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

  if (bookmarkedInternships.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Bookmarked Internships</h1>
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookmarked Internships</h3>
            <p className="text-gray-600">Click the bookmark icon on an internship to add it here.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Bookmarked Internships</h1>
        
        <p className="text-gray-600 mb-6">
          You have {bookmarkedInternships.length} bookmarked internship{bookmarkedInternships.length !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bookmarkedInternships.map((internship) => (
            <div key={internship.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
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
                  onClick={() => handleRemoveBookmark(internship.id)}
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  title="Remove bookmark"
                >
                  <Bookmark className="w-5 h-5 fill-current" />
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;