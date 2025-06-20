import { useState } from "react";
import { Search, Download } from "lucide-react";
import FilterTabs from "./FilterTabs";
import UserCard from "./usercard";


const usersData = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    type: "Student",
    joined: "1/15/2024",
    lastActive: "6/6/2024",
    applications: 5,
    status: "active",
    avatar: "👤",
  },
  {
    id: 2,
    name: "TechCorp Inc.",
    email: "hr@techcorp.com",
    type: "Company",
    joined: "2/10/2024",
    lastActive: "6/5/2024",
    applications: 12,
    status: "active",
    avatar: "🏢",
  },
  {
    id: 3,
    name: "Sarah Williams",
    email: "sarah.w@college.edu",
    type: "Student",
    joined: "3/5/2024",
    lastActive: "6/4/2024",
    applications: 3,
    status: "pending",
    avatar: "👤",
  },
  {
    id: 4,
    name: "InnovateLab",
    email: "careers@innovatelab.com",
    type: "Company",
    joined: "1/20/2024",
    lastActive: "6/3/2024",
    applications: 8,
    status: "active",
    avatar: "🏢",
  },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Users");

  const filterCounts = {
    "All Users": usersData.length,
    Students: usersData.filter((user) => user.type === "Student").length,
    Companies: usersData.filter((user) => user.type === "Company").length,
    Pending: usersData.filter((user) => user.status === "pending").length,
  };

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    switch (activeFilter) {
      case "Students":
        return matchesSearch && user.type === "Student";
      case "Companies":
        return matchesSearch && user.type === "Company";
      case "Pending":
        return matchesSearch && user.status === "pending";
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
            <Download size={18} />
            Export Users
          </button>
        </div>

        {/* Users Overview */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Users Overview
              </h2>
              <p className="text-gray-600">Manage students and companies</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 border border-gray-200 rounded-md py-2 px-4 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <FilterTabs
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            counts={filterCounts}
          />

          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No users found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
