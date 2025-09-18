import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Search, Eye, Trash2, MapPin, Calendar, Building2 } from "lucide-react";

export default function InternshipManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [reports, setReports] = useState([]);
  const [reportsInternship, setReportsInternship] = useState(null);

  useEffect(() => {
    fetch("http://localhost/InternBackend/admin/api/internships.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setInternships(data.data);
      });
  }, []);

  const filtered = internships.filter((item) => {
    const computedStatus = (() => {
      try {
        if (item.deadline) {
          const dl = new Date(item.deadline);
          if (!isNaN(dl.getTime()) && dl < new Date()) return "expired";
        }
      } catch {}
      return item.status || "active";
    })();
    const search = searchQuery.toLowerCase();
    const match =
      item.title.toLowerCase().includes(search) ||
      item.company.toLowerCase().includes(search) ||
      item.location.toLowerCase().includes(search);
    if (activeTab === "active") return computedStatus === "active" && match;
    if (activeTab === "expired") return computedStatus === "expired" && match;
    return match;
  });

  const stats = {
    all: internships.length,
    active: internships.filter((i) => {
      try {
        if (i.deadline) {
          const dl = new Date(i.deadline);
          if (!isNaN(dl.getTime()) && dl < new Date()) return false;
        }
      } catch {}
      return (i.status || "active") === "active";
    }).length,
    expired: internships.filter((i) => {
      try {
        if (i.deadline) {
          const dl = new Date(i.deadline);
          if (!isNaN(dl.getTime()) && dl < new Date()) return true;
        }
      } catch {}
      return (i.status || "active") === "expired";
    }).length,
  };

  const getWorkTypeBadgeColor = (workType) => {
    switch (workType) {
      case "Remote":
        return "bg-green-100 text-green-800 border-green-200";
      case "Hybrid":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "On-site":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const viewDetails = async (id) => {
    try {
      const res = await fetch(
        `http://localhost/InternBackend/admin/api/view_internship.php?id=${id}`
      );
      const data = await res.json();
      if (data.success) setSelectedInternship(data.data);
      else toast.error(data.message || "Failed to load details");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const closeModal = () => setSelectedInternship(null);

  // DELETE HANDLER WITH CONFIRMATION TOAST
  const handleRemove = async (id) => {
    const confirmed = await new Promise((resolve) => {
      toast((t) => (
        <div className="max-w-sm p-3 bg-white border rounded shadow-md">
          <p className="mb-2 font-medium text-gray-900">
            Are you sure you want to delete this internship?
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 text-gray-800 bg-gray-100 border rounded hover:bg-gray-200"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
            >
              No
            </button>
            <button
              className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
            >
              Yes, delete
            </button>
          </div>
        </div>
      ), { duration: 60000 });
    });

    if (!confirmed) return;

    // proceed with delete request (keep original backend logic)
    try {
      const form = new FormData();
      form.append("id", id);

      const res = await fetch("http://localhost/InternBackend/admin/api/delete_internship.php", {
        method: "POST",
        body: form,
        credentials: "include",
      });
      const text = await res.text();
      let payload;
      try {
        payload = JSON.parse(text);
      } catch {
        toast.error("Server error: " + text);
        return;
      }

      if (payload.success) {
        setInternships(prev => prev.filter(it => Number(it.id) !== Number(id)));
        toast.success(payload.message || "Deleted successfully");
      } else {
        toast.error(payload.message || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete request failed: " + (err.message || err));
    }
  };

  const handleViewReports = async (internship) => {
    try {
      const res = await fetch(
        `http://localhost/InternBackend/admin/api/internship_reports.php?internship_id=${internship.id}`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (data.success) {
        setReports(data.data || []);
        setReportsInternship(internship);
        setShowReportsModal(true);
      } else {
        toast.error(data.message || "No reports found");
      }
    } catch (err) {
      toast.error("Failed to load reports");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">Internship Management</h1>
      <p className="mb-6 text-gray-600">
        View and manage all internship postings (read-only with removal option)
      </p>

      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          {["all", "active", "expired"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-orange-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({stats[tab]})
            </button>
          ))}
        </div>

        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-orange-500" />
          <input
            type="text"
            className="w-full py-2 pl-10 pr-3 text-gray-900 placeholder-orange-500 bg-white border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
            placeholder="Search internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filtered.map((item) => {
          const status = (() => {
            try {
              if (item.deadline) {
                const dl = new Date(item.deadline);
                if (!isNaN(dl.getTime()) && dl < new Date()) return "expired";
              }
            } catch {}
            return item.status || "active";
          })();

          return (
            <div
              key={item.id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center p-2 bg-orange-500 rounded-lg">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                    <p className="flex items-center mt-1 text-gray-600">
                      <Building2 className="w-4 h-4 mr-1" /> {item.company}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span
                    className={`text-sm px-2 py-1 rounded border font-medium ${
                      status === "expired" ? "bg-red-100 text-red-700 border-red-200" : "bg-orange-100 text-orange-700 border-orange-200"
                    }`}
                  >
                    {status}
                  </span>
                  <span
                    className={`text-sm px-2 py-1 rounded border font-medium ${getWorkTypeBadgeColor(
                      item.workType
                    )}`}
                  >
                    {item.workType}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 md:grid-cols-4">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin className="w-4 h-4" /> Location:
                  </div>
                  <div className="font-medium text-gray-800">{item.location}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Calendar className="w-4 h-4" /> Duration:
                  </div>
                  <div className="font-medium text-gray-800">{item.duration}</div>
                </div>
                <div>
                  <div className="mb-1">Posted:</div>
                  <div className="font-medium text-gray-800">{item.posted}</div>
                </div>
                <div>
                  <div className="mb-1">Applications:</div>
                  <div className="font-medium text-gray-800">{item.applications}</div>
                </div>
              </div>

              <p className="mb-4 text-gray-700">{item.description}</p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => viewDetails(item.id)}
                  className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
                >
                  <Eye className="w-4 h-4" /> View Details
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" /> Remove Listing
                </button>
                <button
                  onClick={() => handleViewReports(item)}
                  className="flex items-center gap-2 px-4 py-2 text-orange-600 border border-orange-300 rounded-lg bg-orange-50 hover:bg-orange-100"
                >
                  <Eye className="w-4 h-4" /> View Reports
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAILS MODAL */}
      {selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
          <div className="w-full max-w-3xl overflow-hidden bg-white rounded-lg shadow-lg">
            <div className="flex items-start justify-between p-6 border-b">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedInternship.title}</h3>
                <p className="text-gray-600">{selectedInternship.company} • {selectedInternship.location}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-lg font-bold text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-gray-700">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="font-medium">{selectedInternship.duration}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Type</div>
                  <div className="font-medium">{selectedInternship.internship_type}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Salary</div>
                  <div className="font-medium">{selectedInternship.salary || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Deadline</div>
                  <div className="font-medium">{selectedInternship.deadline || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Application Limit</div>
                  <div className="font-medium">{selectedInternship.application_limit ?? "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Posted</div>
                  <div className="font-medium">{selectedInternship.created_at}</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Description</div>
                <div className="text-gray-800">{selectedInternship.description}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Requirements</div>
                <div className="text-gray-800 whitespace-pre-wrap">{selectedInternship.requirements}</div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-900">Company Details</h4>
                <p className="text-gray-700">{selectedInternship.company} — {selectedInternship.company_location}</p>
                {selectedInternship.website && <p className="text-xs text-blue-600">{selectedInternship.website}</p>}
                {selectedInternship.about && <p className="mt-2 text-gray-700">{selectedInternship.about}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REPORTS MODAL */}
      {showReportsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-2xl mx-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-h-[80vh]">
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h3 className="text-xl font-semibold text-orange-600">
                    Reports for {reportsInternship?.title}
                  </h3>
                  <div className="text-sm text-gray-600">
                    {reports.length} report{reports.length !== 1 ? "s" : ""}
                  </div>
                </div>
                <button
                  onClick={() => setShowReportsModal(false)}
                  className="text-2xl text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-6 overflow-y-auto max-h-[65vh]">
                {reports.length === 0 ? (
                  <div className="text-center text-gray-600">No reports found</div>
                ) : (
                  reports.map((report) => (
                    <div key={report.id} className="p-4 bg-white border rounded-lg shadow-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-semibold">Report</h4>
                          <p className="mt-2 text-gray-600">{report.reason}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          <div>{new Date(report.reported_at).toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3 pt-4 mt-4 text-sm text-gray-700 border-t sm:grid-cols-2">
                        <div>
                          <div className="text-xs text-gray-500">Reported By</div>
                          <div className="font-medium">
                            {report.fname || ""} {report.lname || ""}
                          </div>
                          {report.email && (
                            <div className="text-xs text-gray-500">{report.email}</div>
                          )}
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Student ID</div>
                          <div className="font-medium">{report.Student_Id || "-"}</div>
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

      <Toaster position="top-center" />
    </div>
  );
}
