import { useState } from "react";
import {
  Search,
  Eye,
  AlertTriangle,
  User,
  Building2,
} from "lucide-react";

//  UI Components
const Input = ({ className = "", ...props }) => (
  <input className={`border rounded px-3 py-2 w-full ${className}`} {...props} />
);

const Button = ({ children, className = "", ...props }) => (
  <button className={`px-3 py-2 rounded font-medium ${className}`} {...props}>
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow rounded  ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Badge = ({ children, className = "" }) => (
  <span className={`px-2 py-1 text-sm rounded ${className}`}>{children}</span>
);

//  Main Component
export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const users = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@university.edu",
      type: "Student",
      joined: "1/15/2024",
      lastActive: "6/6/2024",
      reports: 7,
      applications: 5,
      status: "active",
    },
    {
      id: "2",
      name: "TechCorp Inc.",
      email: "hr@techcorp.com",
      type: "Company",
      joined: "2/20/2024",
      lastActive: "6/5/2024",
      reports: 12,
      internships: 12,
      status: "active",
    },
    {
      id: "3",
      name: "Sarah Wilson",
      email: "sarah.wilson@college.edu",
      type: "Student",
      joined: "6/1/2024",
      lastActive: "6/3/2024",
      reports: 12,
      applications: 1,
      status: "active",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    switch (activeTab) {
      case "students":
        return matchesSearch && user.type === "Student";
      case "companies":
        return matchesSearch && user.type === "Company";
      
      default:
        return matchesSearch;
    }
  });

  const counts = {
    all: users.length,
    students: users.filter((u) => u.type === "Student").length,
    companies: users.filter((u) => u.type === "Company").length,
    
  };

  const handleSuspendAccount = (id) => {
    alert(`Suspending account for user ${id}`);
  };

  const handleViewReports = (id) => {
    alert(`Viewing reports for user ${id}`);
  };

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-semibold text-orange-600">
          User Suspension Management
        </h1>
        <p className="text-gray-800">
          Monitor and manage users based on report counts
        </p>
      </div>

      <div className="flex justify-end mb-6 ">
        <div className="relative w-80 ">
          <Search className="absolute w-4 h-4 text-orange-500 transform -translate-y-1/2 left-3 top-1/2" />
          <Input
          
            placeholder="Search users..."
  
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border border-orange-600 "
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 mb-6 sm:grid-cols-2 md:grid-cols-4">
        {[
          { label: "All Users", key: "all", count: counts.all },
          { label: "Students", key: "students", count: counts.students },
          { label: "Companies", key: "companies", count: counts.companies },
          
        ].map((tab) => (
          <Button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full ${
              activeTab === tab.key
                ? "bg-orange-600 text-white"
                : "bg-white text-orange-600 border border-orange-600"
            }`}
          >
            {tab.label} ({tab.count})
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="border border-orange-300">
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-orange-50">
                    {user.type === "Student" ? (
                      <User className="w-5 h-5 text-orange-600" />
                    ) : (
                      <Building2 className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-800">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge className="text-orange-800 bg-orange-100">{user.status}</Badge>
                  <Badge
                    className={
                      user.reports >= 10
                        ? "bg-red-100 text-red-800"
                        : user.reports >= 8
                        ? "bg-orange-100 text-orange-800"
                        : "bg-orange-100 text-gray-800"
                    }
                  >
                    {user.reports} reports
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 mt-4 text-sm sm:grid-cols-2 md:grid-cols-4">
                <div>
                  <span className="text-gray-800">Type:</span>
                  <p className="font-medium text-orange-600">{user.type}</p>
                </div>
                <div>
                  <span className="text-gray-800">Joined:</span>
                  <p className="font-medium">{user.joined}</p>
                </div>
                <div>
                  <span className="text-gray-800">Last Active:</span>
                  <p className="font-medium">{user.lastActive}</p>
                </div>
                <div>
                  <span className="text-gray-800">
                    {user.type === "Student" ? "Applications:" : "Internships:"}
                  </span>
                  <p className="font-medium">
                    {user.type === "Student"
                      ? user.applications ?? 0
                      : user.internships ?? 0}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                {user.reports >= 8 && user.reports < 10 && (
                  <Button className="text-orange-600 border border-orange-300 bg-orange-50">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Warning Zone
                  </Button>
                )}
                {user.reports >= 10 && (
                  <Button
                    onClick={() => handleSuspendAccount(user.id)}
                    className="text-white bg-red-600"
                  >
                    Suspend Account
                  </Button>
                )}
                <Button
                  onClick={() => handleViewReports(user.id)}
                  className="text-orange-600 border border-orange-300 bg-orange-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
