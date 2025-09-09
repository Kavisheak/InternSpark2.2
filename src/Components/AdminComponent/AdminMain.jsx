import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./AdminHomePage/AdminDashboard";
import UserManagement from "./UserManagement/UserManagement";
import AdminNavbar from "./AdminHomePage/AdminNavbar";
import InternshipManage from "./InternshipManagement/InternshipManage";
import SystemSettings from "./SystemSettings/Database";
import ReviewRequests from "./ReviewRequests"; // <-- Add this import

const AdminMain = () => {
  return (
    <>
      <AdminNavbar />
      <div className="relative z-50">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#002147",
              color: "#fff",
              fontSize: "0.875rem",
              padding: "12px 16px",
              borderRadius: "0.75rem",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
              marginTop: "3.5rem",
            },
            success: {
              style: { background: "#002147", borderLeft: "6px solid #FFA500" },
              iconTheme: { primary: "#FFA500", secondary: "#fff" },
            },
            error: {
              style: { background: "#002147", borderLeft: "6px solid #FF4C4C" },
              iconTheme: { primary: "#FF4C4C", secondary: "#fff" },
            },
          }}
        />
      </div>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="usermanage" element={<UserManagement />} />
        <Route path="internshipmanage" element={<InternshipManage />} />
        <Route path="settings" element={<SystemSettings />} />
        <Route path="review-requests" element={<ReviewRequests />} /> {/* <-- Add this route */}
      </Routes>
    </>
  );
};

export default AdminMain;