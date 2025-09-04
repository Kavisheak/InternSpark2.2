import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Bookmark, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Bookmarks = () => {
  const [bookmarkedInternships, setBookmarkedInternships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost/InternBackend/students/api/get_bookmarked_internships.php', { withCredentials: true })
      .then((res) => {
        console.log("Bookmarks Response:", res.data);
        if (res.data.success) setBookmarkedInternships(res.data.internships);
      })
      .catch((err) => {
        console.error("Error fetching bookmarks:", err);
      });
  }, []);

  // Remove expired bookmarks on component mount
  useEffect(() => {
    axios
      .get('http://localhost/InternBackend/students/api/remove_expired_bookmarks.php', { withCredentials: true })
      .then((res) => {
        if (res.data.expired && res.data.expired.length > 0) {
          res.data.expired.forEach(title => {
            toast(`Your bookmarked internship "${title}" has expired and was removed.`, {
              style: { background: "#002147", color: "white" },
              iconTheme: { primary: "#FCA311", secondary: "white" },
            });
          });
        }
        // Now fetch bookmarks after expired ones are removed
        axios
          .get('http://localhost/InternBackend/students/api/get_bookmarked_internships.php', { withCredentials: true })
          .then((res) => {
            if (res.data.success) setBookmarkedInternships(res.data.internships);
          })
          .catch((err) => {
            console.error("Error fetching bookmarks:", err);
          });
      });
  }, []);

  const confirmRemove = (internship) => {
    setSelectedInternship(internship);
    setShowModal(true);
  };

  const handleRemoveBookmark = async () => {
    try {
      await axios.post(
        'http://localhost/InternBackend/students/api/toggle_bookmark.php',
        { internship_id: selectedInternship.Internship_Id || selectedInternship.id },
        { withCredentials: true }
      );
      // Refetch bookmarks after removal
      const res = await axios.get(
        'http://localhost/InternBackend/students/api/get_bookmarked_internships.php',
        { withCredentials: true }
      );
      if (res.data.success) setBookmarkedInternships(res.data.internships);

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
    } catch (err) {
      console.error("Error removing bookmark:", err);
    }
  };

  const getWorkTypeStyle = (type) => {
    if (!type) return 'bg-orange-100 text-orange-700';
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

  // Normalize data safely
  const normalizedBookmarks = bookmarkedInternships.map((internship) => ({
    ...internship,
    id: internship.Internship_Id || internship.id,
    company: internship.company_name || internship.company || "Unknown Company",
    workType: internship.internship_type || internship.workType || "Not specified",
    pay: internship.salary || internship.pay || "Unpaid",
    status: internship.status || "open",
    logo_img: internship.logo_img || "", // <-- Ensure logo_img is present
  }));

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
            {normalizedBookmarks.map((internship) => (
              <div key={internship.id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Show logo image if available, else fallback to letter */}
                    {internship.logo_img ? (
                      <img
                        src={`http://localhost/InternBackend/${internship.logo_img}`}
                        alt={internship.company}
                        className="object-cover w-12 h-12 bg-white border-2 border-orange-400 rounded-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#002147]">
                        <span className="text-lg font-bold text-white">
                          {internship.company ? internship.company.charAt(0) : "?"}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-[#002147]">{internship.title || "Untitled"}</h3>
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
                    <span className="text-sm">{internship.location || "Location not specified"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{internship.duration || "Duration not specified"}</span>
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

                <p className="mb-4 text-sm text-gray-700 line-clamp-3">{internship.description || "No description available."}</p>

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
          <div className="p-6 bg-white rounded-xl w-[90%] max-w-md shadow-lg text-center relative">
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
                "{selectedInternship.title || "Untitled"}"
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
