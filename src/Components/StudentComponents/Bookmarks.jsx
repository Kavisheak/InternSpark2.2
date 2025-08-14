import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Bookmark, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Bookmarks = () => {
  const [bookmarkedInternships, setBookmarkedInternships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedInternships') || '[]');
    setBookmarkedInternships(savedBookmarks);
  }, []);

  const confirmRemove = (internship) => {
    setSelectedInternship(internship);
    setShowModal(true);
  };

  const handleRemoveBookmark = () => {
    const updatedBookmarks = bookmarkedInternships.filter(
      (item) => item.id !== selectedInternship.id
    );
    setBookmarkedInternships(updatedBookmarks);
    localStorage.setItem('bookmarkedInternships', JSON.stringify(updatedBookmarks));

    toast.success(`Removed "${selectedInternship.title}" from bookmarks`, {
      style: {
        background: '#002147',
        color: 'white',
      },
      iconTheme: {
        primary: '#FCA311',
        secondary: 'white',
      },
    });

    setShowModal(false);
    setSelectedInternship(null);
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
    <>
      <div className="min-h-screen bg-gray-50 fade-in-up">
        <div className="px-4 py-8 mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-[#002147] mb-8">Your Bookmarked Internships</h1>
          <p className="mb-6 text-gray-600">
            You have {bookmarkedInternships.length} bookmarked internship
            {bookmarkedInternships.length !== 1 ? 's' : ''}
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {bookmarkedInternships.map((internship) => (
              <div key={internship.id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
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
                    onClick={() => confirmRemove(internship)}
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getWorkTypeStyle(
                      internship.workType
                    )}`}
                  >
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
                    className="px-4 py-2 font-medium text-white rounded-lg bg-[#002147] hover:bg-[#002147]/80"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="p-6 bg-white rounded-xl w-[90%] max-w-md shadow-lg text-center">
            <button
              className="absolute text-gray-400 top-4 right-4 hover:text-gray-600"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-[#002147] mb-4">
              Remove Bookmark?
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to remove{' '}
              <span className="font-semibold text-[#FCA311]">
                "{selectedInternship.title}"
              </span>{' '}
              from your bookmarks?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveBookmark}
                className="px-4 py-2 text-sm font-medium text-white bg-[#FCA311] rounded hover:bg-[#e4960f]"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookmarks;