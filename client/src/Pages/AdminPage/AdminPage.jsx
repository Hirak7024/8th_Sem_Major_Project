import React, { useState } from 'react';
import Api from "../../API/Api.js";
import { toast } from "react-toastify";
import "./AdminPage.scss";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    Roll_No: "",
    Registration_No: "",
    Department: "",
    Year_of_Joining: null,
    Year_of_Passing: null,
    Internship_Type: "",
    Project_Type: ""
  });
  const [studentDetails, setStudentDetails] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await Api.fetchStudentDetails(formData);
      setStudentDetails(data.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
      toast.error("Error fetching student details")
    }
  };


  return (
    <div className='AdminPageContainer'>
      <div className="adminFormContainer">
        <form className='adminForm' onSubmit={handleSubmit}>
          <div className="labelInput">
            <label htmlFor="rollNo">Student's Roll No : </label>
            <input
              type="text"
              id='rollNo'
              name='Roll_No'
              value={formData.Roll_No}
              onChange={handleChange}
            />
            {/* <p className="error">{errors.Email}</p> */}
          </div>
          <div className="labelInput">
            <label htmlFor="registrationNo">Student's Registration No : </label>
            <input
              type="text"
              id='registrationNo'
              name='Registration_No'
              value={formData.Registration_No}
              onChange={handleChange}
            />
            {/* <p className="error">{errors.Email}</p> */}
          </div>
          <div className="labelInput">
            <label htmlFor="department">Student's Department : </label>
            <select
              id="department"
              name="Department"
              value={formData.Department}
              onChange={handleChange}
            >
              <option value="">Select Student's Department </option>
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Instrumentation Engineering">Instrumentation Engineering</option>
            </select>
          </div>
          <div className="labelInput">
            <label htmlFor="yearOfJoining">Year of Joining : </label>
            <input
              type="text"
              id='yearOfJoining'
              name='Year_of_Joining'
              value={formData.Year_of_Joining}
              onChange={handleChange}
            />
            {/* <p className="error">{errors.Email}</p> */}
          </div>
          <div className="labelInput">
            <label htmlFor="yearOfPassing">Year of Passing : </label>
            <input
              type="text"
              id='yearOfPassing'
              name='Year_of_Passing'
              value={formData.Year_of_Passing}
              onChange={handleChange}
            />
            {/* <p className="error">{errors.Email}</p> */}
          </div>
          <div className="labelInput">
            <label htmlFor="internshipType">Internship Type : </label>
            <select
              id="internshipType"
              name="Internship_Type"
              value={formData.Internship_Type}
              onChange={handleChange}
            >
              <option value="">Select Internship Type</option>
              <option value="Social Internship">Social Internship</option>
              <option value="Academic Internship">Academic Internship</option>
              <option value="Industrial Internship">Industrial Internship</option>
            </select>
          </div>
          <div className="labelInput">
            <label htmlFor="projectType">Project Type : </label>
            <select
              id="projectType"
              name="Project_Type"
              value={formData.Project_Type}
              onChange={handleChange}
            >
              <option value="">Select Project Type</option>
              <option value="Minor Project">Minor Project</option>
              <option value="Major Project">Major Project</option>
            </select>
          </div>
          <button className='adminBtn' type='submit'>Search</button>
        </form>
      </div>
      <div className="studentTableContainer">
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Registration No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone_No</th>
              <th>Date_of_Birth</th>
              <th>Course</th>
              <th>Department</th>
              <th>Year_of_Joining</th>
              <th>Year_of_Passing</th>
              <th>Internship_Type</th>
              <th>Internship_Title</th>
              <th>Internship_Start_Date</th>
              <th>Internship_End_Date</th>
              <th>Project_Type</th>
              <th>Project_Title</th>
              <th>Project_Start_Date</th>
              <th>Project_End_Date</th>
            </tr>
          </thead>
          <tbody>
            {studentDetails.map((student) => (
              <tr key={student.Student_ID}>
                <td>{student.Roll_No}</td>
                <td>{student.Registration_No}</td>
                <td>{student.Name}</td>
                <td>{student.Email}</td>
                <td>{student.Phone_No}</td>
                <td>{student.Date_of_Birth}</td>
                <td>{student.Course}</td>
                <td>{student.Department}</td>
                <td>{student.Year_of_Joining}</td>
                <td>{student.Year_of_Passing}</td>
                <td>{student.Internship_Type}</td>
                <td>{student.Internship_Title}</td>
                <td>{student.Internship_Start_Date}</td>
                <td>{student.Internship_End_Date}</td>
                <td>{student.Project_Type}</td>
                <td>{student.Project_Title}</td>
                <td>{student.Project_Start_Date}</td>
                <td>{student.Project_End_Date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
