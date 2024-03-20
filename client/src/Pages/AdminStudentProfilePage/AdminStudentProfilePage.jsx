import React from 'react';
import "./AdminStudentProfilePage.scss";
import { useAuth } from '../../Utils/Context';

export default function AdminStudentProfilePage() {
    const {selectedStudent} = useAuth();
    return (
        <div className='AdminStudentProfilePageContainer'>
            <div className="studentDetailsBox">
                {selectedStudent.Roll_No ? (
                    <div>
                        <h1>Student Details</h1>
                        <p><strong>Name : </strong>{selectedStudent.Name}</p>
                        <p><strong>Roll No : </strong>{selectedStudent.Roll_No}</p>
                        <p><strong>Registration No : </strong>{selectedStudent.Registration_No}</p>
                        <p><strong>Date of Birth : </strong>{selectedStudent.Date_of_Birth}</p>
                        <p><strong>Course : </strong>{selectedStudent.Course}</p>
                        <p><strong>Department : </strong>{selectedStudent.Department}</p>
                        <p><strong>Batch : </strong>{selectedStudent.Year_of_Joining}-{selectedStudent.Year_of_Passing}</p>
                        <p><strong>Phone No : </strong>{selectedStudent.Phone_No}</p>
                        <p><strong>Email : </strong>{selectedStudent.Email}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="internshipDetailsBox">
                {selectedStudent.Internship_Type && (
                    <div>
                        <h1>Internship Details</h1>
                        <p><strong>Internship Type: </strong>{selectedStudent.Internship_Type}</p>
                        <p><strong>Title: </strong>{selectedStudent.Internship_Title}</p>
                        <p><strong>Start Date: </strong>{selectedStudent.Internship_Start_Date}</p>
                        <p><strong>End Date: </strong>{selectedStudent.Internship_End_Date}</p>
                        <p><strong>Organisation: </strong>{selectedStudent.Internship_Organisation}</p>
                        <p><strong>Guide Name: </strong>{selectedStudent.Internship_Guide_Name}</p>
                        <p><strong>Guide Designation: </strong>{selectedStudent.Internship_Guide_Designation}</p>
                        <p><strong>Description: </strong>{selectedStudent.Internship_Description}</p>
                        <p><strong>Certificate Link: </strong>{selectedStudent.Internship_Certificate_Link}</p>
                        <p><strong>Report Link: </strong>{selectedStudent.Internship_Report_Link}</p>
                    </div>
                )}
            </div>
            <div className="projectDetailsBox">
                {selectedStudent.Project_Type && (<div>

                    <h1>Project Details</h1>
                    <p><strong>Project Type: </strong>{selectedStudent.Project_Type}</p>
                    <p><strong>Title: </strong>{selectedStudent.Project_Title}</p>
                    <p><strong>Start Date: </strong>{selectedStudent.Project_Start_Date}</p>
                    <p><strong>End Date: </strong>{selectedStudent.Project_End_Date}</p>
                    <p><strong>Organisation: </strong>{selectedStudent.Project_Organisation}</p>
                    <p><strong>Guide Name: </strong>{selectedStudent.Project_Guide_Name}</p>
                    <p><strong>Guide Designation: </strong>{selectedStudent.Project_Guide_Designation}</p>
                    <p><strong>Description: </strong>{selectedStudent.Project_Description}</p>
                    <p><strong>Certificate Link: </strong>{selectedStudent.Project_Certificate_Link}</p>
                    <p><strong>Report Link: </strong>{selectedStudent.Project_Report_Link}</p>
                </div>)
                }
            </div>
        </div>
    )
}
