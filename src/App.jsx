
import AdminMain from "./Components/AdminComponent/Dashboard/AdminMain"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyMain from './Components/CompanyComponents/CompanyMain';
import AdvertismentPage from './Components/GuestComponents/AdvertismentPage';
<<<<<<< HEAD
import Index from './Components/AdminComponent/UserManagement';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AuthPage from "./Components/Login_Register/AuthPage";
import AvailableInternship from "./Components/StudentComponents/AvailableInternship";
=======




import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AuthPage from "./Components/Login_Register/AuthPage";
import StudentMain from "./Components/StudentComponents/StudentMain";
>>>>>>> 7ff798b656360a3a99856d9259538fea6018ecdd



function App() {

   return (

<<<<<<< HEAD
  <Router>
    <Routes>
      
      <Route path="/" element={<AdvertismentPage />} />
      <Route path="/company/*" element={<CompanyMain />} />
        <Route path="/admin" element={<AdminMain/>} />
      <Route path="/user/*" element={<Index />} />
      <Route path="/auth/*" element={<AuthPage/>}/>
      <Route path="/student/" element={<AvailableInternship/>}/>
    </Routes>
 </Router>
    
=======
>>>>>>> 7ff798b656360a3a99856d9259538fea6018ecdd

    <Router>
      <Routes>
        <Route path="/" element={<AdvertismentPage />} />
        <Route path="/login" element={<AuthPage initialIsLogin={true} />} />
        <Route path="/register" element={<AuthPage initialIsLogin={false} />} />
        <Route path="/company/*" element={<CompanyMain />} />
        <Route path="/admin" element={<AdminMain />} />
        
        <Route path="/student/*" element={<StudentMain />} />
        
      </Routes>
    </Router>
      

  );
}

export default App;