import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from "../../API/Api.js";
import { toast } from "react-toastify";
import { DataGrid } from '@mui/x-data-grid';
import "./AdminPage.scss";
import { useAuth } from '../../Utils/Context.js';

export default function AdminPage() {
  const { setSelectedStudent } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Roll_No: "",
    Registration_No: "",
    Department: "",
    Year_of_Joining: null,
    Year_of_Passing: null,
  });

  const [studentDetails, setStudentDetails] = useState([]);

  useEffect(() => {
    // Load student details from storage on component mount
    const storedStudentDetails = JSON.parse(localStorage.getItem('studentDetails'));
    if (storedStudentDetails) {
      setStudentDetails(storedStudentDetails);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field name is Year_of_Joining or Year_of_Passing, convert the value to a number
    const numericValue = name === 'Year_of_Joining' || name === 'Year_of_Passing' ? parseInt(value, 10) : value;
    setFormData((prev) => ({ ...prev, [name]: numericValue }));
  };
  

  const fetchStudentDetails = async () => {
    try {
      const data = await Api.fetchStudentDetails(formData);
      console.log(data);
      const updatedData = data.data.map((student) => ({
        ...student,
        id: student.Student_ID,
        Batch: `${student.Year_of_Joining} - ${student.Year_of_Passing}` // Adding Batch column
      }));
      setStudentDetails(updatedData);
      // Store fetched student details in localStorage
      localStorage.setItem('studentDetails', JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error fetching student details:", error);
      toast.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchStudentDetails();
  };

  const handleRowDoubleClick = (params) => {
    const selectedStudentRow = studentDetails.find(student => student.id === params.id);
    setSelectedStudent(selectedStudentRow); 
    navigate('/from/adminSide/StudentProfile');
  };
  

  const columns = [
    { field: 'Name', sortable: false, filterable: false, headerName: 'Name', width: 150 },
    { field: 'Roll_No', sortable: false, filterable: false, headerName: 'Roll No', width: 150 },
    { field: 'Registration_No', sortable: false, filterable: false, headerName: 'Registration No', width: 150 },
    { field: 'Course', headerName: 'Course', width: 70, sortable: false, filterable: false, },
    { field: 'Department', headerName: 'Department', sortable: false, filterable: false, width: 300 },
    { field: 'Semester', headerName: 'Semester', width: 80, sortable: false, filterable: false, },
    { field: 'Batch', headerName: 'Batch', sortable: false, filterable: false, width: 200 }, // Adding Batch column
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
              type="number"
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
              type="number"
              id='yearOfPassing'
              name='Year_of_Passing'
              value={formData.Year_of_Passing}
              onChange={handleChange}
            />
            {/* <p className="error">{errors.Email}</p> */}
          </div>
          {/* <div className="labelInput">
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
          </div> */}
          {/* <div className="labelInput">
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
          </div> */}
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
