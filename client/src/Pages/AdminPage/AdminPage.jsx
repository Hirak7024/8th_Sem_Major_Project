import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from "../../API/Api.js";
import { toast } from "react-toastify";
import { DataGrid } from '@mui/x-data-grid';
import "./AdminPage.scss";
import { useAuth } from '../../Utils/Context.js';

export default function AdminPage() {
  const {setSelectedStudent} = useAuth();
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
      // Assign Student_ID as the id for each row
      const updatedData = data.data.map((student) => ({
        ...student,
        id: student.Student_ID
      }));
      setStudentDetails(updatedData);
    } catch (error) {
      console.error("Error fetching student details:", error);
      toast.error("Error fetching student details")
    }
  };

  const navigate = useNavigate();

  const handleRowDoubleClick = (params) => {
    const selectedStudentRow = studentDetails.find(student => student.id === params.id);
    setSelectedStudent(selectedStudentRow); // Update context state with selected student details
    navigate('/from/adminSide/StudentProfile'); // Navigate to the student profile page
  };

  const columns = [
    { field: 'Roll_No', sortable: false, filterable: false, headerName: 'Roll No', width: 130 },
    { field: 'Registration_No', sortable: false, filterable: false, headerName: 'Registration No', width: 150 },
    { field: 'Name', sortable: false, filterable: false, headerName: 'Name', width: 150 },
    // { field: 'Email', sortable: false, filterable: false, headerName: 'Email', width: 150 },
    // { field: 'Phone_No', sortable: false, filterable: false, headerName: 'Phone No', width: 150 },
    // { field: 'Date_of_Birth', headerName: 'Date of Birth', sortable: false, filterable: false, width: 150 },
    { field: 'Course', headerName: 'Course', width: 150, sortable: false, filterable: false, },
    { field: 'Department', headerName: 'Department', sortable: false, filterable: false, width: 150 },
    { field: 'Year_of_Joining', headerName: 'Year of Joining', sortable: false, filterable: false, width: 150 },
    { field: 'Year_of_Passing', headerName: 'Year of Passing', sortable: false, filterable: false, width: 150 },
    { field: 'Internship_Type', headerName: 'Internship Type', sortable: false, filterable: false, width: 150 },
    { field: 'Internship_Title', headerName: 'Internship Title', sortable: false, filterable: false, width: 150 },
    { field: 'Internship_Guide_Name', headerName: 'Internship Guide Name', sortable: false, filterable: false, width: 150 },
    { field: 'Internship_Organisation', headerName: 'Internship Organisation', sortable: false, filterable: false, width: 150 },
    // { field: 'Internship_Start_Date', headerName: 'Internship Start Date', sortable: false, filterable: false, width: 200 },
    // { field: 'Internship_End_Date', headerName: 'Internship End Date', sortable: false, filterable: false, width: 200 },
    { field: 'Project_Type', headerName: 'Project Type', sortable: false, filterable: false, width: 150 },
    { field: 'Project_Title', headerName: 'Project Title', sortable: false, filterable: false, width: 150 },
    { field: 'Project_Guide_Name', headerName: 'Project Guide Name', sortable: false, filterable: false, width: 150 },
    { field: 'Project_Organisation', headerName: 'Project Organisation', sortable: false, filterable: false, width: 150 },
    // { field: 'Project_Start_Date', headerName: 'Project Start Date', sortable: false, filterable: false, width: 200 },
    // { field: 'Project_End_Date', headerName: 'Project End Date', sortable: false, filterable: false, width: 200 }
  ];

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
      <div className="studentTableContainer" style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={studentDetails}
          columns={columns}
          pageSize={5}
          pageSizeOptions={[5, 10]}
          onRowDoubleClick={handleRowDoubleClick}
        // checkboxSelection
        />
      </div>
    </div>
  )
}
