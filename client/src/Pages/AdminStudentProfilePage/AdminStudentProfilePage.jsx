import React from 'react';
import AdminSideStudentView from './AdminSideStudentView';
import AdminSideInternshipView from './AdminSideInternshipView';
import AdminSideProjectView from './AdminSideProjectView';


export default function AdminStudentProfilePage() {
  return (
    <div className='AdminStudentProfilePage_MainContainer'>
     <AdminSideStudentView/>
     <AdminSideInternshipView/>
     <AdminSideProjectView/>
    </div>
  )
}