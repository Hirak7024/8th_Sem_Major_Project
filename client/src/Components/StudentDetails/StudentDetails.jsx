import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Utils/Context.js';
import "./StudentDetails.scss";

export default function StudentDetails() {
    const { userData } = useAuth();
    const [studentDetails, setStudentDetails] = useState(null);

    useEffect(() => {
        if (userData && userData.studentDetails) {
            setStudentDetails(userData.studentDetails);
        }
    }, [userData]);

    return (
        <div className='StudentDetailsContainer'>
            <h1>Student Details</h1>
            {studentDetails ? (
                <div>
                    <p><strong>Name : </strong>{studentDetails.Name}</p>
                    <p><strong>Roll No : </strong>{studentDetails.Roll_No}</p>
                    <p><strong>Registration No : </strong>{studentDetails.Registration_No}</p>
                    <p><strong>Date of Birth : </strong>{studentDetails.Date_of_Birth}</p>
                    <p><strong>Course : </strong>{studentDetails.Course}</p>
                    <p><strong>Department : </strong>{studentDetails.Department}</p>
                    <p><strong>Batch : </strong>{studentDetails.Year_of_Joining}-{studentDetails.Year_of_Passing}</p>
                    <p><strong>Phone No : </strong>{studentDetails.Phone_No}</p>
                    <p><strong>Email : </strong>{studentDetails.Email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
