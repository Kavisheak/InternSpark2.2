// components/Notification/StudentNotifications.jsx
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const StudentNotifications = ({ notifications, fetchNotifications }) => {
  const markAllAsRead = () => {
    axios
      .post(
        "http://localhost/InternBackend/students/api/mark_notifications_read.php",
        {},
        { withCredentials: true }
      )
      .then(() => {
        if (fetchNotifications) fetchNotifications();
      })
      .catch((err) => {
        toast.error("Failed to mark all as read.");
        console.error(err);
      });
  };
  const clearAll = () => {
    axios
      .post(
        "http://localhost/InternBackend/students/api/clear_notifications.php",
        {},
        { withCredentials: true }
      )
      .then(() => {
        if (fetchNotifications) fetchNotifications();
      })
      .catch((err) => {
        toast.error("Failed to clear notifications.");
        console.error(err);
      });
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
              key={n.SNID || n.id}
              className={`px-4 py-3 text-sm ${
                !n.seen ? "bg-blue-50" : ""
              } hover:bg-gray-50 transition`}
            >
              <div
                className={`text-gray-800 ${
                  n.type === "report_warning" ? "text-red-600 font-bold" : ""
                }`}
              >
                {n.message}
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {n.created_at
                  ? new Date(n.created_at).toLocaleString()
                  : n.time || ""}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default StudentNotifications;
