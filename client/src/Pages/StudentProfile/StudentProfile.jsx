import React from 'react';
import "./StudentProfile.scss";
import StudentDetails from '../../Components/StudentDetails/StudentDetails';
import InternshipDetails from '../../Components/InternshipDetails/InternshipDetails';
import ProjectDetails from '../../Components/ProjectDetails/ProjectDetails';

export default function StudentProfile() {
  return (
    <div>
      <StudentDetails/>
      <InternshipDetails/>
      <ProjectDetails/>
    </div>
  )
}
