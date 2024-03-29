import React, { useState, useEffect } from 'react';
import Api from '../../API/Api.js';
import { useAuth } from '../../Utils/Context.js';
import { useNavigate } from 'react-router-dom';
import "./ProjectDetails.scss";

export default function ProjectDetails() {
    const { userData } = useAuth();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const rollNo = userData.studentDetails.Roll_No;
                const data = await Api.fetchProjectsByRollNo(rollNo);
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }

        fetchProjects();
    }, [userData]);

    const navigate = useNavigate();

    const handleEdit = (projectId) => {
        navigate(`/form/update/projectDetails/${projectId}`);
    };

    const handleDelete = async (Project_ID) => {
        try {
            await Api.deleteProject(Project_ID);
            // Remove the deleted project from the local state
            setProjects(projects.filter(project => project.Project_ID !== Project_ID));
            console.log("Project deleted successfully");
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div className='ProjectDetailsContainer'>
            <h1>Project Details</h1>
            <button onClick={() => navigate("/form/projectDetails")}>Add Project</button>
            {projects.map((project, index) => (
                <div key={index}>
                    <button onClick={() => handleEdit(project.Project_ID)}>Edit</button>
                    <br />
                    <button onClick={() => handleDelete(project.Project_ID)}>Delete</button>
                    <p><strong>Project Type: </strong>{project.Project_Type}</p>
                    <p><strong>Title: </strong>{project.Project_Title}</p>
                    <p><strong>Start Date: </strong>{project.Project_Start_Date}</p>
                    <p><strong>End Date: </strong>{project.Project_End_Date}</p>
                    <p><strong>Organisation: </strong>{project.Project_Organisation}</p>
                    <p><strong>Guide Name: </strong>{project.Project_Guide_Name}</p>
                    <p><strong>Guide Designation: </strong>{project.Project_Guide_Designation}</p>
                    <p><strong>Description: </strong>{project.Project_Description}</p>
                    <p><strong>Certificate Link: </strong>{project.Project_Certificate_Link}</p>
                    <p><strong>Report Link: </strong>{project.Project_Report_Link}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}
