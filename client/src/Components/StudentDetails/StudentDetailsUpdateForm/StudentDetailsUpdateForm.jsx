import React, { useState, useEffect } from 'react';
import Api from '../../../API/Api.js';
import { toast } from 'react-toastify';
import { useAuth } from '../../../Utils/Context';
import { useNavigate } from 'react-router-dom';

export default function StudentDetailsUpdateForm() {
    const { userData, setUserData } = useAuth();
    const navigate = useNavigate();
    const [studentDetails, setStudentDetails] = useState({
        Name: "",
        Roll_No: "",
        Registration_No: "",
        Date_of_Birth: "",
        Phone_No: "",
        Course: "",
        Department: "",
        Year_of_Joining: null,
        Year_of_Passing: null
    });

    useEffect(() => {
        if (userData && userData.studentDetails) {
            setStudentDetails(userData.studentDetails);
        }
    }, [userData]);

    const handleChange = (e) => {
        setStudentDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Api.updateStudent(studentDetails);
            const updatedStudentDetails = await Api.checkStudentByEmail(userData.user.Email);
            setUserData(prev => ({ ...prev, studentDetails: updatedStudentDetails }));
            navigate("/studentProfile"); // Navigate back to StudentDetails after successful update
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };


    return (
        <div className='StudentDetailsFormContainer'>
            <form className="studentDetailsForm" onSubmit={handleSubmit}>
                <h1>Student Details Update Form</h1>
                <p>Update the fields needed :</p>
                <div className="labelInput">
                    <label htmlFor="name">Name : </label>
                    <input
                        type="text"
                        id='name'
                        name='Name'
                        value={studentDetails.Name}
                        onChange={handleChange}
                    />
                    {/* <p className="error">{errors.Email}</p> */}
                </div>
                <div className="labelInput">
                    <label htmlFor="rollNo">Roll No : </label>
                    <input
                        type="text"
                        id='rollNo'
                        name='Roll_No'
                        value={studentDetails.Roll_No}
                        onChange={handleChange}
                    />
                    {/* <p className="error">{errors.Email}</p> */}
                </div>
                <div className="labelInput">
                    <label htmlFor="registrationNo">Registration No : </label>
                    <input
                        type="text"
                        id='registrationNolNo'
                        name='Registration_No'
                        value={studentDetails.Registration_No}
                        onChange={handleChange}
                    />
                    {/* <p className="error">{errors.Email}</p> */}
                </div>
                <div className="labelInput">
                    <label htmlFor="dob">Date of Birth [dd-mm-yyyy] : </label>
                    <input
                        type="text"
                        id='dob'
                        name='Date_of_Birth'
                        value={studentDetails.Date_of_Birth}
                        onChange={handleChange}
                    />
                    {/* <p className="error">{errors.Email}</p> */}
                </div>
                <div className="labelInput">
                    <label htmlFor="phoneNo">Phone No : </label>
                    <input
                        type="text"
                        id='phoneNo'
                        name='Phone_No'
                        value={studentDetails.Phone_No}
                        onChange={handleChange}
                    />
                    {/* <p className="error">{errors.Email}</p> */}
                </div>
                <div className="labelInput">
                    <label htmlFor="course">Course : </label>
                    <input
                        type="text"
                        id='course'
                        name='Course'
                        value={studentDetails.Course}
                        onChange={handleChange}
                    />
                    {/* <p className="error">{errors.Email}</p> */}
                </div>
                <div className="labelInput">
                    <label htmlFor="department">Department : </label>
                    <input
                        type="text"
                        id='department'
                        name='Department'
                        value={studentDetails.Department}
                        onChange={handleChange}
                    />
                    {/* <p className="error">{errors.Email}</p> */}
                </div>
                <div className="labelInput">
                    <label htmlFor="yearOfJoining">Year of Joining : </label>
                    <input
                        type="number"
                        id='yearOfJoining'
                        name='Year_of_Joining'
                        value={studentDetails.Year_of_Joining}
                        onChange={handleChange}
                    />
                    {/* <p className="error">{errors.Email}</p> */}
                </div>
                <div className="labelInput">
                    <label htmlFor="yearOfPassing">Year of Passing : </label>
                    <input
                        type="number"
                        id='yearOfPassing'
                        name='Year_of_Passing'
                        value={studentDetails.Year_of_Passing}
                        onChange={handleChange}
                    />
                    {/* <p className="error">{errors.Email}</p> */}
                </div>
                <button className='formButton' type='submit'>Submit</button>
            </form>
        </div>
    )
}
