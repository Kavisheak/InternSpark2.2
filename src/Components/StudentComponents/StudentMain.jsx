import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import InternshipDetails from "./InternshipDetails";
import StudentProfile from "./StudentProfile";
import StudentNavbar from "./StudentNavbar";
import StudentHomepage from "./StudentHomepage";
import Notifications from "./Notification";
import AvailableInternship from "./AvailableInternship";
import MyApplications from "./Applications";
import Bookmarks from "./Bookmarks";
import AppliedInternshipDetails from "./AppliedInternshipDetails";

const StudentMain = () => {
  return (
    <div className="all-bg">
      {/* ✅ Navbar at top */}
      <StudentNavbar />

      {/* ✅ Toast just below navbar */}
      <div className="relative z-50">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#002147", // Oxford Blue
              color: "#fff",
              fontSize: "0.875rem",
              padding: "12px 16px",
              borderRadius: "0.75rem",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
              marginTop: "3.9rem", // Adjust based on navbar height
            },
            success: {
              style: {
                background: "#002147",
                borderLeft: "6px solid #FFA500",
              },
              iconTheme: {
                primary: "#FFA500",
                secondary: "#fff",
              },
            },
            error: {
              style: {
                background: "#002147",
                borderLeft: "6px solid #FF4C4C",
              },
              iconTheme: {
                primary: "#FF4C4C",
                secondary: "#fff",
              },
            },
          }}
        />
      </div>

      {/* ✅ Page content below toast */}
      <Routes>
        <Route path="/internship/:id" element={<InternshipDetails />} />
        <Route path="job/:id" element={<InternshipDetails />} />
        <Route path="studentprofile" element={<StudentProfile />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="internships" element={<AvailableInternship />} />
        <Route path="" element={<StudentHomepage />} />
        <Route path="applications" element={<MyApplications />} />
        <Route path="applications/:id" element={<AppliedInternshipDetails />} />
        <Route path="bookmarks" element={<Bookmarks />} />
      </Routes>
    </div>
  );
};

export default StudentMain;
