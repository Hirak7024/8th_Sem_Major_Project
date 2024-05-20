import React, { useState, useEffect } from 'react';
import Api,{backendBaseURL} from '../../API/Api.js';
import { useAuth } from '../../Utils/Context.js';
import axios from "axios";
import PdfImage from "../../Assets/PdfIcon.png";
import "../../Components/ProjectDetails/ProjectDetails.scss";

export default function AdminSideProjectView() {
    const { userData } = useAuth();
    const [projects, setProjects] = useState([]);
    const [projectPdfData, setProjectPdfData] = useState({});

    useEffect(() => {
        async function fetchInternships() {
            try {
                const rollNo = userData.studentDetails.Roll_No;
                const data = await Api.fetchProjectsByRollNo(rollNo);
                setProjects(data);

                // Fetch PDF data for each internship
                const pdfRequests = data.map(project => {
                    const certificateRequest = axios.get(`${backendBaseURL}/pdfs/projects/${project.Project_Certificate_Link}`)
                        .catch(() => null); // Handle error if certificate doesn't exist
                    const reportRequest = axios.get(`${backendBaseURL}/pdfs/projects/${project.Project_Report_Link}`)
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

    const handleViewCertificatePdf = (projectId) => {
        if (projectPdfData[projectId] && projectPdfData[projectId].certificate) {
            window.open(`${backendBaseURL}/pdfs/projects/${projectPdfData[projectId].certificate}`);
        }
    };

    const handleViewReportPdf = (projectId) => {
        if (projectPdfData[projectId] && projectPdfData[projectId].report) {
            window.open(`${backendBaseURL}/pdfs/projects/${projectPdfData[projectId].report}`);
        }
    };



    return (
        <div className='ProjectDetailsMainContainer'>
            <h1 className='projectDetailsTitle'>Project Details</h1>
            {projects.map((project, index) => (
                <div key={index} className='projectDetailsContainer'>
                    <p id='projectTitle'>{project.Project_Title} <p id='projectType'>({project.Project_Type})</p> </p>
                    <p id='projectOrganisation'>{project.Project_Organisation}</p>
                    <p id='projectDuration'> <strong>From</strong> {project.Project_Start_Date} <strong>To</strong> {project.Project_End_Date}</p>
                    <p id='projectDescription'>{project.Project_Description}</p>
                    <p id='projectGuideName'>{project.Project_Guide_Name}</p>
                    <p id='projectGuideDesignation'>{project.Project_Guide_Designation}</p>
                    {projectPdfData[project.Project_ID] && projectPdfData[project.Project_ID].certificate !== null && projectPdfData[project.Project_ID].report !== null && (
                        <div className="ProjectViewPdfBox">
                            <div className="ProjectPdfAndTitleBox">
                                <img src={PdfImage} alt="" className='ProjectViewPdfBtn' onClick={() => handleViewCertificatePdf(project.Project_ID)} />
                                <p className="ViewPdfTitle">{projectPdfData[project.Project_ID]?.certificate}</p>
                            </div>
                            <div className='ProjectPdfAndTitleBox'>
                                <img src={PdfImage} alt="" className='ProjectViewPdfBtn' onClick={() => handleViewReportPdf(project.Project_ID)} />
                                <p className="ViewPdfTitle">{projectPdfData[project.Project_ID]?.report}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
