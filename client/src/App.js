import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import StudentProfile from './Pages/StudentProfile/StudentProfile';
import StudentDetailsForm from './Components/StudentDetails/StudentDetailsForm/StudentDetailsForm';
import InternshipDetailsForm from './Components/InternshipDetails/InternShipDetailsForm/InternshipDetailsForm';
import ProjectDetailsForm from './Components/ProjectDetails/ProjectDetailsForm/ProjectDetailsForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<StudentProfile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/form/studentDetails' element={<StudentDetailsForm />} />
        <Route path='/form/internshipDetails' element={<InternshipDetailsForm />} />
        <Route path='/form/projectDetails' element={<ProjectDetailsForm />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

