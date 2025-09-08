import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Footer from "../Footer";
import ApplicationSidebar from "./ApplicationSidebar";
import ApplicationDetailPanel from "./ApplicationDetailPanel";
import { useLocation } from "react-router-dom";

export default function CompanyApplications() {
  const location = useLocation();
  const [applications, setApplications] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [detailHeight, setDetailHeight] = useState("auto");
  const detailRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const internshipId = params.get("internshipId");
    let url = "http://localhost/InternBackend/company/api/applications.php";
    if (internshipId) url += `?internshipId=${internshipId}`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.applications)) {
          setApplications(res.data.applications);

          // Get selectedId from query string
          const selectedFromQuery = params.get("selectedId");
          if (selectedFromQuery) {
            setSelectedId(Number(selectedFromQuery));
          } else if (res.data.applications.length > 0) {
            setSelectedId(res.data.applications[0].id);
          } else {
            setSelectedId(null);
          }
        } else {
          setApplications([]);
          setSelectedId(null);
        }
      })
      .catch(() => {
        setApplications([]);
        setSelectedId(null);
      });
  }, [location.search]);

  const handleStatusUpdate = (id, newStatus) => {
    axios
      .post(
        "http://localhost/InternBackend/company/api/updateApplicationStatus.php",
        { application_id: id, status: newStatus },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          setApplications((apps) =>
            apps.map((app) =>
              app.id === id ? { ...app, status: newStatus } : app
            )
          );
        } else {
          alert(res.data.message || "Failed to update status");
        }
      })
      .catch(() => alert("Failed to update status"));
  };

  const selected = applications.find((app) => app.id === selectedId);

  useEffect(() => {
    if (detailRef.current) {
      setDetailHeight(detailRef.current.offsetHeight);
    }
  }, [selected]);

  return (
    <div className="min-h-screen bg-[#01165A] text-gray-100">
      <div className="fade-in-up">
        <div className="flex flex-col items-start gap-6 p-6 bg-white shadow-lg md:flex-row">
          <ApplicationSidebar
            applications={applications}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            detailHeight={detailHeight}
          />
          {selected ? (
            <div ref={detailRef} className="flex-1">
              <ApplicationDetailPanel
                selected={selected}
                handleStatusUpdate={handleStatusUpdate}
                primaryColor="#01165A"
              />
            </div>
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