import React, { useState, useEffect } from 'react';
import Api, { backendBaseURL } from '../../API/Api.js';
import { useAuth } from '../../Utils/Context.js';
import { useNavigate } from 'react-router-dom';
import UploadCertificateReport from './UploadCertificateReport/UploadCertificateReport.jsx';
import axios from "axios";
import { toast } from "react-toastify"
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import PdfImage from "../../Assets/PdfIcon.png";
import Comments from '../Comments/Comments.jsx';
import "./InternshipDetails.scss";

export default function InternshipDetails() {
    const { userData } = useAuth();
    const [internships, setInternships] = useState([]);
    const [uploadPdfFiles, setUploadPdfFiles] = useState({});
    const [pdfData, setPdfData] = useState({});
    const [showComments, setShowComments] = useState(false);
    const [currentInternshipId, setCurrentInternshipId] = useState(null);
    const isReply= true;

    useEffect(() => {
        async function fetchInternships() {
            try {
                const rollNo = userData.studentDetails.Roll_No;
                const data = await Api.fetchInternshipsByRollNo(rollNo);
                setInternships(data);

                // Fetch PDF data for each internship
                const pdfRequests = data.map(internship => {
                    const certificateRequest = axios.get(`${backendBaseURL}/pdfs/internships/${internship.Internship_Certificate_Link}`)
                        .catch(() => null); // Handle error if certificate doesn't exist
                    const reportRequest = axios.get(`${backendBaseURL}/pdfs/internships/${internship.Internship_Report_Link}`)
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
            window.open(`${backendBaseURL}/pdfs/internships/${pdfData[internshipId].certificate}`);
        } else {
            setUploadPdfFiles(prevState => ({
                ...prevState,
                [internshipId]: true
            }));
        }
    };

    const handleViewReportPdf = (internshipId) => {
        if (pdfData[internshipId] && pdfData[internshipId].report) {
            window.open(`${backendBaseURL}/pdfs/internships/${pdfData[internshipId].report}`);
        } else {
            setUploadPdfFiles(prevState => ({
                ...prevState,
                [internshipId]: true
            }));
        }
    };

    return (
        <div className='InternshipDetailsMainContainer'>
            <h1 className='internshipDetailsTitle'>Internship Details</h1>
            <button className='internshipDetailsAddBtn' onClick={() => navigate("/form/internshipDetails")}>Add New Internship</button>
            {internships.map((internship, index) => (
                <div key={index} className='internshipDetailsContainer'>
                    <MdOutlineModeEditOutline className='internshipDetailsEditBtn' onClick={() => handleEdit(internship.Internship_ID)} />
                    <RiDeleteBin5Line className='internshipDetailsDeleteBtn' onClick={() => handleDelete(internship.Internship_ID)} />
                    <p id='internshipTitle'>{internship.Internship_Title} <p id='internshipType'>({internship.Internship_Type})</p> </p>
                    <p id='internshipOrganisation'>{internship.Internship_Organisation}</p>
                    <p id='internshipDuration'> <strong>From</strong> {internship.Internship_Start_Date} <strong>To</strong> {internship.Internship_End_Date}</p>
                    <p id='internshipDescription'>{internship.Internship_Description}</p>
                    <p id='internshipGuideName'>{internship.Internship_Guide_Name}</p>
                    <p id='internshipGuideDesignation'>{internship.Internship_Guide_Designation}</p>
                    {pdfData[internship.Internship_ID] && pdfData[internship.Internship_ID].certificate === null && pdfData[internship.Internship_ID].report === null ? (
                        <div className="ContainerToUploadInternshipPdf">
                            <p className='PdfFileUploadTitle'>Add Certificate and Report</p>
                            <button className='PdfFileUploadButton' onClick={() => handleUploadClick(internship.Internship_ID)}>Add Files</button>
                        </div>
                    ) : (
                        <div className="viewPdfBox">
                            {/* Buttons to view PDF files */}
                            <MdOutlineModeEditOutline className='viewPdfBoxEditBtn' onClick={() => handleUploadClick(internship.Internship_ID)} />
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
                    {uploadPdfFiles[internship.Internship_ID] && <UploadCertificateReport setUploadPdfFiles={setUploadPdfFiles} Internship_ID={internship.Internship_ID} />}
                    <div className="commentContainer" style={{position:"relative", top:"0", left:"0"}}>
                        <p className="noOfComments" style={{position:"absolute", right:"1rem"}} onClick={() => {
                            setCurrentInternshipId(internship.Internship_ID);
                            setShowComments(true);
                        }}>Check Comments</p>
                        {showComments && <Comments key={index} Internship_ID={currentInternshipId} showComments={showComments} setShowComments={setShowComments} isReply={isReply} />}
                    </div>
                </div>
            ))}
        </div>
    );
}
