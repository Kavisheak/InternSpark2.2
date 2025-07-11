
// <<<<<<< HEAD
import AdminMain from "./Components/AdminComponent/AdminMain"
// =======
// import AdminMain from "./Components/AdminComponent/Dashboard/AdminMain";
// >>>>>>> ccd297f95c84d9dcd3a455d411d75a382f10c655
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyMain from './Components/CompanyComponents/CompanyMain';
import AdvertismentPage from './Components/GuestComponents/AdvertismentPage';



import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AuthPage from "./Components/Login_Register/AuthPage";
import StudentMain from "./Components/StudentComponents/StudentMain";




// <<<<<<< HEAD

// =======
// >>>>>>> ccd297f95c84d9dcd3a455d411d75a382f10c655
function App() {

   return (



    <Router>
      <Routes>
        <Route path="/" element={<AdvertismentPage />} />
        <Route path="/login" element={<AuthPage initialIsLogin={true} />} />
        <Route path="/register" element={<AuthPage initialIsLogin={false} />} />
        <Route path="/company/*" element={<CompanyMain />} />
{/* <<<<<<< HEAD */}
        <Route path="/admin/*" element={<AdminMain />} />
=======
        {/* <Route path="/admin" element={<AdminMain />} /> */}
{/* >>>>>>> ccd297f95c84d9dcd3a455d411d75a382f10c655 */}
        
        <Route path="/student/*" element={<StudentMain />} />
        
      </Routes>
    </Router>
      
    
      
  );
}

export default App;