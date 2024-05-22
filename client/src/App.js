import React from 'react';
import { Routes, Route } from "react-router-dom";
import StudentLogin from './Pages/Login/StudentLogin';
import StudentRegister from './Pages/Register/StudentRegister';
import AdminLogin from './Pages/Login/AdminLogin';
import AdminRegister from './Pages/Register/AdminRegister';
import StudentProfile from './Pages/StudentProfile/StudentProfile';
import StudentDetailsForm from './Components/StudentDetails/StudentDetailsForm/StudentDetailsForm';
import InternshipDetailsForm from './Components/InternshipDetails/InternShipDetailsForm/InternshipDetailsForm';
import ProjectDetailsForm from './Components/ProjectDetails/ProjectDetailsForm/ProjectDetailsForm';
import StudentDetailsUpdateForm from './Components/StudentDetails/StudentDetailsUpdateForm/StudentDetailsUpdateForm';
import InternshipDetailsUpdateForm from './Components/InternshipDetails/InternshipDetailsUpdateForm/InternshipDetailsUpdateForm';
import ProjectDetailsUpdateForm from './Components/ProjectDetails/ProjectDetailsUpdateForm/ProjectDetailsUpdateForm';
import AdminStudentProfilePage from './Pages/AdminStudentProfilePage/AdminStudentProfilePage';
import PendingCorrection from './Pages/AdminPage/PendingCorrection';
import AdminPage from './Pages/AdminPage/AdminPage';
import Navbar from './Components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<StudentLogin />} />
        <Route path='/login/admin' element={<AdminLogin />} />
        <Route path='/register/student' element={<StudentRegister />} />
        <Route path='/register/admin' element={<AdminRegister />} />
        <Route path='/studentProfile' element={<StudentProfile />} />
        <Route path='/form/studentDetails' element={<StudentDetailsForm />} />
        <Route path='/form/internshipDetails' element={<InternshipDetailsForm />} />
        <Route path='/form/projectDetails' element={<ProjectDetailsForm />} />
        <Route path='/form/update/studentDetails' element={<StudentDetailsUpdateForm />} />
        <Route path='/form/update/internshipDetails/:internshipId' element={<InternshipDetailsUpdateForm />} />
        <Route path='/form/update/projectDetails/:projectId' element={<ProjectDetailsUpdateForm />} />
        <Route path='/adminPage' element={<AdminPage/>} />
        <Route path='/from/adminSide/StudentProfile' element={<AdminStudentProfilePage/>} />
        <Route path='/adminPage/pendingCorrections' element={<PendingCorrection/>} />
      </Routes>
      <ToastContainer />
    </>
  )
}
