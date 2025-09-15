import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const CriticalAlerts = () => {
  const [suspendCount, setSuspendCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("http://localhost/InternBackend/admin/api/users.php", { credentials: 'include' });
        const data = await res.json();
        if (!mounted) return;
        if (data?.success && Array.isArray(data.data)) {
          const count = data.data.filter(u => {
            const reports = Number(u.reports_received ?? u.reports ?? 0);
            const isSuspended = (typeof u.is_active !== 'undefined') ? Number(u.is_active) === 0 : ((u.status || '').toLowerCase() === 'suspended');
            return reports >= 10 && !isSuspended;
          }).length;
          setSuspendCount(count);
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadExpired = async () => {
      try {
        const res = await fetch('http://localhost/InternBackend/admin/api/internships.php', { credentials: 'include' });
        const data = await res.json();
        if (!mounted) return;
        if (data?.success && Array.isArray(data.data)) {
          const now = new Date();
          const count = data.data.reduce((acc, it) => {
            try {
              if ((it.status || '').toLowerCase() === 'expired') return acc + 1;
              if (it.deadline && new Date(it.deadline) < now) return acc + 1;
            } catch {}
            return acc;
          }, 0);
          setExpiredCount(count);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadExpired();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="p-5 bg-white border-l-4 border-red-500 rounded-lg shadow-lg">
      <div className="flex items-center mb-4 font-semibold text-red-600"><FaExclamationTriangle className="mr-2" /> Critical Alerts</div>
      <ul className="space-y-3 text-sm">
        <li className="p-3 rounded shadow-sm bg-gray-50">
          <span className="text-gray-700">{suspendCount} {suspendCount === 1 ? 'user has' : 'users have'} 10+ reports and require suspension</span>
        </li>
        <li className="p-3 rounded shadow-sm bg-gray-50">
          <span className="text-gray-700">{expiredCount} internship listing{expiredCount !== 1 ? 's' : ''} expired</span>
        </li>
      </ul>
    </div>
  );
};

export default CriticalAlerts;
