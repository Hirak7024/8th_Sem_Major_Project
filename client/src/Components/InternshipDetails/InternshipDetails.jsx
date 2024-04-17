import React, { useState, useEffect } from 'react';
import Api from '../../API/Api.js';
import { useAuth } from '../../Utils/Context.js';
import { useNavigate } from 'react-router-dom';
import UploadCertificateReport from './UploadCertificateReport/UploadCertificateReport.jsx';
import "./InternshipDetails.scss";

export default function InternshipDetails() {
    const { userData } = useAuth();
    const [internships, setInternships] = useState([]);
    const [uploadPdfFiles, setUploadPdfFiles] = useState(false);

    useEffect(() => {
        async function fetchInternships() {
            try {
                const rollNo = userData.studentDetails.Roll_No;
                const data = await Api.fetchInternshipsByRollNo(rollNo);
                setInternships(data);
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
        } catch (error) {
            console.error('Error deleting internship:', error);
        }
    };

    return (
        <div className='InternshipDetailsContainer'>
            <h1 className='internshipDetailsTitle'>Internship Details</h1>
            <button className='internshipDetailsAddBtn' onClick={()=>navigate("/form/internshipDetails")}>Add Internship</button>
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
                    <button onClick={()=>setUploadPdfFiles(true)}>Upload Certificate and Report</button>
                    {uploadPdfFiles && <UploadCertificateReport setUploadPdfFiles={setUploadPdfFiles} Internship_ID = {internship.Internship_ID}/>}
                    <hr />
                </div>
            ))}
        </div>
    );
}
