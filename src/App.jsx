import AdminMain from "./Components/AdminComponent/Dashboard/AdminMain"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyMain from './Components/CompanyComponents/CompanyMain';
import AdvertismentPage from './Components/GuestComponents/AdvertismentPage';
import Index from './Components/AdminComponent/UserManagement';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import InternshipDetails from "./Components/StudentComponents/InternshipDetails";
import StudentProfile from "./Components/StudentComponents/StudentProfile";
import Notifications from "./Components/StudentComponents/Notification";
import StudentHomepage from "./Components/StudentComponents/StudentHomepage";




function App() {
   return (

  <Router>
    <Routes>
      
      <Route path="/" element={<AdvertismentPage />} />
      <Route path="/company/*" element={<CompanyMain />} />
        <Route path="/admin" element={<AdminMain/>} />
      <Route path="/user/*" element={<Index />} />
      <Route path="/job/*" element={<InternshipDetails />} />
      <Route path="/studentprofile/*" element={<StudentProfile />} />
      <Route path="/notification/*" element={<Notifications />} />
      <Route path="/student/*" element={<StudentHomepage />} />
      
      
    </Routes>
 </Router>
    


  );


}

export default App;