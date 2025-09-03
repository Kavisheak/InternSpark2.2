import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer";
import ApplicationSidebar from "./ApplicationSidebar";
import ApplicationDetailPanel from "./ApplicationDetailPanel";
import { useLocation } from "react-router-dom";

export default function CompanyApplications() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const internshipId = params.get("internshipId")
    ? Number(params.get("internshipId"))
    : null;
  const urlSelectedId = params.get("selectedId")
    ? Number(params.get("selectedId"))
    : null;

  const [applications, setApplications] = useState([]);
  const [selectedId, setSelectedId] = useState(urlSelectedId);
  const [searchTerm, setSearchTerm] = useState("");
  const detailRef = useRef(null);
  const [detailHeight, setDetailHeight] = useState(0);

  // Fetch applications for the selected internship only
  useEffect(() => {
    let url = "http://localhost/InternBackend/company/api/applications.php";
    if (internshipId) url += `?internshipId=${internshipId}`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.applications)) {
          setApplications(res.data.applications);
        } else {
          setApplications([]);
        }
      })
      .catch(() => setApplications([]));
  }, [internshipId]);

  // Update selectedId if URL changes (user clicks "View" in dashboard)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSelectedId = params.get("selectedId")
      ? Number(params.get("selectedId"))
      : null;
    setSelectedId(urlSelectedId);
  }, [location.search]);

  // After applications are loaded, set selectedId if not set or invalid
  useEffect(() => {
    if (applications.length === 0) return;
    if (!selectedId || !applications.some((app) => app.id === selectedId)) {
      setSelectedId(applications[0].id);
    }
  }, [applications, selectedId]);

  // Track detail panel height
  useEffect(() => {
    if (detailRef.current) {
      setDetailHeight(detailRef.current.offsetHeight);
    }
  }, [selectedId, applications]);

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

  return (
    <div className="min-h-screen bg-[#01165A] text-gray-100">
      <div className="fade-in-up">
        <div className="flex flex-col md:flex-row items-start gap-6 p-6 min-h-[calc(100vh-8rem)] bg-white shadow-lg">
          
          <div className="flex-[2] w-full">
            <ApplicationSidebar
              applications={applications}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              detailHeight={detailHeight}
            />
          </div>

          
          {selected ? (
            <div ref={detailRef} className="flex-[3] w-full">
              <ApplicationDetailPanel
                selected={selected}
                handleStatusUpdate={handleStatusUpdate}
                primaryColor="#01165A"
              />
            </div>
          ) : (
            <div className="flex-[5] w-full p-4 text-center text-gray-500">
              No application selected.
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
