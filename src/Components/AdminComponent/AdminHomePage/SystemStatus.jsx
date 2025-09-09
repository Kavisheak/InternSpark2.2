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
          // Use dashboard counts as baseline
          setCounts(d.data);

          // Compute accurate "active internships" by fetching the internships list
          // and excluding expired items (deadline in the past or explicit expired status)
          try {
            const r2 = await fetch('http://localhost/InternBackend/admin/api/internships.php', { credentials: 'include' });
            const list = await r2.json();
            if (list && list.success && Array.isArray(list.data) && mounted) {
              const now = new Date();
              const activeList = list.data.filter((it) => {
                try {
                  if (it.deadline) {
                    const dl = new Date(it.deadline);
                    if (!isNaN(dl.getTime()) && dl < now) return false; // expired by date
                  }
                } catch {
                  // ignore parse errors
                }
                if ((it.status || '').toLowerCase() === 'expired') return false;
                return true;
              });

              setCounts((prev) => ({
                ...prev,
                internships: {
                  ...((prev && prev.internships) || {}),
                  total: activeList.length,
                },
              }));
            }
          } catch (err) {
            // ignore failures to compute detailed list; dashboard baseline remains
            console.warn('Failed to compute active internships from list', err);
          }
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
  // compute active users as total minus suspended (defensive, non-negative)
  const activeUsers = Math.max(0, (counts?.users?.total ?? 0) - (counts?.users?.suspended ?? 0));

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
          <div className="text-orange-600 font-bold">{loading ? '...' : activeUsers}</div>
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
        <button onClick={() => navigate('/admin/usermanage', { state: { openTab: 'suspended' } })} className="px-3 py-1 text-sm text-white bg-orange-500 rounded hover:bg-orange-600">View Suspended</button>
  {/* Run Cleanup removed */}
      </div>
    </div>
  );
};

export default SystemStatus;