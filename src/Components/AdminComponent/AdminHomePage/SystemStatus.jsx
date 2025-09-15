import React, { useEffect, useState } from "react";
import { FaUsers, FaUserSlash, FaClipboardList } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SystemStatus = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ users: { total: 0, suspended: 0 }, internships: { total: 0 } });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost/InternBackend/admin/api/dashboard.php', { credentials: 'include' });
        const d = await res.json();
        if (d?.success && mounted) setCounts(d.data);

        const r2 = await fetch('http://localhost/InternBackend/admin/api/internships.php', { credentials: 'include' });
        const list = await r2.json();
        if (list?.success && Array.isArray(list.data) && mounted) {
          const now = new Date();
          const activeList = list.data.filter(it => {
            try {
              if (it.deadline && new Date(it.deadline) < now) return false;
            } catch {}
            if ((it.status || '').toLowerCase() === 'expired') return false;
            return true;
          });
          setCounts(prev => ({
            ...prev,
            internships: { ...prev.internships, total: activeList.length }
          }));
        }
      } catch (err) {
        console.error('Failed to load dashboard counts', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  const activeUsers = Math.max(0, (counts?.users?.total ?? 0) - (counts?.users?.suspended ?? 0));

  return (
    <div className="p-5 bg-white border-l-4 border-orange-500 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4 font-semibold text-gray-700">
        <div className="flex items-center"><FaUsers className="mr-2 text-orange-500" /> System Overview</div>
        <AiOutlineSetting className="text-xl text-orange-500" />
      </div>

      <div className="grid gap-3 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center"><FaUsers className="mr-2 text-gray-700" /> Active Users</div>
          <div className="font-bold text-orange-500">{loading ? '...' : activeUsers}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center"><FaUserSlash className="mr-2 text-gray-700" /> Suspended Users</div>
          <button onClick={() => navigate('/admin/usermanage?suspended=1')} className="font-medium text-orange-500">{loading ? '...' : counts.users.suspended}</button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center"><FaClipboardList className="mr-2 text-gray-700" /> Active Internships</div>
          <div className="font-bold text-orange-500">{loading ? '...' : counts.internships.total}</div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={() => navigate('settings')} className="flex-1 px-3 py-2 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-600">Settings</button>
        <button onClick={() => navigate('/admin/usermanage', { state: { openTab: 'suspended' } })} className="px-3 py-2 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-600">View Suspended</button>
      </div>
    </div>
  );
};

export default SystemStatus;
