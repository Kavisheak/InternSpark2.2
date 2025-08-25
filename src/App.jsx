import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages and Components
import AdvertismentPage from "./Components/GuestComponents/AdvertismentPage";
import AuthPage from "./Components/Login_Register/AuthPage";
import CompanyMain from "./Components/CompanyComponents/CompanyMain";
import StudentMain from "./Components/StudentComponents/StudentMain";
import AdminMain from "./Components/AdminComponent/AdminMain";
import ScrollToTop from "./Components/ScrollToTop";
import ForgotPasswordPage from "./Components/Login_Register/ForgotPasswordPage";
import ResetPasswordPage from "./Components/Login_Register/ResetPasswordPage";

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


      {/* Main Route Handling */}
      <Routes>
        <Route path="/" element={<AdvertismentPage />} />
        <Route path="/login" element={<AuthPage initialIsLogin={true} />} />
        <Route path="/register" element={<AuthPage initialIsLogin={false} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Main Dashboards */}
        <Route path="/company/*" element={<CompanyMain />} />
        <Route path="/student/*" element={<StudentMain />} />
        <Route path="/admin/*" element={<AdminMain />} />
      </Routes>
    </Router>
  );
}

export default App;
