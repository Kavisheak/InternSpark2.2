


import AdminMain from "./Components/AdminComponent/Dashboard/AdminMain"



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyMain from './Components/CompanyComponents/CompanyMain';
import AdvertismentPage from './Components/GuestComponents/AdvertismentPage';



function App() {
  return (

    <>
     { /* <AdvertismentPage/>
      <CompanyMain/> */}
      
    
  


    <Router>
      <Routes>
        <Route path="/" element={<AdvertismentPage />} />
        <Route path="/company/*" element={<CompanyMain />} />
        <Route path="/admin" element={<AdminMain/>} />
      </Routes>
    </Router>
    </>
  );

}

export default App;
