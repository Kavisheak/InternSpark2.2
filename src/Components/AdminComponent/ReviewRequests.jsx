import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ReviewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/InternBackend/admin/api/review_requests.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setRequests(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAction = async (id, action, response) => {
    const confirmMsg =
      action === "accept"
        ? "Are you sure you want to accept & unsuspend this request?"
        : "Are you sure you want to reject this request?";

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await fetch(
        "http://localhost/InternBackend/admin/api/review_action.php",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ request_id: id, action, response }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setRequests((prev) => prev.filter((r) => r.Request_Id !== id));
      } else {
        toast.error(data.message || "Failed");
      }
    } catch {
      toast.error("Failed");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ top: "70px" }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#333",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            fontSize: "14px",
            fontWeight: "500",
          },
          success: { style: { borderLeft: "6px solid #16a34a" } },
          error: { style: { borderLeft: "6px solid #dc2626" } },
        }}
      />

      <div className="max-w-4xl mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-orange-600">
          Review Requests
        </h2>

        {requests.length === 0 ? (
          <div className="p-6 text-center text-gray-600 bg-white border rounded shadow">
            No pending requests.
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.Request_Id}
                className="p-6 transition bg-white border rounded-lg shadow hover:shadow-md"
              >
                <div className="mb-2 text-lg font-semibold text-gray-800">
                  {req.username}{" "}
                  <span className="text-sm text-gray-500">({req.role})</span>
                </div>
                <div className="mb-1 text-sm text-gray-600">{req.email}</div>
                <div className="text-xs text-gray-500">
                  Requested at: {req.requested_at}
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                    onClick={() =>
                      handleAction(
                        req.Request_Id,
                        "accept",
                        "Account unsuspended after review."
                      )
                    }
                  >
                    Accept & Unsuspend
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                    onClick={() =>
                      handleAction(req.Request_Id, "reject", "Request rejected.")
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
