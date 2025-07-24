<<<<<<< HEAD
import React from 'react';
import { MapPin, Clock, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
=======
import React from "react";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
>>>>>>> fe76ef5e7d7175093fd31a4ebbc64e88adf857c6

const InternshipCard = ({ internship, isBookmarked, onBookmarkToggle }) => {
  const navigate = useNavigate();

  const getWorkTypeStyle = (type) => {
    switch (type.toLowerCase()) {
      case 'hybrid':
        return 'bg-orange-100 text-orange-700';
      case 'on-site':
        return 'bg-orange-200 text-orange-800';
      case 'remote':
<<<<<<< HEAD
        return 'bg-green-100 text-green-800';
=======
        return 'bg-orange-100 text-orange-700';
>>>>>>> fe76ef5e7d7175093fd31a4ebbc64e88adf857c6
      default:
        return 'bg-orange-100 text-orange-700';
    }
  };

  const handleBookmarkClick = () => {
    onBookmarkToggle(internship);
  };

  const handleViewDetails = () => {
    // Fix 1: Proper path with forward slash
    navigate(`/student/internships/${internship.id}`, { state: { internship } });
    
    // Fix 2: Also store in sessionStorage as backup (matching your InternshipDetails component)
    const existingData = JSON.parse(sessionStorage.getItem('internshipsData') || '[]');
    const updatedData = existingData.find(item => item.id === internship.id) 
      ? existingData 
      : [...existingData, internship];
    sessionStorage.setItem('internshipsData', JSON.stringify(updatedData));
  };

  return (
    <div className="p-6 transition-shadow duration-200 bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-oxfordblue">
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
          onClick={handleBookmarkClick}
          className={`transition-colors duration-200 ${
<<<<<<< HEAD
            isBookmarked
              ? 'text-blue-600 hover:text-blue-700'
=======
            isBookmarked 
              ? 'text-orange-500 hover:text-orange-600' 
>>>>>>> fe76ef5e7d7175093fd31a4ebbc64e88adf857c6
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414l4.243-4.243"></path></svg>
          <span className="text-sm">{internship.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"></path></svg>
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
<<<<<<< HEAD
        <span className={`text-sm ${internship.status === 'closed' ? 'text-red-500' : 'text-orange-500'}`}>
          {internship.status === 'closed' ? '🔒 Application closed' : '⏰ Application open'}
        </span>
        <button
          onClick={handleViewDetails}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
=======
        <span className="text-sm text-red-500">
          {internship.status === 'closed' ? '🔒 Application closed' : '🔓 Application open'}
        </span>
        <button
          onClick={() => navigate(`/student/job/${internship.id}`)}
          className="px-4 py-2 font-medium text-white transition-colors duration-200 rounded-lg bg-oxfordblue hover:bg-oxfordblue/80"
>>>>>>> fe76ef5e7d7175093fd31a4ebbc64e88adf857c6
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;
