import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages and Components
import AdvertismentPage from "./Components/GuestComponents/AdvertismentPage";
import AuthPage from "./Components/Login_Register/AuthPage";
import CompanyMain from "./Components/CompanyComponents/CompanyMain";
import StudentMain from "./Components/StudentComponents/StudentMain";
import AdminMain from "./Components/AdminComponent/AdminMain";
import ScrollToTop from "./Components/ScrollToTop";
import ForgotPasswordPage from "./Components/Login_Register/ForgotPasswordPage";
import ResetPasswordPage from "./Components/Login_Register/ResetPasswordPage";
import LearnMore from "./Components/GuestComponents/LearnMore";

// Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Auth wrapper
const RequireAuth = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AdvertismentPage />} />
        <Route path="/login" element={<AuthPage initialIsLogin={true} />} />
        <Route path="/register" element={<AuthPage initialIsLogin={false} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/learnmore" element={<LearnMore />} />

        {/* Protected Dashboards */}
        <Route path="/company/*" element={
          <RequireAuth>
            <CompanyMain />
          </RequireAuth>
        } />
        <Route path="/student/*" element={
          <RequireAuth>
            <StudentMain />
          </RequireAuth>
        } />
        <Route path="/admin/*" element={
          <RequireAuth>
            <AdminMain />
          </RequireAuth>
        } />
      </Routes>
    </Router>
  );
}

export default App;