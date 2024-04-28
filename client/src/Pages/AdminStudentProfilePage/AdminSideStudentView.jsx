import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Utils/Context.js';
import defaultImage from "../../Assets/No_Profile_Picture.jpg";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import "../../Components/StudentDetails/StudentDetails.scss";
import Api from '../../API/Api.js';

export default function AdminSideStudentView() {
    const { userData } = useAuth();
    const [studentDetails, setStudentDetails] = useState(null);
    const [imageURL, setImageURL] = useState(defaultImage);

    useEffect(() => {
        const fetchData = async () => {
            if (userData && userData.studentDetails) {
                const studentdata = await Api.checkStudentByEmail(userData?.studentDetails?.Email);
                setStudentDetails(studentdata);
                console.log(studentdata);
                if (studentdata && studentdata.ProfilePicture) {
                    const profilePictureURL = `http://localhost:8001/images/${studentdata.ProfilePicture}`;
                    setImageURL(profilePictureURL);
                }
            }
        }
        fetchData();
    }, [userData]);

    return (
        <div className='StudentDetailsMainContainer'>
            {studentDetails ? (
                <div className='StudentDetailsContainer'>
                    <div className="profilePictureBox">
                        <div className='imageAndEditBtn'>
                            <img className='ProdileImageTag' src={imageURL} alt="Uploaded" />
                            <h1 className="studentName">{studentDetails.Name.toUpperCase()}</h1>
                        </div>
                    </div>
                    <div className="studentDetailsBox">
                        <div className="studentCollegeDetails">
                            <p className='studentInfoHeading'>Roll Number <strong className='studentInfoValue'>{studentDetails.Roll_No}</strong></p>
                            <p className='studentInfoHeading'>Registration Number <strong className='studentInfoValue'>{studentDetails.Registration_No}</strong></p>
                            <p className='studentInfoHeading'>Date of Birth <strong className='studentInfoValue'>{studentDetails.Date_of_Birth}</strong></p>
                            <p className='studentInfoHeading'>Course <strong className='studentInfoValue'>{studentDetails.Course}</strong></p>
                            <p className='studentInfoHeading'>Department <strong className='studentInfoValue'>{studentDetails.Department}</strong></p>
                            <p className='studentInfoHeading'>Semester <strong className='studentInfoValue'>{studentDetails.Semester}</strong></p>
                            <p className='studentInfoHeading'>Batch <strong className='studentInfoValue'>{studentDetails.Year_of_Joining}-{studentDetails.Year_of_Passing}</strong></p>
                        </div>
                        <div className="studentContactDetails">
                            <p className='contactPara'><FaPhone className='phoneAndMailIcon' />{studentDetails.Phone_No}</p>
                            <p className='contactPara'><IoMdMail className='phoneAndMailIcon' />{studentDetails.Email}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
