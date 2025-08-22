// components/CompanyNotifications.jsx
import React from "react";

const CompanyNotifications = ({ notifications, setNotifications }) => {
  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem("notifications", JSON.stringify([]));
  };

  return (
    <div className="absolute right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-80">
      <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold border-b text-royalblue">
        <span>🔔 Notifications</span>
        <div className="space-x-2 text-xs font-normal">
          <button
            onClick={markAllAsRead}
            className="text-blue-500 hover:underline"
          >
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
              key={n.id}
              className={`px-4 py-3 text-sm ${
                !n.read ? "bg-blue-50" : ""
              } hover:bg-gray-50 transition`}
            >
              <div className="text-gray-800">{n.message}</div>
              <div className="mt-1 text-xs text-gray-500">{n.time}</div>
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