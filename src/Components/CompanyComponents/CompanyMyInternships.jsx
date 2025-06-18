import React, { useState } from "react";
import { FiCalendar, FiEye, FiEdit, FiTrash, FiSearch, FiMapPin, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    location: "San Francisco, CA",
    deadline: "2025-05-15",
    mode: "Hybrid",
    status: "Active",
  },
  {
    id: 2,
    title: "UX Design Intern",
    location: "New York, NY",
    deadline: "2025-05-15",
    mode: "Onsite",
    status: "Active",
  },
  {
    id: 3,
    title: "Data Scientist Intern",
    location: "Remote",
    deadline: "2025-05-15",
    mode: "Remote",
    status: "Active",
  },
]

export default function CompanyMyInternships() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate=useNavigate();

  return (
    <div className="min-h-screen p-6 text-gray-100 bg-transparent md:p-10">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-9">
        <h1 className="ml-4 text-2xl font-semibold">Manage Internships</h1>
        <div className="flex items-center mr-4 space-x-5">
         <div className="flex items-center px-2 py-2 bg-gray-100 rounded-lg w-96">
          <FiSearch className="mr-2 text-gray-900" />
          <input
            type="text"
            placeholder="Search by title or internship name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none"
          />
        </div>

          <button className="px-4 py-1.5 font-semibold transition border rounded hover:bg-gray-100 hover:text-black" 
          onClick={()=>navigate('/company/postinternship')}>
            + Post New
          </button>
        </div>
      </div>

      {/* List of internships */}
      <div className="flex flex-col space-y-4">
        {internships
          .filter(
            (job) => 
            job.title.toLowerCase()
            .split(" ")
            .some((word) => word.startsWith(searchTerm.toLowerCase()) ) 
                
          )
          .map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-xl shadow bg-transparent border-gray-400 transition transform hover:shadow-lg hover:translate-y-[-2px] border"
            >
              {/* Title and Mode row */}
              <div className="flex items-center justify-between mb-4">
                 <h2 className="mb-1 text-lg font-semibold">{job.title}</h2>
                 <span className="px-3 py-1 text-xs font-semibold text-black bg-gray-100 rounded-full">
                   {job.mode}
                 </span>
              </div>

              {/* Location, Deadline and Actions row */}
              <div className="flex items-center justify-between">
                {/* Location and deadline with icons */}
                <div className="flex items-center space-x-4 text-gray-400">
                   <span className="flex items-center">
                     <FiMapPin className="mr-1" /> {job.location}
                   </span>
                   <span className="flex items-center">
                     <FiCalendar className="mr-1" /> {job.deadline}
                   </span>
                 </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                   {/* View Applications */}
                   <div className="relative group" >
                   <button
                     onClick={() => navigate('/company/applications')}
                     aria-label="View Applications"
                     className="p-2 transition border rounded-full hover:bg-gray-100 hover:text-black">
                     <FiUsers size={13} />
                   </button>
                   <span className="absolute hidden px-2 py-1 mb-2 text-sm text-center text-gray-900 transform -translate-x-1/2 bg-white rounded-md bottom-full left-1/2 group-hover:inline-block">
                     View Applications
                   </span>
                  </div>

                   {/* Edit */}
                   <div className="relative group">
                   <button
                     onClick={() =>navigate(`/company/postinternship/${job.id}`, { state: { internship: job } },)} //it sends full job object
                     aria-label="Edit"
                     className="p-2 transition border rounded-full hover:bg-gray-100 hover:text-black">
                     <FiEdit size={13} />
                   </button>
                   
                   <span className="absolute hidden px-2 py-1 mb-2 text-sm text-center text-gray-900 transform -translate-x-1/2 bg-white rounded-md bottom-full left-1/2 group-hover:inline-block">
                     Edit
                   </span>
                   </div>

                   {/* Delete */}
                   <div className="relative group">
                   <button
                     onClick={() => console.log("Delete", job.id)}
                     aria-label="Delete"
                     className="p-2 text-red-500 transition border rounded-full hover:bg-red-100">
                     <FiTrash size={13} />
                   </button>
                    <span className="absolute hidden px-2 py-1 mb-2 text-sm text-center text-gray-900 transform -translate-x-1/2 bg-white rounded-md bottom-full left-1/2 group-hover:inline-block">
                     Delete
                   </span>
                   </div>
                 </div>
               </div>
            </div>
          ))}

        {/* If no internships match search */}
        {internships.filter(
          (job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase()) 
        ).length === 0 && (
          <p className="mt-4 text-xl text-center text-gray-400">
            No internships match your search.
          </p>
        )}

      </div>
    </div>
  )
}
