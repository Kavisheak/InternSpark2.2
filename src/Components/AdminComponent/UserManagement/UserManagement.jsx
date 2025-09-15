import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Eye, AlertTriangle, User, Building2 } from "lucide-react";
import toast from "react-hot-toast";

// UI Components
const Input = ({ className = "", ...props }) => (
  <input
    className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-300 ${className}`}
    {...props}
  />
);

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-3 py-2 rounded font-medium transition-colors duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Badge = ({ children, className = "" }) => (
  <span className={`px-2 py-1 text-sm rounded ${className}`}>{children}</span>
);

export default function UserManagement() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [users, setUsers] = useState([]);
  const [companyReports, setCompanyReports] = useState([]);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pendingSuspends, setPendingSuspends] = useState({});
  const [_requests, _setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // honor navigation state (from SystemStatus) or ?suspended=1 query param
    try {
      const requested = location?.state?.openTab;
      if (requested === "suspended") setActiveTab("suspended");
      const qp = new URLSearchParams(window.location.search);
      if (qp.get("suspended") === "1") setActiveTab("suspended");
    } catch {
      /* ignore */
    }

    // Fetch users
    fetch("http://localhost/InternBackend/admin/api/users.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(
            data.data.map((u) => ({
              id: u.id,
              name: u.username,
              email: u.email,
              type:
                u.role === "student"
                  ? "Student"
                  : u.role === "company"
                  ? "Company"
                  : "Admin",
              status: Number(u.is_active) === 1 ? "Active" : "Suspended",
              joined: u.created_at,
              reports: u.reports ?? 0,
              applications: u.applications ?? 0,
              internships: u.internships ?? 0,
              Com_Id: u.Com_Id || null,
              Student_Id: u.Student_Id || null,
              reports_received: u.reports_received ?? 0,
              reports_made: u.reports_made ?? 0,
            }))
          );
        }
      });

    // Load review requests
    fetch("http://localhost/InternBackend/admin/api/review_requests.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) _setRequests(data.data);
        setLoading(false);
      });
  }, [location]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    switch (activeTab) {
      case "students":
        return matchesSearch && user.type === "Student" && user.status !== "Suspended";
      case "companies":
        return matchesSearch && user.type === "Company" && user.status !== "Suspended";
      case "suspended":
        return matchesSearch && user.status === "Suspended";
      default:
        return matchesSearch && user.status !== "Suspended";
    }
  });

  const counts = {
    suspended: users.filter((u) => u.status === "Suspended").length,
    all: users.filter((u) => u.status !== "Suspended").length,
    students: users.filter((u) => u.type === "Student" && u.status !== "Suspended").length,
    companies: users.filter((u) => u.type === "Company" && u.status !== "Suspended").length,
  };

  const getReportCount = (user) => user?.reports_received ?? user?.reports ?? 0;

  const handleSuspendAccount = (id) => {
    const target = users.find((u) => u.id === id);
    const name = target?.name || id;
    if (target?.status === "Suspended") {
      toast.error("User is already suspended");
      return;
    }

    const doSuspend = async () => {
      const prevUsers = JSON.parse(JSON.stringify(users));
      setPendingSuspends((p) => ({ ...p, [id]: true }));
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: "Suspending..." } : u))
      );
      try {
        const payload = { user_id: id };
        const res = await fetch(
          "http://localhost/InternBackend/admin/api/suspend_user.php",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Failed to suspend user");

        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, status: "Suspended" } : u))
        );
        setPendingSuspends((p) => ({ ...p, [id]: false }));
        toast.success(data.message || "User suspended");
      } catch (err) {
        setUsers(prevUsers);
        setPendingSuspends((p) => ({ ...p, [id]: false }));
        toast.error(err.message || "Failed to suspend user");
      }
    };

    toast.custom(
      (t) => (
        <div
          className={`bg-white p-4 rounded shadow-lg w-full max-w-md transition-transform ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <div className="text-sm text-gray-800">
            Suspend account for <strong>{name}</strong>?
          </div>
          <div className="mt-1 text-xs text-gray-500">
            This will move the user's details to suspended_users and deactivate their account.
          </div>
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm bg-gray-100 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                await doSuspend();
              }}
              className="px-3 py-1 text-sm text-white bg-red-600 rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      { duration: 8000 }
    );
  };

  const handleViewReports = async (user, role) => {
    try {
      const type = role === "Company" ? "company" : "student";
      const userId = user.Com_Id || user.Student_Id || user.id || user.User_Id;
      const url = `http://localhost/InternBackend/admin/api/report_details.php?userId=${encodeURIComponent(
        userId
      )}&type=${type}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const payload = await res.json();
      if (!payload.success) throw new Error(payload.message || "No reports");

      let reportsData = payload.data || [];
      if (type === "student") reportsData = reportsData.filter((r) => r.reporter_type === "company");
      if (type === "company") reportsData = reportsData.filter((r) => r.reporter_type === "student");

      setCompanyReports(reportsData);
      setSelectedUser(user);
      setShowReportsModal(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load reports");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="mb-2 text-2xl font-semibold text-orange-600">
            User Suspension Management
          </h1>
          <p className="text-gray-800">Monitor and manage users based on report counts</p>
        </div>
        <Button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => navigate("/admin/review-requests")}
        >
          View Review Requests
        </Button>
      </div>

      {/* Search */}
      <div className="flex justify-end mb-6">
        <div className="relative w-80">
          <Search className="absolute w-4 h-4 text-orange-500 transform -translate-y-1/2 left-3 top-1/2" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-orange-600"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 gap-2 mb-6 sm:grid-cols-2 md:grid-cols-4">
        {[
          { label: "Active Users", key: "all", count: counts.all },
          { label: "Students", key: "students", count: counts.students },
          { label: "Companies", key: "companies", count: counts.companies },
          { label: "Suspended", key: "suspended", count: counts.suspended },
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

      {/* User Cards */}
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

                <div className="flex items-center space-x-2">
                  <Badge className="text-orange-800 bg-orange-100">{user.status}</Badge>
                  <div className="px-2 py-1 text-sm text-orange-800 border border-orange-200 rounded bg-orange-50">
                    {getReportCount(user)} reports
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 mt-4 text-sm sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <span className="text-gray-800">Type:</span>
                  <p className="font-medium text-orange-600">{user.type}</p>
                </div>
                <div>
                  <span className="text-gray-800">Joined:</span>
                  <p className="font-medium">{user.joined}</p>
                </div>
                <div>
                  <span className="text-gray-800">
                    {user.type === "Student" ? "Applications:" : "Internships:"}
                  </span>
                  <p className="font-medium">
                    {user.type === "Student" ? user.applications ?? 0 : user.internships ?? 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                {getReportCount(user) >= 8 && getReportCount(user) < 10 && (
                  <Button className="text-orange-600 border border-orange-300 bg-orange-50">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Warning Zone
                  </Button>
                )}

                <Button
                  onClick={() => handleViewReports(user, user.type)}
                  className="mr-auto text-orange-600 border border-orange-300 bg-orange-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Reports
                </Button>

                {getReportCount(user) >= 10 && user.status !== "Suspended" && (
                  (() => {
                    const isPending = !!pendingSuspends[user.id];
                    return (
                      <Button
                        onClick={() => handleSuspendAccount(user.id)}
                        disabled={isPending}
                        className={`text-white ${isPending ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}`}
                      >
                        {isPending ? "Suspending..." : "Suspend Account"}
                      </Button>
                    );
                  })()
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports Modal */}
      {showReportsModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-3xl mx-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-h-[80vh]">
              <div className="flex items-start justify-between p-6 border-b">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 text-orange-600 rounded-full bg-orange-50">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Reports for {selectedUser.name}</h3>
                    <div className="text-sm text-gray-600">
                      {selectedUser.email} • {companyReports.length} report{companyReports.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { setShowReportsModal(false); setSelectedUser(null); }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto max-h-[65vh]">
                {companyReports.length === 0 ? (
                  <div className="text-center text-gray-600">No reports found</div>
                ) : (
                  companyReports.map((report) => (
                    <div key={report.id} className="p-4 bg-white border rounded-lg shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-semibold">Report</h4>
                          <p className="mt-2 text-gray-600">{report.reason}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          <div>{new Date(report.reported_at).toLocaleString()}</div>
                          <div className="mt-2 text-xs text-right text-gray-400">{report.reporter_type}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 pt-4 mt-4 text-sm text-gray-700 border-t sm:grid-cols-2">
                        <div>
                          <div className="text-xs text-gray-500">Reported By</div>
                          <div className="font-medium">{report.reporter_name || report.reporter_email || 'Anonymous'}</div>
                          {report.reporter_email && <div className="text-xs text-gray-500">{report.reporter_email}</div>}
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Target</div>
                          <div className="font-medium">{report.target_company_name || report.target_student_name || '-'}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
