import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer";
import ApplicationSidebar from "./ApplicationSidebar";
import ApplicationDetailPanel from "./ApplicationDetailPanel";

export default function CompanyApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/InternBackend/company/api/applications.php", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.applications)) {
          setApplications(res.data.applications);
          if (res.data.applications.length > 0)
            setSelectedId(res.data.applications[0].id);
        }
      })
      .catch(() => setApplications([]));
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    setApplications((apps) =>
      apps.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    // TODO: POST to backend to update status
  };

  const selected = applications.find((app) => app.id === selectedId);

  return (
    <div className="min-h-screen bg-[#01165A] text-gray-100">
      <div className="fade-in-up">
        <div className="flex flex-col md:flex-row items-start gap-6 p-6 min-h-[calc(100vh-8rem)] bg-white shadow-lg">
          <ApplicationSidebar
            applications={applications}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          {selected ? (
            <ApplicationDetailPanel
              selected={selected}
              handleStatusUpdate={handleStatusUpdate}
              primaryColor="#01165A"
            />
          ) : (
            <div className="w-full p-4 text-center text-gray-500 md:w-2/3">
              No application selected.
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}