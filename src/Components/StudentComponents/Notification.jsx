"use client"

import { useState } from "react"
import { Clock, Building2, Bell, Check } from "lucide-react"

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "deadline",
      title: "Application Deadline Approaching",
      date: "6/4/2024",
      message: "Your application for Frontend Developer Intern at TechCorp Inc. deadline is in 2 days.",
      isNew: true,
      isRead: false,
    },
    {
      id: "2",
      type: "status",
      title: "Application Status Update",
      date: "6/3/2024",
      message: "Your application for UI/UX Design Intern has been moved to interview stage.",
      isNew: true,
      isRead: false,
    },
    {
      id: "3",
      type: "reminder",
      title: "Bookmark Reminder",
      date: "6/2/2024",
      message: "Don't forget to apply for Data Science Intern at DataFlow Systems. Deadline in 5 days.",
      isNew: false,
      isRead: true,
    },
    {
      id: "4",
      type: "accepted",
      title: "Application Accepted!",
      date: "6/1/2024",
      message: "Congratulations! Your application for Marketing Intern at BrandCorp has been accepted.",
      isNew: false,
      isRead: true,
    },
  ])

  const [activeTab, setActiveTab] = useState("all")

  const filterNotifications = () => {
    if (activeTab === "unread") return notifications.filter((n) => !n.isRead)
    if (activeTab === "read") return notifications.filter((n) => n.isRead)
    return notifications
  }

  const getIcon = (type) => {
    const classes = "w-5 h-5"
    switch (type) {
      case "deadline":
        return <Clock className={`${classes} text-orange-500`} />
      case "status":
        return <Building2 className={`${classes} text-blue-500`} />
      case "reminder":
        return <Bell className={`${classes} text-purple-500`} />
      case "accepted":
        return <Check className={`${classes} text-green-600`} />
      default:
        return <Bell className={`${classes} text-gray-400`} />
    }
  }

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true, isNew: false }))
    )
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <button
            className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All as Read ({unreadCount})
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["all", "unread", "read"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded font-medium ${
                activeTab === tab
                  ? "bg-blue-800 text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              {tab === "all" && `All (${notifications.length})`}
              {tab === "unread" && `Unread (${unreadCount})`}
              {tab === "read" &&
                `Read (${notifications.filter((n) => n.isRead).length})`}
            </button>
          ))}
        </div>

        {/* Notification List */}
        {filterNotifications().length === 0 ? (
          <div className="p-6 bg-blue-50 text-center rounded text-blue-600 border border-blue-200">
            No notifications found.
          </div>
        ) : (
          filterNotifications().map((n) => (
            <div
              key={n.id}
              className={`p-6 rounded border mb-4 shadow-sm ${
                !n.isRead ? "bg-blue-50 border-blue-400" : "bg-white border-gray-200"
              } hover:shadow-md transition`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getIcon(n.type)}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{n.title}</h3>
                      {n.isNew && (
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{n.date}</p>
                    <p className="mt-2 text-sm text-blue-900">{n.message}</p>
                    <button className="text-sm mt-3 text-blue-700 hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
                {n.isRead && (
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
