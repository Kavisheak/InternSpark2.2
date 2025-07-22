

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyMain from './Components/CompanyComponents/CompanyMain';
import AdvertismentPage from './Components/GuestComponents/AdvertismentPage';




import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AuthPage from "./Components/Login_Register/AuthPage";
import StudentMain from "./Components/StudentComponents/StudentMain";



function App() {

   return (


    <Router>
      <Routes>
        <Route path="/" element={<AdvertismentPage />} />
        <Route path="/login" element={<AuthPage initialIsLogin={true} />} />
        <Route path="/register" element={<AuthPage initialIsLogin={false} />} />
        <Route path="/company/*" element={<CompanyMain />} />
        
        
        <Route path="/student/*" element={<StudentMain />} />
        
      </Routes>
    </Router>
      

  );
}

export default App;