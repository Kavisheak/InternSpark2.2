import { Routes, Route } from "react-router-dom";
import InternshipDetails from "./InternshipDetails";
import StudentProfile from "./StudentProfile";

import StudentHomepage from "./StudentHomepage";
import Notifications from "./Notification";
import AvailableInternship from "./AvailableInternship";
import MyApplications from "./Applications";
import StudentNavbar from "./StudentNavbar";
import Bookmarks from "./Bookmarks";
import AppliedInternshipDetails from "./AppliedInternshipDetails";


const StudentMain = () => {
  return (
    <div>
      <StudentNavbar/>
    <Routes>
     <Route path="job/:id" element={<InternshipDetails />} />
      <Route path="studentprofile" element={<StudentProfile />} />
      <Route path="notifications" element={<Notifications />} /> {/* fixed */}
      <Route path="internships" element={<AvailableInternship/>}/>
      <Route path="" element={<StudentHomepage />} />
      <Route path="applications" element={<MyApplications/>}/>
      <Route path="applications/:id" element={<AppliedInternshipDetails />} />
      <Route path="bookmarks" element={<Bookmarks />} />
    </Routes>
    </div>
  );
};

export default StudentMain;