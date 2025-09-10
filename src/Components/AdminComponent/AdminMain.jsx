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