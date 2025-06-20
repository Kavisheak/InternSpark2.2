import AdminMain from "./Components/AdminComponent/Dashboard/AdminMain"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyMain from './Components/CompanyComponents/CompanyMain';
import AdvertismentPage from './Components/GuestComponents/AdvertismentPage';
import Index from './Components/AdminComponent/UserManagement';




function App() {
   return (

  <Router>
    <Routes>
      
      <Route path="/" element={<AdvertismentPage />} />
      <Route path="/company/*" element={<CompanyMain />} />
        <Route path="/admin" element={<AdminMain/>} />
      <Route path="/user/*" element={<Index />} />
      
    </Routes>
 </Router>
    
<<<<<<< HEAD
=======


  );
>>>>>>> 79f46cc1010e94a1180e23560a800e8dd56c3c72

   )

}

export default App;
