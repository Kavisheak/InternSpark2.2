import React, { useState } from "react";

const data = [
  {
    title: "Software Engineering Internship Guidelines",
    type: "Guide",
    status: "Published",
    author: "Admin Team",
    views: 1250,
    updated: "2024-01-20",
  },
  {
    title: "Summer Internship Program 2024",
    type: "Announcement",
    status: "Published",
    author: "HR Department",
    views: 2100,
    updated: "2024-01-18",
  },
  {
    title: "Frontend Developer - TechCorp",
    type: "Job",
    status: "Published",
    author: "TechCorp Inc",
    views: 890,
    updated: "2024-01-19",
  },
  {
    title: "How to Write a Perfect Resume",
    type: "Article",
    status: "Draft",
    author: "Career Team",
    views: 0,
    updated: "2024-01-16",
  },
  {
    title: "Data Science Bootcamp Registration",
    type: "Announcement",
    status: "Archived",
    author: "Education Team",
    views: 3400,
    updated: "2024-01-05",
  },
];

// Color classes for type badges
const typeColors = {
  Guide: "bg-green-100 text-green-600",
  Announcement: "bg-orange-100 text-orange-600",
  Job: "bg-purple-100 text-purple-600",
  Article: "bg-blue-100 text-blue-600",
};

// Color classes for status badges
const statusColors = {
  Published: "bg-green-100 text-green-700",
  Draft: "bg-yellow-100 text-yellow-700",
  Archived: "bg-gray-200 text-gray-700",
};

export default function DashboardTable() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [filterType, setFilterType] = useState("All Types");

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "All Status" || item.status === filterStatus;
    const matchesType = filterType === "All Types" || item.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-md shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <input
          type="search"
          placeholder="Search content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {/* <div className="flex gap-3">
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option>All Types</option>
            <option>Guide</option>
            <option>Announcement</option>
            <option>Job</option>
            <option>Article</option>
          </select>
        </div> */}
      </div>

      <table className="w-full border-collapse table-auto text-sm text-gray-700">
        <thead>
          <tr className="border-b border-gray-300 text-left">
            <th className="py-3 px-4 font-semibold">Title</th>
            {/* <th className="py-3 px-4 font-semibold">Type</th> */}
            <th className="py-3 px-4 font-semibold">Status</th>
            <th className="py-3 px-4 font-semibold">Author</th>
            <th className="py-3 px-4 font-semibold">Views</th>
            {/* <th className="py-3 px-4 font-semibold">Updated</th> */}
            <th className="py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-400">
                No content found.
              </td>
            </tr>
          )}
          {filteredData.map((item, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="py-3 px-4 font-semibold">{item.title}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    typeColors[item.type] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {/* {item.type} */}
                </span>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    statusColors[item.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-3 px-4">{item.author}</td>
              <td className="py-3 px-4 flex items-center gap-1 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {item.views.toLocaleString()}
              </td>
              {/* <td className="py-3 px-4">{item.updated}</td> */}
              <td className="py-3 px-4 text-center cursor-pointer select-none text-gray-500 hover:text-gray-700">
                &#8230;
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
