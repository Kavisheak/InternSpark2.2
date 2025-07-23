import { useState } from "react"
import { Clock, Building2, Bell, Check } from "lucide-react"

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "deadline",
      title: "Application Deadline Approaching",
      date: "6/4/2024",
      message:
        "Your application for Frontend Developer Intern at TechCorp Inc. deadline is in 2 days.",
      isNew: true,
      isRead: false,
    },
    {
      id: "2",
      type: "status",
      title: "Application Status Update",
      date: "6/3/2024",
      message:
        "Your application for UI/UX Design Intern has been moved to interview stage.",
      isNew: true,
      isRead: false,
    },
    {
      id: "3",
      type: "reminder",
      title: "Bookmark Reminder",
      date: "6/2/2024",
      message:
        "Don't forget to apply for Data Science Intern at DataFlow Systems. Deadline in 5 days.",
      isNew: false,
      isRead: true,
    },
    {
      id: "4",
      type: "accepted",
      title: "Application Accepted!",
      date: "6/1/2024",
      message:
        "Congratulations! Your application for Marketing Intern at BrandCorp has been accepted.",
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
        return <Building2 className={`${classes} text-blue-600`} />
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
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl px-6 py-10 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Notifications</h1>
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={`text-sm font-medium px-4 py-2 rounded-md transition ${
              unreadCount === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Mark All as Read ({unreadCount})
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6">
          {["all", "unread", "read"].map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                }`}
              >
                {tab === "all" && `All (${notifications.length})`}
                {tab === "unread" && `Unread (${unreadCount})`}
                {tab === "read" &&
                  `Read (${notifications.filter((n) => n.isRead).length})`}
              </button>
            )
          })}
        </div>

        {/* Notification List */}
        {filterNotifications().length === 0 ? (
          <div className="p-8 text-center text-blue-600 border border-blue-200 rounded-xl bg-blue-50">
            No notifications found.
          </div>
        ) : (
          filterNotifications().map((n) => (
            <div
              key={n.id}
              className={`p-6 rounded-xl border mb-4 shadow-sm transition hover:shadow-md ${
                !n.isRead
                  ? "bg-blue-50 border-blue-400"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                {/* Left: Icon + Text */}
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getIcon(n.type)}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-blue-900">
                        {n.title}
                      </h3>
                      {n.isNew && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{n.date}</p>
                    <p className="mt-2 text-sm text-blue-900">{n.message}</p>
                    <button className="mt-3 text-sm font-medium text-blue-700 hover:underline">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Right: Read Icon */}
                {n.isRead && (
                  <div className="flex items-center justify-center w-6 h-6 mt-1 bg-green-100 rounded-full">
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
