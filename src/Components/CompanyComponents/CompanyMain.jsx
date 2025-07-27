import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import CompanyHome from "./CompanyHome/CompanyHome";
import CompanyDashboard from "./CompanyDashboard/CompanyDashboard";
import CompanyMyInternships from "./CompanyMyInternships/CompanyMyInternships";
import CompanyApplications from "./CompanyApplications/CompanyApplications";
import CompanyProfile from "./CompanyProfile/CompanyProfile";
import PostInternshipForm from "./PostInternshipForm";

// Navbar
import CompanyNavbar from "./CompanyNavbar"; // ✅ Make sure this is correctly imported

const CompanyMain = () => {
  return (
    <div className="all-bg">
      {/* ✅ Navbar at top */}
      <CompanyNavbar />

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
              marginTop: "3.5rem", // Adjust based on navbar height
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
        <Route path="/" element={<CompanyHome />} />
        <Route path="/dashboard" element={<CompanyDashboard />} />
        <Route path="/internships" element={<CompanyMyInternships />} />
        <Route path="/applications" element={<CompanyApplications />} />
        <Route path="/applications/:roleSlug" element={<CompanyApplications />} />
        <Route path="/profile" element={<CompanyProfile />} />
        <Route path="/postinternship" element={<PostInternshipForm />} />
        <Route path="/postinternship/:id" element={<PostInternshipForm />} />
      </Routes>
    </div>
  );
};

export default CompanyMain;
