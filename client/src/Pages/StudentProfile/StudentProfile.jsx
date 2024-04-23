import React ,{useEffect}from 'react';
import StudentDetails from '../../Components/StudentDetails/StudentDetails';
import InternshipDetails from '../../Components/InternshipDetails/InternshipDetails';
import ProjectDetails from '../../Components/ProjectDetails/ProjectDetails';
import "./StudentProfile.scss";

export default function StudentProfile() {
  useEffect(() => {
    // Prevent the user from navigating back using the browser's back button
    const disableBackButton = () => {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
      };
    };

    disableBackButton();

    // Cleanup on component unmount
    return () => {
      window.onpopstate = null;
    };
  }, []);
  return (
    <div className='StudentProfileMainContainer'>
      <StudentDetails />
      <InternshipDetails />
      {/* <ProjectDetails /> */}
    </div>
  )
}
