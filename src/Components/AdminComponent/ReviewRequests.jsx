import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ReviewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/InternBackend/admin/api/review_requests.php", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setRequests(data.data);
        setLoading(false);
      });
  }, []);

  const handleAction = async (id, action, response) => {
    try {
      const res = await fetch("http://localhost/InternBackend/admin/api/review_action.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request_id: id, action, response }),
      });
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <h2 className="mb-4 text-xl font-bold">Review Requests</h2>
      {requests.length === 0 ? (
        <div>No pending requests.</div>
      ) : (
        requests.map((req) => (
          <div key={req.Request_Id} className="p-4 mb-3 bg-white border rounded shadow">
            <div>
              <strong>{req.username}</strong> ({req.email}) [{req.role}]
            </div>
            <div>Requested at: {req.requested_at}</div>
            <div className="flex gap-2 mt-2">
              <button
                className="px-3 py-1 text-white bg-green-600 rounded"
                onClick={() => handleAction(req.Request_Id, "accept", "Account unsuspended after review.")}
              >
                Accept & Unsuspend
              </button>
              <button
                className="px-3 py-1 text-white bg-red-600 rounded"
                onClick={() => handleAction(req.Request_Id, "reject", "Request rejected.")}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}