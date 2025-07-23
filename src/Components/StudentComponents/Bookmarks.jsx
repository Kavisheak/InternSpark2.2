import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
  const [bookmarkedInternships, setBookmarkedInternships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedInternships') || '[]');
    setBookmarkedInternships(savedBookmarks);
  }, []);

  const handleRemoveBookmark = (internshipId) => {
    const updatedBookmarks = bookmarkedInternships.filter(item => item.id !== internshipId);
    setBookmarkedInternships(updatedBookmarks);
    localStorage.setItem('bookmarkedInternships', JSON.stringify(updatedBookmarks));
  };

  const getWorkTypeStyle = (type) => {
    switch (type.toLowerCase()) {
      case 'hybrid':
        return 'bg-orange-100 text-orange-700';
      case 'on-site':
        return 'bg-orange-200 text-orange-800';
      case 'remote':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-orange-100 text-orange-700';
    }
  };

  if (bookmarkedInternships.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="px-4 py-8 mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-[#002147] mb-8">Your Bookmarked Internships</h1>
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl text-gray-400">📚</div>
            <h3 className="text-xl font-semibold text-[#002147] mb-2">No Bookmarked Internships</h3>
            <p className="text-gray-600">Click the bookmark icon on an internship to add it here.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 fade-in-up ">
      <div className="px-4 py-8 mx-auto max-w-7xl ">
        <h1 className="text-3xl font-bold text-[#002147] mb-8">Your Bookmarked Internships</h1>
        <p className="mb-6 text-gray-600">
          You have {bookmarkedInternships.length} bookmarked internship{bookmarkedInternships.length !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {bookmarkedInternships.map((internship) => (
            <div key={internship.id} className="p-6 transition-shadow duration-200 bg-white rounded-lg shadow-md hover:shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#002147]">
                    <span className="text-lg font-bold text-white">
                      {internship.company.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#002147]">{internship.title}</h3>
                    <p className="text-gray-600">{internship.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveBookmark(internship.id)}
                  className="text-orange-500 transition-colors duration-200 hover:text-orange-600"
                  title="Remove Bookmark"
                >
                  <Bookmark className="w-5 h-5 fill-current" />
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
                  {internship.status === 'closed' ? '🔒 Application closed' : '🔓 Application open'}
                </span>
                <button
                  onClick={() => navigate(`/student/job/${internship.id}`)}
                  className="px-4 py-2 font-medium text-white transition-colors duration-200 rounded-lg bg-[#002147] hover:bg-[#002147]/80"
                >
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
