import React, { useState, useEffect } from 'react';
import Api from '../../API/Api.js';
import { useAuth } from '../../Utils/Context.js';
import { useNavigate } from 'react-router-dom';
import "./InternshipDetails.scss";

export default function InternshipDetails() {
    const { userData } = useAuth();
    const [internships, setInternships] = useState([]);

    useEffect(() => {
        async function fetchInternships() {
            try {
                // Assume the roll number is available in userData
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

    return (
        <div className='InternshipDetailsContainer'>
            <h1>Internship Details</h1>
            <button onClick={()=>navigate("/form/internshipDetails")}>Add Internship</button>
            {internships.map((internship, index) => (
                <div key={index}>
                     <button onClick={() => handleEdit(internship.Internship_ID)}>Edit</button>
                     <br />
                     <button>Delete</button>
                    <p><strong>Internship Type: </strong>{internship.Internship_Type}</p>
                    <p><strong>Title: </strong>{internship.Title}</p>
                    <p><strong>Start Date: </strong>{internship.Start_Date}</p>
                    <p><strong>End Date: </strong>{internship.End_Date}</p>
                    <p><strong>Organisation: </strong>{internship.Organisation}</p>
                    <p><strong>Guide Name: </strong>{internship.Guide_Name}</p>
                    <p><strong>Guide Designation: </strong>{internship.Guide_Designation}</p>
                    <p><strong>Description: </strong>{internship.Description}</p>
                    <p><strong>Certificate Link: </strong>{internship.Certificate_Link}</p>
                    <p><strong>Report Link: </strong>{internship.Report_Link}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}
