import React, { useState } from 'react';
import Api from '../../../API/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Utils/Context';

export default function ProjectDetailsForm() {
  const { userData } = useAuth();
  const [projectDetails, setProjectDetails] = useState({
    Project_Type: "",
    Project_Title: "",
    Project_Start_Date: "",
    Project_End_Date: "",
    Project_Organisation: "",
    Project_Guide_Name: "",
    Project_Guide_Designation: "",
    Project_Description: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProjectDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the Roll_No from userData in the context
      const Project_Roll_No = userData.studentDetails.Roll_No;
      await Api.insertProjectDetails(Project_Roll_No, projectDetails);
      toast.success("Project inserted successfully");
      navigate("/studentProfile");
    } catch (error) {
      console.error(error);
      toast.error("Failed to insert internship");
    }
  };

  return (
    <div className='StudentDetailsFormContainer'>
      <form className="studentDetailsForm" onSubmit={handleSubmit}>
        <h1>Project Details Form</h1>
        <p>Enter the following details :</p>
        <div className="labelInput">
          <label htmlFor="projectType">Project Type : </label>
          <select
            id="projectType"
            name="Project_Type"
            value={projectDetails.Project_Type}
            onChange={handleChange}
          >
            <option value="">Select Project Type</option>
            <option value="Minor Project">Minor Project</option>
            <option value="Major Project">Major Project</option>
          </select>
        </div>
        <div className="labelInput">
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            id='title'
            name='Project_Title'
            value={projectDetails.Project_Title}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="startDate">Start Date : </label>
          <input
            type="text"
            id='startDate'
            name='Project_Start_Date'
            value={projectDetails.Project_Start_Date}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="endDate">End Date : </label>
          <input
            type="text"
            id='endDate'
            name='Project_End_Date'
            value={projectDetails.Project_End_Date}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="organisation">Organisation Name : </label>
          <input
            type="text"
            id='organisation'
            name='Project_Organisation'
            value={projectDetails.Project_Organisation}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="guideName">Guide's Name : </label>
          <input
            type="text"
            id='guideName'
            name='Project_Guide_Name'
            value={projectDetails.Project_Guide_Name}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="guideDesignation">Guide's Designation : </label>
          <input
            type="text"
            id='guideDesignation'
            name='Project_Guide_Designation'
            value={projectDetails.Project_Guide_Designation}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="description">Description : </label>
          <textarea
            id="description"
            name="Project_Description"
            value={projectDetails.Project_Description}
            onChange={handleChange}
          ></textarea>
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <button className='formButton' type='submit'>Submit</button>
      </form>
    </div>
  )
}
