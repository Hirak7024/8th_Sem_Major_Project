import React, { useState, useEffect } from 'react';
import Api, { backendBaseURL } from '../../API/Api.js';
import { useAuth } from '../../Utils/Context.js';
import axios from "axios";
import PdfImage from "../../Assets/PdfIcon.png";
import Comments from '../../Components/Comments/Comments.jsx';
import "../../Components/InternshipDetails/InternshipDetails.scss";
import {toast} from "react-toastify";

export default function AdminSideInternshipView() {
    const { userData } = useAuth();
    const [internships, setInternships] = useState([]);
    const [pdfData, setPdfData] = useState({});
    const [showCommentBox, setShowCommentBox] = useState(null); // Updated to track specific internship
    const [showComments, setShowComments] = useState(false);
    const [currentInternshipId, setCurrentInternshipId] = useState(null);
    const [commentData, setCommentData]= useState({
        Internship_ID: null,
        Commentor_Name: userData.user.Name,
        Comment: "",
        Commentor_ID: userData.user.ID,
        Commentor_UserName: userData.user.UserName,
        Is_Reply: false
    })

    const handleCommentChange = (e) => {
        setCommentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCommentSubmit = async (e, internshipId) => {
        e.preventDefault();

        try {
            const updatedCommentData = { ...commentData, Internship_ID: internshipId };
            const response = await Api.addComment(updatedCommentData);
            setShowCommentBox(null); // Hide the comment box after submission
            setCommentData(prev => ({ ...prev, Comment: "" })); // Clear the comment input
            toast.success(response.message);
        } catch (error) {
            toast.error('Error adding comment:', error);
        }
    };

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

    const handleViewCertificatePdf = (internshipId) => {
        if (pdfData[internshipId] && pdfData[internshipId].certificate) {
            window.open(`${backendBaseURL}/pdfs/internships/${pdfData[internshipId].certificate}`);
        }
    };

    const handleViewReportPdf = (internshipId) => {
        if (pdfData[internshipId] && pdfData[internshipId].report) {
            window.open(`${backendBaseURL}/pdfs/internships/${pdfData[internshipId].report}`);
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
                    <div className="commentContainer">
                        {showCommentBox === internship.Internship_ID ? (
                            <div className="commentInputBox">
                                <form className="commentForm" onSubmit={(e) => handleCommentSubmit(e, internship.Internship_ID)}>
                                    <input type="text" 
                                    className='commentInput'
                                    value={commentData.Comment}
                                    name='Comment'
                                    onChange={handleCommentChange}
                                    required
                                    />
                                    <button className="commentInsertBtn" type='submit'>Send</button>
                                </form>
                            </div>
                        ) : (
                            <button className="addCommentBtn" onClick={() => setShowCommentBox(internship.Internship_ID)}>Add Comment</button>
                        )}
                        <p className="noOfComments" onClick={() => { 
                            setCurrentInternshipId(internship.Internship_ID);
                            setShowComments(true);
                        }}>Check Comments</p>
                        {showComments && <Comments key={index} Internship_ID={currentInternshipId} showComments={showComments} setShowComments={setShowComments} />}
                    </div>
                </div>
            ))}
        </div>
    );
}
