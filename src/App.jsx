import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyMain from './Components/CompanyComponents/CompanyMain';
import AdvertismentPage from './Components/GuestComponents/AdvertismentPage';


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<AdvertismentPage />} />
        <Route path="/company/*" element={<CompanyMain />} />
        {/* <Route path="/student/*" element={<StudentMain />} /> */}
      </Routes>
    </Router>
  );

}

export default App;
