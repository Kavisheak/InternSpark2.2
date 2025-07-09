import AdminMain from "./Components/AdminComponent/Dashboard/AdminMain"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyMain from './Components/CompanyComponents/CompanyMain';
import AdvertismentPage from './Components/GuestComponents/AdvertismentPage';
import Index from './Components/AdminComponent/UserManagement';
import ContentManagement from "./Components/AdminComponent/Content/ContentManagement";

import InternshipContent from "./Components/AdminComponent/Content/InternshipContent";
import AdminDashboard from "./Components/AdminComponent/AdminHomePage/AdminDashboard";






function App() {
   return (

//   <Router>
//     <Routes>
      
//       <Route path="/" element={<AdvertismentPage />} />
//       <Route path="/company/*" element={<CompanyMain />} />
//         <Route path="/admin" element={<AdminMain/>} />
//       <Route path="/user/*" element={<Index />} />
       

       

//     </Routes>
//  </Router>
   
      
       <AdminDashboard/>

  );


}

export default App;
