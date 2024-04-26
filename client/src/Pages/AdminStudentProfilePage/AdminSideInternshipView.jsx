import React, { useState, useEffect } from 'react';
import Api from '../../API/Api.js';
import { useAuth } from '../../Utils/Context.js';
import axios from "axios";
import PdfImage from "../../Assets/PdfIcon.png";
import "../../Components/InternshipDetails/InternshipDetails.scss";

export default function AdminSideInternshipView() {
    const { userData } = useAuth();
    const [internships, setInternships] = useState([]);
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

    const handleViewCertificatePdf = (internshipId) => {
        if (pdfData[internshipId] && pdfData[internshipId].certificate) {
            window.open(`http://localhost:8001/pdfs/internships/${pdfData[internshipId].certificate}`);
        }
    };

    const handleViewReportPdf = (internshipId) => {
        if (pdfData[internshipId] && pdfData[internshipId].report) {
            window.open(`http://localhost:8001/pdfs/internships/${pdfData[internshipId].report}`);
        } 
    };

    return (
        <div className='InternshipDetailsMainContainer'>
            <h1 className='internshipDetailsTitle'>Internship Details</h1>
            {internships.map((internship, index) => (
                <div key={index} className='internshipDetailsContainer'>
                    <p id='internshipTitle'>{internship.Internship_Title} <p id='internshipType'>({internship.Internship_Type})</p> </p>
                    <p id='internshipOrganisation'>{internship.Internship_Organisation}</p>
                    <p id='internshipDuration'> <strong>From</strong> {internship.Internship_Start_Date} <strong>To</strong> {internship.Internship_End_Date}</p>
                    <p id='internshipDescription'>{internship.Internship_Description}</p>
                    <p id='internshipGuideName'>{internship.Internship_Guide_Name}</p>
                    <p id='internshipGuideDesignation'>{internship.Internship_Guide_Designation}</p>
                    {pdfData[internship.Internship_ID] && pdfData[internship.Internship_ID].certificate !== null && pdfData[internship.Internship_ID].report !== null && (
                        <div className="viewPdfBox">
                            <div className="PdfAndTitleBox">
                                <img src={PdfImage} alt="" className='InternshipViewPdfBtn' onClick={() => handleViewCertificatePdf(internship.Internship_ID)} />
                                <p className="ViewPdfTitle">{pdfData[internship.Internship_ID]?.certificate}</p>
                            </div>
                            <div className='PdfAndTitleBox'>
                                <img src={PdfImage} alt="" className='InternshipViewPdfBtn' onClick={() => handleViewReportPdf(internship.Internship_ID)} />
                                <p className="ViewPdfTitle">{pdfData[internship.Internship_ID]?.report}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
