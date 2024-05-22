import React, { useState } from 'react';
import Api from '../../../API/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Utils/Context';
import "../../InternshipDetails/InternShipDetailsForm/InternshipDetailsForm.scss";

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
    const [errors, setErrors] = useState({
        Project_Type: "",
        Project_Title: "",
        Project_Start_Date: "",
        Project_End_Date: "",
        Project_Description: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProjectDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        // Clear error message when user starts typing
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // Get the Roll_No from userData in the context
                const Project_Roll_No = userData.studentDetails.Roll_No;
                await Api.insertProjectDetails(Project_Roll_No, projectDetails);
                toast.success("Project inserted successfully");
                navigate("/studentProfile");
            } catch (error) {
                console.error(error);
                toast.error("Failed to insert project");
            }
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            Project_Type: "",
            Project_Title: "",
            Project_Start_Date: "",
            Project_End_Date: "",
            Project_Description: ""
        };

        // Project Type validation
        if (projectDetails.Project_Type.trim() === "") {
            newErrors.Project_Type = "*Project Type field can't be empty";
            isValid = false;
        }

        // Project Title validation
        if (projectDetails.Project_Title.trim() === "") {
            newErrors.Project_Title = "*Title field can't be empty";
            isValid = false;
        }

        // Start Date validation
        if (projectDetails.Project_Start_Date.trim() === "") {
            newErrors.Internship_Organisation = "*Start Date field can't be empty";
            isValid = false;
        }

        // End Date validation
        if (projectDetails.Project_End_Date.trim() === "") {
            newErrors.Internship_Organisation = "*End Date field can't be empty";
            isValid = false;
        }

        // Description validation
        if (projectDetails.Project_Description.trim() === "") {
            newErrors.Project_Description = "*Description field can't be empty";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <div className='InternshipDetailsFormContainer'>
            <form className="InternshipDetailsForm" onSubmit={handleSubmit}>
                <h1>Project Details Form</h1>
                <p>Enter the following details :</p>
                <div className="NewInternshipFormBox">
                    <div className="labelInput" id='GridBox_1'>
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
                        <p className="error">{errors.Project_Type}</p>
                    </div>
                    <div className="labelInput" id='GridBox_2'>
                        <label htmlFor="title">Title : </label>
                        <input
                            type="text"
                            id='title'
                            name='Project_Title'
                            value={projectDetails.Project_Title}
                            onChange={handleChange}
                        />
                        <p className="error">{errors.Project_Title}</p>
                    </div>
                    <div className="labelInput" id='GridBox_3'>
                        <label htmlFor="startDate">Start Date : </label>
                        <input
                            type="date"
                            id='startDate'
                            name='Project_Start_Date'
                            value={projectDetails.Project_Start_Date}
                            onChange={handleChange}
                        />
                        <p className="error">{errors.Project_Start_Date}</p>
                    </div>
                    <div className="labelInput" id='GridBox_4'>
                        <label htmlFor="endDate">End Date : </label>
                        <input
                            type="date"
                            id='endDate'
                            name='Project_End_Date'
                            value={projectDetails.Project_End_Date}
                            onChange={handleChange}
                        />
                        <p className="error">{errors.Project_End_Date}</p>
                    </div>
                    <div className="labelInput" id='GridBox_5'>
                        <label htmlFor="organisation">Organisation Name : </label>
                        <input
                            type="text"
                            id='organisation'
                            name='Project_Organisation'
                            value={projectDetails.Project_Organisation}
                            onChange={handleChange}
                        />
                        {/* <p className="error">{errors.Project_Organisation}</p> */}
                    </div>
                    <div className="labelInput" id='GridBox_6'>
                        <label htmlFor="guideName">Guide's Name : </label>
                        <input
                            type="text"
                            id='guideName'
                            name='Project_Guide_Name'
                            value={projectDetails.Project_Guide_Name}
                            onChange={handleChange}
                        />
                        {/* <p className="error">{errors.Project_Guide_Name}</p> */}
                    </div>
                    <div className="labelInput" id='GridBox_7'>
                        <label htmlFor="guideDesignation">Guide's Designation : </label>
                        <input
                            type="text"
                            id='guideDesignation'
                            name='Project_Guide_Designation'
                            value={projectDetails.Project_Guide_Designation}
                            onChange={handleChange}
                        />
                        {/* <p className="error">{errors.Project_Guide_Designation}</p> */}
                    </div>
                    <div className="labelInput" id='GridBox_8'>
                        <label htmlFor="description">Description : </label>
                        <textarea
                            id="description"
                            name="Project_Description"
                            value={projectDetails.Project_Description}
                            onChange={handleChange}
                        ></textarea>
                        <p className="error">{errors.Project_Description}</p>
                    </div>
                </div>
                <button className='formButton' type='submit'>Submit</button>
            </form>
        </div>
    );
}
