import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages and Components
import AdvertismentPage from "./Components/GuestComponents/AdvertismentPage";
import AuthPage from "./Components/Login_Register/AuthPage";
import CompanyMain from "./Components/CompanyComponents/CompanyMain";
import StudentMain from "./Components/StudentComponents/StudentMain";
import AdminMain from "./Components/AdminComponent/AdminMain";
import ScrollToTop from "./Components/ScrollToTop";

// Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

function App() {
  return (
    <Router>
      <ScrollToTop />

      {/* Global Toast Notifications */}
<Toaster
  position="top-center"
  toastOptions={{
    // Default toast styles
    style: {
      background: "#002147", // Oxford Blue
      color: "#fff",
      fontSize: "0.875rem",
      padding: "12px 16px",
      borderRadius: "0.75rem",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    },
    // Success toast
    success: {
      style: {
        background: "#002147",
        borderLeft: "6px solid #FFA500", // Orange stripe
      },
      iconTheme: {
        primary: "#FFA500",
        secondary: "#fff",
      },
    },
    // Error toast
    error: {
      style: {
        background: "#002147",
        borderLeft: "6px solid #FF4C4C", // Red stripe
      },
      iconTheme: {
        primary: "#FF4C4C",
        secondary: "#fff",
      },
    },
  }}
/>

      {/* Main Route Handling */}
      <Routes>
        <Route path="/" element={<AdvertismentPage />} />
        <Route path="/login" element={<AuthPage initialIsLogin={true} />} />
        <Route path="/register" element={<AuthPage initialIsLogin={false} />} />

        {/* Main Dashboards */}
        <Route path="/company/*" element={<CompanyMain />} />
        <Route path="/student/*" element={<StudentMain />} />
        <Route path="/admin/*" element={<AdminMain />} />
      </Routes>
    </Router>
  );
}

export default App;
