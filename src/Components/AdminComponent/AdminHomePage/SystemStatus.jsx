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
        const r = await fetch('http://localhost/InternBackend/admin/api/dashboard.php', { credentials: 'include' });
        const d = await r.json();
        if (d && d.success && mounted) {
          setCounts(d.data);
        }

  // No additional computations required here; dashboard API provides counts
      } catch {
        console.error('Failed to load dashboard counts');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  // cleanup action removed per request

  return (
    <div className="p-4 bg-orange-200 rounded-lg">
      <div className="flex items-center justify-between mb-3 font-semibold text-black">
        <div className="flex items-center">
          <FaUsers className="mr-2" />
          System Overview
        </div>
        <AiOutlineSetting />
      </div>

      <div className="grid gap-2 grid-cols-1 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-black"><FaUsers className="mr-2" /> Active users</div>
          <div className="text-orange-600 font-bold">{loading ? '...' : counts.users.total}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-black"><FaUserSlash className="mr-2" /> Suspended</div>
          <button onClick={() => navigate('/admin/usermanage?suspended=1')} className="text-orange-600 font-medium">{loading ? '...' : counts.users.suspended}</button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-black"><FaClipboardList className="mr-2" /> Active internships</div>
          <div className="text-orange-600 font-bold">{loading ? '...' : counts.internships.total}</div>
        </div>

  {/* Expiring row removed per request */}
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={() => navigate('settings')} className="flex-1 px-3 py-1 text-sm text-white bg-orange-500 rounded hover:bg-orange-600">Settings</button>
        <button onClick={() => navigate('/admin/usermanage?suspended=1')} className="px-3 py-1 text-sm text-white bg-orange-500 rounded hover:bg-orange-600">View Suspended</button>
  {/* Run Cleanup removed */}
      </div>
    </div>
  );
};

export default SystemStatus;