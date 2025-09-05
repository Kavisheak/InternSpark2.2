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
        if (data && data.success && Array.isArray(data.data)) {
          const count = data.data.filter(u => {
            const reports = Number(u.reports_received ?? u.reports ?? 0);
            // determine suspended status from authoritative fields
            const isSuspended = (typeof u.is_active !== 'undefined')
              ? Number(u.is_active) === 0
              : ((u.status || '').toLowerCase() === 'suspended');
            // only count users who are not suspended and have 10+ reports
            return reports >= 10 && !isSuspended;
          }).length;
          setSuspendCount(count);
        }
      } catch (err) {
        // ignore fetch errors; leave count as 0
        console.error('Failed to load users for critical alerts', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);
  
  // compute internships that are already expired (deadline < now OR status === 'expired')
  useEffect(() => {
    let mounted = true;
    const loadExpired = async () => {
      try {
        const res = await fetch('http://localhost/InternBackend/admin/api/internships.php', { credentials: 'include' });
        const data = await res.json();
        if (!mounted) return;
        if (data && data.success && Array.isArray(data.data)) {
          const now = new Date();
          const count = data.data.reduce((acc, it) => {
            try {
              // if status explicitly marks expired, count it
              if ((it.status || '').toLowerCase() === 'expired') return acc + 1;
              if (!it.deadline) return acc;
              const dl = new Date(it.deadline);
              if (isNaN(dl.getTime())) return acc;
              // count those with deadline before now
              if (dl < now) return acc + 1;
            } catch {
              // ignore parse errors
            }
            return acc;
          }, 0);
          setExpiredCount(count);
        }
      } catch (err) {
        console.error('Failed to load internships for critical alerts', err);
      }
    };
    loadExpired();
    return () => { mounted = false; };
  }, []);
  return (
    <div className="bg-orange-200 p-4 rounded-lg">
      <div className="flex items-center text-red-600 font-semibold mb-3">
        <FaExclamationTriangle className="mr-2" />
        Critical Alerts
      </div>
      <ul className="space-y-3 text-sm">
        <li className="bg-white p-2 rounded">
          <span className="text-black">{suspendCount} {suspendCount === 1 ? 'user has' : 'users have'} 10+ reports and require suspension</span>
        </li>
        
        <li className="bg-white p-2 rounded">
          <span className="text-black">{expiredCount} internship listing{expiredCount !== 1 ? 's' : ''} expired</span>
        </li>
      </ul>
    </div>
  );
};

export default CriticalAlerts;