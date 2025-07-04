import AdminMain from "./Components/AdminComponent/Dashboard/AdminMain";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyMain from "./Components/CompanyComponents/CompanyMain";
import AdvertismentPage from "./Components/GuestComponents/AdvertismentPage";
import Index from "./Components/AdminComponent/UserManagement";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AuthPage from "./Components/Login_Register/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdvertismentPage />} />
        <Route path="/login" element={<AuthPage initialIsLogin={true} />} />
        <Route path="/register" element={<AuthPage initialIsLogin={false} />} />
        <Route path="/company/*" element={<CompanyMain />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/user/*" element={<Index />} />
        
      </Routes>
    </Router>
  );
}

export default App;
