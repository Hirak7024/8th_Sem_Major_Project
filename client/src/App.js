import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import StudentProfile from './Pages/StudentProfile/StudentProfile';
import StudentDetailsForm from './Components/StudentDetails/StudentDetailsForm/StudentDetailsForm';
import InternshipDetailsForm from './Components/InternshipDetails/InternShipDetailsForm/InternshipDetailsForm';
import ProjectDetailsForm from './Components/ProjectDetails/ProjectDetailsForm/ProjectDetailsForm';
import StudentDetailsUpdateForm from './Components/StudentDetails/StudentDetailsUpdateForm/StudentDetailsUpdateForm';
import InternshipDetailsUpdateForm from './Components/InternshipDetails/InternshipDetailsUpdateForm/InternshipDetailsUpdateForm';
import ProjectDetailsUpdateForm from './Components/ProjectDetails/ProjectDetailsUpdateForm/ProjectDetailsUpdateForm';
import AdminPage from './Pages/AdminPage/AdminPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar/Navbar';
import AdminStudentProfilePage from './Pages/AdminStudentProfilePage/AdminStudentProfilePage';

export default function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/studentProfile' element={<StudentProfile />} />
        <Route path='/register' element={<Register />} />
        <Route path='/form/studentDetails' element={<StudentDetailsForm />} />
        <Route path='/form/internshipDetails' element={<InternshipDetailsForm />} />
        <Route path='/form/projectDetails' element={<ProjectDetailsForm />} />
        <Route path='/form/update/studentDetails' element={<StudentDetailsUpdateForm />} />
        <Route path='/form/update/internshipDetails/:internshipId' element={<InternshipDetailsUpdateForm />} />
        <Route path='/form/update/projectDetails/:projectId' element={<ProjectDetailsUpdateForm />} />
        <Route path='/adminPage' element={<AdminPage/>} />
        <Route path='/from/adminSide/StudentProfile' element={<AdminStudentProfilePage/>} />
      </Routes>
      <ToastContainer />
    </>
  )
}
