import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Search, Eye, Trash2, MapPin, Calendar, Building2 } from "lucide-react";

export default function InternshipManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);

  useEffect(() => {
    fetch("http://localhost/InternBackend/admin/api/internships.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setInternships(data.data);
      });
  }, []);

  const filtered = internships.filter((item) => {
    // compute status based on deadline as well as backend status
    const computedStatus = (() => {
      try {
        if (item.deadline) {
          const dl = new Date(item.deadline);
          if (!isNaN(dl.getTime()) && dl < new Date()) return 'expired';
        }
      } catch {
        // ignore parse errors
      }
      return item.status || 'active';
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
      } catch {
        // ignore
      }
      return (i.status || 'active') === 'active';
    }).length,
    expired: internships.filter((i) => {
      try {
        if (i.deadline) {
          const dl = new Date(i.deadline);
          if (!isNaN(dl.getTime()) && dl < new Date()) return true;
        }
      } catch {
        // ignore
      }
      return (i.status || 'active') === 'expired';
    }).length,
  };

  const checkSession = async () => {
    try {
      const res = await fetch('http://localhost/InternBackend/admin/api/session_info.php', { credentials: 'include' });
      const data = await res.json();
      return data.session || {};
    } catch (err) {
      console.error('session check failed', err);
      return null;
    }
  };

  const handleRemove = async (id) => {
    // ask user first using a toast confirmation (Yes / No)
    const confirmed = await new Promise((resolve) => {
      toast((t) => (
        <div className="p-3">
          <div className="mb-2 font-medium">Are you sure you want to delete this internship?</div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => { toast.dismiss(t.id); resolve(false); }}
              className="px-3 py-1 rounded border bg-gray-100 text-gray-800"
            >
              No
            </button>
            <button
              onClick={() => { toast.dismiss(t.id); resolve(true); }}
              className="px-3 py-1 rounded bg-red-600 text-white"
            >
              Yes, remove
            </button>
          </div>
        </div>
      ), { duration: 60000 });
    });

    if (!confirmed) return;

    // then verify session
    const sess = await checkSession();
    let devPayload = null;
  if (!sess || (!sess.user_id && !sess.role && !sess.company_id)) {
      // try fallback from storage (localStorage or sessionStorage)
      const stored = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
      if (stored && (stored.user_id || stored.role || stored.company_id)) {
        devPayload = stored; // contains user_id, role, company_id
      } else {
    toast.error('Not authenticated');
        return;
      }
    }

    // helper that performs the actual delete request; accepts an optional devPayload
    const deleteRequest = async (useDevPayload) => {
      try {
        const form = new FormData();
        form.append('id', id);
        if (useDevPayload) {
          form.append('dev', '1');
          if (useDevPayload.user_id) form.append('user_id', useDevPayload.user_id);
          if (useDevPayload.role) form.append('role', useDevPayload.role);
          // derive company id from internship item if needed
          let companyIdToSend = useDevPayload.company_id;
          if (!companyIdToSend) {
            const internshipItem = internships.find(it => String(it.id) === String(id));
            if (internshipItem) {
              companyIdToSend = internshipItem.company_id || internshipItem.Company_Id || internshipItem.CompanyId || internshipItem.companyId || internshipItem.Com_Id || internshipItem.ComId;
            }
          }
          if (companyIdToSend) form.append('company_id', companyIdToSend);
        }
        console.debug('Deleting internship, form keys:', Array.from(form.keys()));
        const res = await fetch('http://localhost/InternBackend/admin/api/delete_internship.php', {
          method: 'POST',
          body: form,
          credentials: 'include'
        });
        const text = await res.text();
        let payload;
        try { payload = JSON.parse(text); } catch {
          console.error('Non-JSON response from server:', text);
          toast.error('Server error: ' + text);
          return;
        }
        if (!res.ok) {
          toast.error(payload.message || 'Server returned an error');
          return;
        }
        if (payload.success) {
          setInternships(prev => prev.filter(it => Number(it.id) !== Number(id)));
          toast.success(payload.message || 'Deleted');
        } else {
          toast.error(payload.message || 'Failed to delete');
        }
      } catch (err) {
        console.error(err);
        toast.error('Delete request failed: ' + (err.message || err));
      }
    };

    // If server session exists, proceed and rely on server-side auth.
    const sessionHasIdentity = sess && (sess.user_id || sess.role || sess.company_id);
    if (sessionHasIdentity) {
      // live authenticated session — perform delete without dev payload
      await deleteRequest(null);
      return;
    }

    // No server session: try devPayload. If it's missing or a student, show a small dev helper toast
    const needsDevHelp = !devPayload || devPayload.role === 'student' || (devPayload.role === 'company' && !devPayload.company_id);
    if (!needsDevHelp) {
      // devPayload looks usable
      await deleteRequest(devPayload);
      return;
    }

    // Show dev helper options: set admin, set company (derived), or cancel
    await new Promise((resolve) => {
      toast.custom((t) => (
        <div className="p-3 bg-white rounded shadow-md w-full max-w-sm">
          <div className="mb-2 font-medium">No valid session found for delete</div>
          <div className="text-sm text-gray-600 mb-3">You can set a temporary dev identity to proceed (local dev only).</div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => { toast.dismiss(t.id); resolve('cancel'); }}
              className="px-3 py-1 rounded border bg-gray-100 text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                // set temporary admin dev identity
                const payload = { user_id: 1, role: 'admin', company_id: null };
                localStorage.setItem('user', JSON.stringify(payload));
                toast.dismiss(t.id);
                await deleteRequest(payload);
                resolve('done');
              }}
              className="px-3 py-1 rounded bg-orange-500 text-white"
            >
              Use dev admin
            </button>
            <button
              onClick={async () => {
                // try to derive company id from the internship and set company dev identity
                const internshipItem = internships.find(it => String(it.id) === String(id));
                const derivedCompany = internshipItem && (internshipItem.company_id || internshipItem.Company_Id || internshipItem.CompanyId || internshipItem.companyId || internshipItem.Com_Id || internshipItem.ComId);
                if (!derivedCompany) {
                  // can't derive — inform user
                  toast.dismiss(t.id);
                  toast.error('Could not derive company id from the internship; set dev payload manually');
                  resolve('cancel');
                  return;
                }
                const payload = { user_id: 2, role: 'company', company_id: derivedCompany };
                localStorage.setItem('user', JSON.stringify(payload));
                toast.dismiss(t.id);
                await deleteRequest(payload);
                resolve('done');
              }}
              className="px-3 py-1 rounded bg-green-600 text-white"
            >
              Use dev company
            </button>
          </div>
        </div>
      ));
    });
  };
  // export functionality placeholder

  const getWorkTypeBadgeColor = (workType) => {
    switch (workType) {
      case "Remote":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "Hybrid":
        return "bg-purple-500/20 text-purple-500 border-purple-500/30";
      case "On-site":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30";
    }
  };

  const viewDetails = async (id) => {
    try {
      const res = await fetch(
        `http://localhost/InternBackend/admin/api/view_internship.php?id=${id}`
      );
      const data = await res.json();
      if (data.success) {
    // show details in modal
    setSelectedInternship(data.data);
      } else {
        toast.error(data.message || 'Failed to load details');
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const closeModal = () => setSelectedInternship(null);

  return (
    <div className="bg-white">
      <div className="absolute inset-0" />
      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Internship Management</h1>
        </div>

        <div className="mb-4 text-orange-600 font-bold">
          View and manage all internship postings (read-only with removal option)
        </div>

        <div className="flex justify-end mb-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-orange-500" />
            <input
              className="pl-10 pr-3 py-2 w-full rounded bg-orange-100 text-gray-800 border border-orange-600 placeholder-orange-500"
              placeholder="Search internships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          {["all", "active", "expired"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded border ${
                activeTab === tab
                  ? "bg-orange-500 text-white"
                  : "bg-orange-500 text-black"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({stats[tab]})
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="border border-orange-500 bg-white rounded p-6 shadow-sm"
            >
              <div className="flex justify-between mb-4">
                <div className="flex gap-4">
                  <div className="p-2 bg-orange-500 rounded">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-black flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {item.company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`text-sm px-2 py-1 rounded border ${(() => {
                      try {
                        if (item.deadline) {
                          const dl = new Date(item.deadline);
                          if (!isNaN(dl.getTime()) && dl < new Date()) return 'bg-red-400 text-white';
                        }
                      } catch {
                        // ignore
                      }
                      return (item.status === "active") ? 'bg-orange-500 text-white' : 'bg-red-400 text-white';
                    })()}`}
                  >
                    {(() => {
                      try {
                        if (item.deadline) {
                          const dl = new Date(item.deadline);
                          if (!isNaN(dl.getTime()) && dl < new Date()) return 'expired';
                        }
                      } catch {
                        // ignore
                      }
                      return item.status;
                    })()}
                  </span>
                  <span
                    className={`text-sm px-2 py-1 rounded border ${getWorkTypeBadgeColor(
                      item.workType
                    )}`}
                  >
                    {item.workType}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm text-gray-800 mb-4">
                <div>
                  <span className="flex items-center mb-1">
                    <MapPin className="text-gray-800 h-4 w-4 mr-1" /> Location:
                  </span>
                  <p className="text-orange-600">{item.location}</p>
                </div>
                <div>
                  <span className="flex items-center mb-1">
                    <Calendar className="h-4 w-4 mr-1" /> Duration:
                  </span>
                  <p className="text-orange-600">{item.duration}</p>
                </div>
                <div>
                  <span className="block mb-1">Posted:</span>
                  <p className="text-orange-600">{item.posted}</p>
                </div>
                <div>
                  <span className="block mb-1">Applications:</span>
                  <p className="text-orange-600">{item.applications}</p>
                </div>
              </div>

              <p className="text-gray-800 mb-4">{item.description}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => viewDetails(item.id)}
                  className="flex items-center px-4 py-2 rounded border bg-orange-500 hover:bg-gray-400 text-white"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex items-center px-4 py-2 rounded bg-red-600 hover:bg-purple-400 text-white"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Listing
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Internship details modal */}
        {selectedInternship && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="w-full max-w-3xl mx-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-start justify-between p-6 border-b">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedInternship.title}</h3>
                    <div className="text-sm text-gray-600">{selectedInternship.company} • {selectedInternship.location}</div>
                  </div>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
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
                      <div className="font-medium">{selectedInternship.salary || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Deadline</div>
                      <div className="font-medium">{selectedInternship.deadline || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Application Limit</div>
                      <div className="font-medium">{selectedInternship.application_limit ?? '-'}</div>
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
                    <h4 className="text-sm font-medium">Company Details</h4>
                    <div className="text-sm text-gray-700">{selectedInternship.company} — {selectedInternship.company_location}</div>
                    {selectedInternship.website && <div className="text-xs text-blue-600">{selectedInternship.website}</div>}
                    {selectedInternship.about && <p className="mt-2 text-gray-700">{selectedInternship.about}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
  <Toaster position="top-center" />
  </div>
    </div>
  );
}