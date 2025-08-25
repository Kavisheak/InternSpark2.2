import React from "react";
import axios from "axios";

const API_BASE = "http://localhost/InternBackend/company/api";

const CompanyNotifications = ({ notifications, fetchNotifications }) => {
  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await axios.post(`${API_BASE}/markAsRead.php`, {}, { withCredentials: true });
      fetchNotifications(); // Refresh after marking read
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  // Clear all notifications
  const clearAll = async () => {
    try {
      // Only clear if necessary
      const unreadExists = notifications.some((n) => parseInt(n.seen) === 0);
      if (!unreadExists) {
        await axios.post(`${API_BASE}/clearAll.php`, {}, { withCredentials: true });
        fetchNotifications();
      } else {
        alert("Please mark notifications as read before clearing.");
      }
    } catch (err) {
      console.error("Error clearing:", err);
    }
  };

  return (
    <div className="absolute right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-80">
      <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold border-b text-royalblue">
        <span>🔔 Notifications</span>
        <div className="space-x-2 text-xs font-normal">
          <button onClick={markAllAsRead} className="text-blue-500 hover:underline">
            Mark all as read
          </button>
          <button onClick={clearAll} className="text-red-500 hover:underline">
            Clear all
          </button>
        </div>
      </div>

      <ul className="overflow-y-auto divide-y divide-gray-100 max-h-64">
        {notifications.length === 0 ? (
          <li className="px-4 py-4 text-sm text-center text-gray-500">
            No notifications
          </li>
        ) : (
          notifications.map((n) => (
            <li
              key={n.Company_Notif_Id}
              className={`px-4 py-3 text-sm ${parseInt(n.seen) === 0 ? "bg-blue-50" : ""} hover:bg-gray-50 transition`}
            >
              <div className="text-gray-800">{n.message}</div>
              <div className="mt-1 text-xs text-gray-500">
                {n.created_at
                  ? new Date(n.created_at).toLocaleString()
                  : "Just now"}
              </div>
            </li>
          ))
        )}
      </ul>

      {notifications.length > 0 && (
        <div className="px-4 py-2 text-xs text-center text-blue-600 cursor-pointer hover:underline">
          View All
        </div>
      )}
    </div>
  );
};

export default CompanyNotifications;
