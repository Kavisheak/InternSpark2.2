import { Routes, Route } from "react-router-dom";
import InternshipDetails from "./InternshipDetails";
import StudentProfile from "./StudentProfile";

import StudentHomepage from "./StudentHomepage";
import Notifications from "./Notification";


const StudentMain = () => {
  return (
    <Routes>
     <Route path="job" element={<InternshipDetails />} />
      <Route path="studentprofile" element={<StudentProfile />} />
      <Route path="notifications" element={<Notifications />} /> {/* fixed */}
      <Route path="internships" element={<AvailableInternship/>}/>
      <Route path="" element={<StudentHomepage />} />
      <Route path="application" element={<Applications/>}/>
    </Routes>
  );
};

export default StudentMain;
