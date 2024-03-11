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

    return (
        <div className='ProjectDetailsContainer'>
            <h1>Project Details</h1>
            <button onClick={() => navigate("/form/projectDetails")}>Add Project</button>
            {projects.map((project, index) => (
                <div key={index}>
                    <button onClick={() => handleEdit(project.Project_ID)}>Edit</button>
                    <br />
                    <button>Delete</button>
                    <p><strong>Project Type: </strong>{project.Project_Type}</p>
                    <p><strong>Title: </strong>{project.Title}</p>
                    <p><strong>Start Date: </strong>{project.Start_Date}</p>
                    <p><strong>End Date: </strong>{project.End_Date}</p>
                    <p><strong>Organisation: </strong>{project.Organisation}</p>
                    <p><strong>Guide Name: </strong>{project.Guide_Name}</p>
                    <p><strong>Guide Designation: </strong>{project.Guide_Designation}</p>
                    <p><strong>Description: </strong>{project.Description}</p>
                    <p><strong>Certificate Link: </strong>{project.Certificate_Link}</p>
                    <p><strong>Report Link: </strong>{project.Report_Link}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}
