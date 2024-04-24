import React, { useState, useEffect } from 'react';
import Api from '../../API/Api.js';
import { useAuth } from '../../Utils/Context.js';
import { useNavigate } from 'react-router-dom';
import UploadProjectCertificateReport from './UploadProjectCertificateReport/UploadProjectCertificateReport.jsx';
import axios from "axios";
import {toast} from "react-toastify";
import "./ProjectDetails.scss";

export default function ProjectDetails() {
    const { userData } = useAuth();
    const [projects, setProjects] = useState([]);
    const [uploadProjectPdfFiles, setUploadProjectPdfFiles] = useState({});
    const [projectPdfData, setProjectPdfData] = useState({});

    useEffect(() => {
        async function fetchInternships() {
            try {
                const rollNo = userData.studentDetails.Roll_No;
                const data = await Api.fetchProjectsByRollNo(rollNo);
                setProjects(data);
                
                // Fetch PDF data for each internship
                const pdfRequests = data.map(project => {
                    const certificateRequest = axios.get(`http://localhost:8001/pdfs/projects/${project.Project_Certificate_Link}`)
                        .catch(() => null); // Handle error if certificate doesn't exist
                    const reportRequest = axios.get(`http://localhost:8001/pdfs/projects/${project.Project_Report_Link}`)
                        .catch(() => null); // Handle error if report doesn't exist
                    return Promise.all([certificateRequest, reportRequest]);
                });
                const pdfResponses = await Promise.all(pdfRequests);
                
                // Extract only file names and store them in projectPdfData state
                const projectPdfData = pdfResponses.reduce((acc, response, index) => {
                    acc[data[index].Project_ID] = {
                        certificate: response[0] ? data[index].Project_Certificate_Link : null,
                        report: response[1] ? data[index].Project_Report_Link : null
                    };
                    return acc;
                }, {});
                
                setProjectPdfData(projectPdfData);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }

        fetchInternships();
    }, [userData]);

    const navigate = useNavigate();

    const handleEdit = (projectId) => {
        navigate(`/form/update/projectDetails/${projectId}`);
    };

    const handleDelete = async (Project_ID) => {
        try {
            await Api.deleteProject({ Project_ID }); 
            // Remove the deleted project from the local state
            setProjects(projects.filter(project => project.Project_ID !== Project_ID));
            console.log("Project deleted successfully");
            toast.success("Project deleted successfully")
        } catch (error) {
            console.error('Error deleting project :', error);
            toast.error("Error deleting project")
        }
    };

    const handleUploadClick = (projectId) => {
        setUploadProjectPdfFiles(prevState => ({
            ...prevState,
            [projectId]: true
        }));
    };

    const handleViewCertificatePdf = (projectId) => {
        if (projectPdfData[projectId] && projectPdfData[projectId].certificate) {
            window.open(`http://localhost:8001/pdfs/projects/${projectPdfData[projectId].certificate}`);
        } else {
            setUploadProjectPdfFiles(prevState => ({
                ...prevState,
                [projectId]: true
            }));
        }
    };

    const handleViewReportPdf = (projectId) => {
        if (projectPdfData[projectId] && projectPdfData[projectId].report) {
            window.open(`http://localhost:8001/pdfs/projects/${projectPdfData[projectId].report}`);
        } else {
            setUploadProjectPdfFiles(prevState => ({
                ...prevState,
                [projectId]: true
            }));
        }
    };



    return (
        <div className='ProjectDetailsContainer'>
            <h1 className='projectDetailsTitle'>Project Details</h1>
            <button className='projectDetailsAddBtn' onClick={() => navigate("/form/projectDetails")}>Add New Project</button>
            {projects.map((project, index) => (
                <div key={index}>
                    <button className='projectDetailsEditBtn' onClick={() => handleEdit(project.Project_ID)}>Edit</button>
                    <button className='projectDetailsDeleteBtn' onClick={() => handleDelete(project.Project_ID)}>Delete</button>
                    <p><strong>Project Type: </strong>{project.Project_Type}</p>
                    <p><strong>Title: </strong>{project.Project_Title}</p>
                    <p><strong>Start Date: </strong>{project.Project_Start_Date}</p>
                    <p><strong>End Date: </strong>{project.Project_End_Date}</p>
                    <p><strong>Organisation: </strong>{project.Project_Organisation}</p>
                    <p><strong>Guide Name: </strong>{project.Project_Guide_Name}</p>
                    <p><strong>Guide Designation: </strong>{project.Project_Guide_Designation}</p>
                    <p><strong>Description: </strong>{project.Project_Description}</p>
                    {projectPdfData[project.Project_ID] && projectPdfData[project.Project_ID].certificate === null && projectPdfData[project.Project_ID].report === null ? (
                        <div className="ContainerToUploadProjectPdf">
                            <p className='PdfFileUploadTitle'>Add Certificate and Report</p>
                            <button className='PdfFileUploadButton' onClick={() => handleUploadClick(project.Project_ID)}>Add Files</button>
                        </div>
                    ) : (
                        <div className="viewPdfBox">
                            {/* Buttons to view PDF files */}
                            <button onClick={() => handleViewCertificatePdf(project.Project_ID)}>View Certificate PDF</button>
                            <button onClick={() => handleViewReportPdf(project.Project_ID)}>View Report PDF</button>
                        </div>
                    )}
                    {uploadProjectPdfFiles[project.Project_ID] && <UploadProjectCertificateReport setUploadProjectPdfFiles={setUploadProjectPdfFiles} Project_ID={project.Project_ID} />}
                    <hr />
                </div>
            ))}
        </div>
    );
}
