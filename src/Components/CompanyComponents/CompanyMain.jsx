import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyNavbar from './CompanyNavbar';
import CompanyHome from './CompanyHome';
import CompanyDashboard from './CompanyDashboard';
import CompanyMyInternships from './CompanyMyInternships';
import CompanyApplications from './CompanyApplications';
import CompanyProfile from './CompanyProfile';
import PostInternshipForm from './PostInternshipForm';

const CompanyMain = () => {
  return (
    <div className='all-bg'>
     
      <CompanyNavbar />
      <Routes>
        <Route path="/" element={<CompanyHome/>} />
        <Route path="/dashboard" element={<CompanyDashboard />} />
        <Route path="/internships" element={<CompanyMyInternships />} />
        <Route path="/applications" element={<CompanyApplications />} />
        <Route path="/applications/:applicantId" element={<CompanyApplications />} />
        <Route path="/profile" element={<CompanyProfile />} />
        <Route path='/postinternship' element={<PostInternshipForm />} />
        <Route path="/postinternship/:id" element={<PostInternshipForm />} />
      </Routes>
    
    </div>
  )
}

export default CompanyMain
