
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminHomePage/AdminDashboard";
import UserManagement from "./UserManagement/UserManagement";
import AdminNavbar from "./AdminHomePage/AdminNavbar";
import InternshipManage from "./InternshipManagement/InternshipManage";
import SystemSettings from "./SystemSettings/Database";



// Dummy components for missing routes


const AdminMain = () => {
  return (
    <>
      <AdminNavbar/>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="usermanage" element={<UserManagement />} />
        <Route path="internshipmanage" element={<InternshipManage/>}/>
        <Route path="settings" element={<SystemSettings/>}/>
      </Routes>
    </>
  
  );
};

export default AdminMain;
