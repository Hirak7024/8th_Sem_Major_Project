import React, { useState, useEffect } from 'react';
import Api from '../../API/Api.js';
import { useAuth } from '../../Utils/Context.js';
import { useNavigate } from 'react-router-dom';
import UploadCertificateReport from './UploadCertificateReport/UploadCertificateReport.jsx';
import axios from "axios";
import {toast} from "react-toastify"
import "./InternshipDetails.scss";

export default function InternshipDetails() {
    const { userData } = useAuth();
    const [internships, setInternships] = useState([]);
    const [uploadPdfFiles, setUploadPdfFiles] = useState({});
    const [pdfData, setPdfData] = useState({});

    useEffect(() => {
        async function fetchInternships() {
            try {
                const rollNo = userData.studentDetails.Roll_No;
                const data = await Api.fetchInternshipsByRollNo(rollNo);
                setInternships(data);
                
                // Fetch PDF data for each internship
                const pdfRequests = data.map(internship => {
                    const certificateRequest = axios.get(`http://localhost:8001/pdfs/internships/${internship.Internship_Certificate_Link}`)
                        .catch(() => null); // Handle error if certificate doesn't exist
                    const reportRequest = axios.get(`http://localhost:8001/pdfs/internships/${internship.Internship_Report_Link}`)
                        .catch(() => null); // Handle error if report doesn't exist
                    return Promise.all([certificateRequest, reportRequest]);
                });
                const pdfResponses = await Promise.all(pdfRequests);
                
                // Extract only file names and store them in pdfData state
                const pdfData = pdfResponses.reduce((acc, response, index) => {
                    acc[data[index].Internship_ID] = {
                        certificate: response[0] ? data[index].Internship_Certificate_Link : null,
                        report: response[1] ? data[index].Internship_Report_Link : null
                    };
                    return acc;
                }, {});
                
                setPdfData(pdfData);
            } catch (error) {
                console.error('Error fetching internships:', error);
            }
        }

        fetchInternships();
    }, [userData]);

    const navigate = useNavigate();

    const handleEdit = (internshipId) => {
        navigate(`/form/update/internshipDetails/${internshipId}`);
    };

    const handleDelete = async (Internship_ID) => {
        try {
            await Api.deleteInternship({ Internship_ID }); // Pass Internship_ID in the request body
            // Remove the deleted internship from the local state
            setInternships(internships.filter(internship => internship.Internship_ID !== Internship_ID));
            console.log("Internship deleted successfully");
            toast.success("Internship deleted successfully");
        } catch (error) {
            console.error('Error deleting internship:', error);
            toast.error("Error deleting internship");
        }
    };

    const handleUploadClick = (internshipId) => {
        setUploadPdfFiles(prevState => ({
            ...prevState,
            [internshipId]: true
        }));
    };

    const handleViewCertificatePdf = (internshipId) => {
        if (pdfData[internshipId] && pdfData[internshipId].certificate) {
            window.open(`http://localhost:8001/pdfs/internships/${pdfData[internshipId].certificate}`);
        } else {
            setUploadPdfFiles(prevState => ({
                ...prevState,
                [internshipId]: true
            }));
        }
    };

    const handleViewReportPdf = (internshipId) => {
        if (pdfData[internshipId] && pdfData[internshipId].report) {
            window.open(`http://localhost:8001/pdfs/internships/${pdfData[internshipId].report}`);
        } else {
            setUploadPdfFiles(prevState => ({
                ...prevState,
                [internshipId]: true
            }));
        }
    };

    return (
        <div className='InternshipDetailsContainer'>
            <h1 className='internshipDetailsTitle'>Internship Details</h1>
            <button className='internshipDetailsAddBtn' onClick={() => navigate("/form/internshipDetails")}>Add New Internship</button>
            {internships.map((internship, index) => (
                <div key={index}>
                    <button className='internshipDetailsEditBtn' onClick={() => handleEdit(internship.Internship_ID)}>Edit</button>
                    <button className='internshipDetailsDeleteBtn' onClick={() => handleDelete(internship.Internship_ID)}>Delete</button>
                    <p><strong>Internship Type: </strong>{internship.Internship_Type}</p>
                    <p><strong>Title: </strong>{internship.Internship_Title}</p>
                    <p><strong>Start Date: </strong>{internship.Internship_Start_Date}</p>
                    <p><strong>End Date: </strong>{internship.Internship_End_Date}</p>
                    <p><strong>Organisation: </strong>{internship.Internship_Organisation}</p>
                    <p><strong>Guide Name: </strong>{internship.Internship_Guide_Name}</p>
                    <p><strong>Guide Designation: </strong>{internship.Internship_Guide_Designation}</p>
                    <p><strong>Description: </strong>{internship.Internship_Description}</p>
                    {pdfData[internship.Internship_ID] && pdfData[internship.Internship_ID].certificate === null && pdfData[internship.Internship_ID].report === null ? (
                        <div className="ContainerToUploadInternshipPdf">
                            <p className='PdfFileUploadTitle'>Add Certificate and Report</p>
                            <button className='PdfFileUploadButton' onClick={() => handleUploadClick(internship.Internship_ID)}>Add Files</button>
                        </div>
                    ) : (
                        <div className="viewPdfBox">
                            {/* Buttons to view PDF files */}
                            <button onClick={() => handleViewCertificatePdf(internship.Internship_ID)}>View Certificate PDF</button>
                            <button onClick={() => handleViewReportPdf(internship.Internship_ID)}>View Report PDF</button>
                        </div>
                    )}
                    {uploadPdfFiles[internship.Internship_ID] && <UploadCertificateReport setUploadPdfFiles={setUploadPdfFiles} Internship_ID={internship.Internship_ID} />}
                    <hr />
                </div>
            ))}
        </div>
    );
}
