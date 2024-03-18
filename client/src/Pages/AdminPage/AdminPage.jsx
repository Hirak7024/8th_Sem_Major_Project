import React, { useState } from 'react';
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
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
  }

  return (
    <div className='AdminPageContainer'>
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
  )
}
