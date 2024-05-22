import React from 'react';
import AdminSideStudentView from './AdminSideStudentView';
import AdminSideInternshipView from './AdminSideInternshipView';
import AdminSideProjectView from './AdminSideProjectView';
import { useAuth } from '../../Utils/Context';
import Api from '../../API/Api';
import { toast } from "react-toastify";
import "./AdminStudentProfilePage.scss";

export default function AdminStudentProfilePage() {
  const { userData, needCorrection, setNeedCorrection } = useAuth(); // Added setNeedCorrection
  const studentID = userData?.studentDetails?.Student_ID;

  const studentData = {
    Student_ID: userData?.studentDetails?.Student_ID,
    Student_UserName: userData?.studentDetails?.UserName,
    Student_RollNo: userData?.studentDetails?.Roll_No,
    Student_Name: userData?.studentDetails?.Name
  }

  const handleMarkForCorrection = async () => {
    try {
      // Insert studentData
      const response = await Api.insertIntoNeedCorrection(studentData);
      if (response && response.message) {
        toast.success(response.message);
        // Append studentData to needCorrection array
        setNeedCorrection(prevNeedCorrection => [...prevNeedCorrection, studentData]);
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error("Error marking for correction:", error);
      toast.error(error);
    }
  };

  const handleAllCorrect = async () => {
    try {
      const response = await Api.deleteNeedCorrectionByStudentID(studentID);
      if (response && response.message) {
        toast.success(response.message);
        // Remove studentData from needCorrection array
        setNeedCorrection(prevNeedCorrection => prevNeedCorrection.filter(student => student.Student_ID !== studentID));
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error(error);
    }
  };

  // Check if the current student's ID exists in needCorrection array
  const isStudentNeedsCorrection = needCorrection.some(student => student.Student_ID === studentID);

  return (
    <div className='AdminStudentProfilePage_MainContainer'>
      {isStudentNeedsCorrection ? (
        <button className="allCorrect" onClick={handleAllCorrect}>All Correct</button>
      ) : (
        <button className="markForCorrection" onClick={handleMarkForCorrection}>Mark For Correction</button>
      )}
      <AdminSideStudentView />
      <AdminSideInternshipView />
      <AdminSideProjectView />
    </div>
  );
}
