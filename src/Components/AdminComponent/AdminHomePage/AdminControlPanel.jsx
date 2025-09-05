import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaClipboardList } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";

const AdminControlPanel = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
  users: { total: 0, suspended: 0 },
  internships: { total: 0, expired: 0 }
  });

  useEffect(() => {
    let mounted = true;

    const computeExpiredFromList = (list) => {
      if (!Array.isArray(list)) return 0;
      let expired = 0;
      for (const i of list) {
        try {
          if (i.deadline) {
            const dl = new Date(i.deadline);
            if (!isNaN(dl.getTime()) && dl < new Date()) {
              expired++;
              continue;
            }
          }
        } catch {
          // ignore parse errors for deadline field
        }
        if ((i.status || '').toLowerCase() === 'expired') expired++;
      }
      return expired;
    };

    const load = async () => {
      try {
        const res = await fetch("http://localhost/InternBackend/admin/api/dashboard.php");
        const data = await res.json();
        if (data && data.success && mounted) {
          setCounts(data.data);
        }

        const hasExpired = Boolean(data && data.data && data.data.internships && typeof data.data.internships.expired !== 'undefined' && data.data.internships.expired !== null);
        if (!hasExpired) {
          // fetch internships list and compute expired
          const r2 = await fetch("http://localhost/InternBackend/admin/api/internships.php");
          const d2 = await r2.json();
          if (d2 && d2.success && Array.isArray(d2.data) && mounted) {
            const expiredCount = computeExpiredFromList(d2.data);
            setCounts((prev) => ({
              users: (data && data.data && data.data.users) || prev.users,
              internships: {
                total: (data && data.data && data.data.internships && typeof data.data.internships.total === 'number') ? data.data.internships.total : (Array.isArray(d2.data) ? d2.data.length : prev.internships.total),
                expired: expiredCount
              }
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load dashboard/compute expired', err);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
      {/* User Management */}
      <div className="p-4 bg-orange-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-black">User Management</span>
          <FaUsers color="black" />
        </div>
        <div className="text-3xl font-bold text-orange-600">{counts.users.total}</div>
        <div className="text-sm text-black">{counts.users.suspended} suspended</div>
        <button
          onClick={() => navigate("/admin/usermanage")}
          className="px-4 py-1 mt-3 text-sm text-white bg-orange-500 rounded hover:bg-gray-600"
        >
          Manage
        </button>
      </div>

      {/* Internship Listings */}
      <div className="p-4 bg-orange-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-black">Internship Listings</span>
          <FaClipboardList color="black" />
        </div>
        <div className="text-3xl font-bold text-orange-600">{counts.internships.total}</div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-black">Active listings</div>
          <div className="text-sm text-black">{counts.internships.expired ?? 0} expired</div>
        </div>
        <button
          onClick={() => navigate("internshipmanage")}
          className="px-4 py-1 mt-3 text-sm text-white bg-orange-500 rounded hover:bg-gray-600"
        >
          View All
        </button>
      </div>

      {/* System Settings */}
      <div className="p-4 bg-orange-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-black">System Settings</span>
          <AiOutlineSetting color="black" />
        </div>
        <div className="text-xl font-bold text-orange-600">Operational</div>
        <div className="text-sm text-black">All systems running</div>
        <button
          onClick={() => navigate("settings")}
          className="px-4 py-1 mt-3 text-sm text-white bg-orange-500 rounded hover:bg-gray-600"
        >
          Configure
        </button>
      </div>
    </div>
  );
};

export default AdminControlPanel;