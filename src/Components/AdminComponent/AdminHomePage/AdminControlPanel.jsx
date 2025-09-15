import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaUserSlash, FaClipboardList } from "react-icons/fa";
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
      return list.reduce((acc, i) => {
        try {
          if (i.deadline && new Date(i.deadline) < new Date()) return acc + 1;
        } catch {}
        if ((i.status || '').toLowerCase() === 'expired') return acc + 1;
        return acc;
      }, 0);
    };

    const load = async () => {
      try {
        const res = await fetch("http://localhost/InternBackend/admin/api/dashboard.php", { credentials: 'include' });
        const data = await res.json();
        if (data?.success && mounted) {
          setCounts(data.data);
        }

        if (!data?.data?.internships?.expired) {
          const r2 = await fetch("http://localhost/InternBackend/admin/api/internships.php", { credentials: 'include' });
          const d2 = await r2.json();
          if (d2?.success && Array.isArray(d2.data) && mounted) {
            const expiredCount = computeExpiredFromList(d2.data);
            setCounts((prev) => ({
              users: prev.users,
              internships: { total: d2.data.length, expired: expiredCount }
            }));
          }
        }
      } catch (err) {
        console.error('Dashboard load failed', err);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
      {/* User Management */}
      <div className="p-5 bg-white border-l-4 border-orange-500 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">User Management</span>
          <FaUsers className="text-xl text-orange-500" />
        </div>
        <div className="text-3xl font-bold text-gray-800">{counts.users.total}</div>
        <div className="text-sm text-gray-500">{counts.users.suspended} suspended</div>
        <button
          onClick={() => navigate("/admin/usermanage")}
          className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-600"
        >
          Manage
        </button>
      </div>

      {/* Internship Listings */}
      <div className="p-5 bg-white border-l-4 border-orange-500 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Internship Listings</span>
          <FaClipboardList className="text-xl text-orange-500" />
        </div>
        <div className="text-3xl font-bold text-gray-800">{counts.internships.total}</div>
        <div className="text-sm text-gray-500">{counts.internships.expired} expired</div>
        <button
          onClick={() => navigate("/admin/internshipmanage")}
          className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-600"
        >
          View All
        </button>
      </div>

      {/* System Settings */}
      <div className="p-5 bg-white border-l-4 border-orange-500 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">System Settings</span>
          <AiOutlineSetting className="text-xl text-orange-500" />
        </div>
        <div className="text-xl font-bold text-gray-800">Operational</div>
        <div className="text-sm text-gray-500">All systems running</div>
        <button
          onClick={() => navigate("/admin/settings")}
          className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-600"
        >
          Configure
        </button>
      </div>
    </div>
  );
};

export default AdminControlPanel;
