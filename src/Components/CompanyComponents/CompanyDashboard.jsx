import React, { useState } from 'react';
import { FiCalendar, FiFilter, FiSearch } from 'react-icons/fi';
import { MdWorkOutline, MdFiberNew, MdAssignment } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const CompanyDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate=useNavigate();


  const recentApplications = [
    { name: 'Sarah Johnson', role: 'Frontend Developer Intern', status: 'New', time: '2h ago' },
    { name: 'Michael Chen', role: 'UX Design Intern', status: 'Reviewing', time: '1 day ago' },
    { name: 'Alex Washington', role: 'Data Science Intern', status: 'Interviewing', time: '3 days ago' },
    { name: 'John Mac', role: 'Cyber Intern', status: 'Reviewing', time: '2 days ago' },
    
  ];

  const activeInternships = [
    { title: 'Frontend Developer Intern', deadline: 'May 20, 2025', applications: 9, filled: 60 },
    { title: 'UI/UX Intern', deadline: 'May 30, 2025', applications: 3, filled: 25 },
    { title: 'Data Analyst Intern', deadline: 'June 10, 2025', applications: 6, filled: 40 },
  ];

  const totalApplications = activeInternships.reduce((sum, job) => sum + job.applications, 0);
  const newApplications = recentApplications.filter(app => app.status === 'New').length;

  const statusColors = {
    New: 'bg-purple-500 text-white',
    Reviewing: 'bg-gray-200 text-black',
    Interviewing: 'bg-white text-black',
  };

  return (
    <div className="min-h-screen p-6 text-white bg-transparent md:p-10">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'Active Internships', icon: <MdWorkOutline size={26} />, value: activeInternships.length },
          { label: 'New Applications', icon: <MdFiberNew size={26} />, value: newApplications },
          { label: 'Total Applications', icon: <MdAssignment size={26} />, value: totalApplications }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center p-5 shadow bg-white/90 rounded-xl" >
            <div className="mr-4 text-black">{item.icon}</div>
            <div>
              <p className="text-sm text-black/60">{item.label}</p>
              <h3 className="text-2xl font-bold text-black">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter Controls */}
      <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div className="flex items-center w-full px-3 py-2 rounded-lg bg-white/10 sm:w-1/3">
          <FiSearch className="mr-2 text-white/60" />
          <input
            type="text"
            placeholder="Search by internship or applicant name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-white bg-transparent placeholder-white/50 focus:outline-none"
          />
        </div>
        <button className="flex items-center px-4 py-2 transition border border-white rounded hover:bg-white hover:text-black">
          <FiFilter className="mr-2" />
          Filter
        </button>
      </div>

      {/* Recent Applications */}
      <div className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Recent Applications</h2>
        <div className="space-y-3">
          {recentApplications
            .filter(app =>
              app.name.toLowerCase().split(" ")
            .some((word) => word.startsWith(searchTerm.toLowerCase()) ||
             app.role.toLowerCase().split(" ")
            .some((word) => word.startsWith(searchTerm.toLowerCase()) ) ) 
            )
            .slice(0,4)  //limit only 4 application
            .map((app, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg shadow bg-white/10">
                <div>
                  <h3 className="font-bold">{app.name}</h3>
                  <p className="text-sm text-white/70">
                    Applied for {app.role} · {app.time}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm px-3 py-1 rounded-full ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                  <button className="underline text-white/90 hover:text-white"
                  onClick={()=>navigate(`/applications/${app.name.replace(/\s+/g, '-').toLowerCase()}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))
            
          }
    
          

          {/* No applications found message */}
          {recentApplications.filter(app =>
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.role.toLowerCase().includes(searchTerm.toLowerCase())
          ).length === 0 && (
            <p className="mt-4 text-center text-white/50">No applications match your search.</p>
          )}
        </div>
      </div>

      {/* Active Internships */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Your Active Internships</h2>
          <button className="px-4 py-1 transition border rounded hover:bg-white hover:text-black"
          onClick={()=>navigate('/internships')}
          >Manage All</button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {activeInternships
            .filter(job => job.title.toLowerCase()
                     .split(" ")
                     .some((word) => word.startsWith(searchTerm.toLowerCase()))
          )
            .slice(0,6)  // limit the application
            .map((job, idx) => (
              <div key={idx} className="relative p-6 shadow bg-white/10 rounded-xl">
                <h3 className="mb-1 text-lg font-semibold">{job.title}</h3>
                <div className="flex items-center mb-2 text-sm text-white/70">
                  <FiCalendar className="mr-2" />
                  <span>Deadline: {job.deadline}</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 text-sm text-black bg-white rounded-full">
                    {job.applications} Applications
                  </span>
                  <button className="px-3 py-1 text-sm transition border border-white rounded hover:bg-white hover:text-black"
                  onClick={()=>navigate(`/postinternship/${job.id}`, { state: { internship: job } },)}
                  >
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm transition border border-white rounded hover:bg-white hover:text-black"
                  onClick={()=>navigate(`/postinternship/${job.id}`, {
            state: { internship:job, viewOnly: true },
       })
}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
        </div>
          {/* No internships found message */}
          {activeInternships.filter(job =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
          ).length === 0 && (
            <p className="mt-4 text-center text-white/50">No internships match your search.</p>
          )}
        
      </div>
    </div>
  );
};

export default CompanyDashboard;
