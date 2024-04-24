import React, { useState } from 'react'
import { useAuth } from '../../../Utils/Context';
import Api from '../../../API/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "./StudentDetailsForm.scss";

export default function StudentDetailsForm() {
    const navigate = useNavigate();
    const { userData, setUserData } = useAuth();
    const [studentDetails, setStudentDetails] = useState({
        Name: "",
        Roll_No: "",
        Registration_No: "",
        Date_of_Birth: "",
        Phone_No: "",
        Course: "",
        Department: "",
        Semester: null,
        Year_of_Joining: null,
        Year_of_Passing: null
    })

    const handleChange = (e) => {
        setStudentDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await Api.insertStudent({
                ...studentDetails,
                Student_Auth_ID: userData.user.Student_Auth_ID,
                Email: userData.user.Email
            });
            toast.success(data.message);
            // Fetch updated user data
            const updatedStudentDetails = await Api.checkStudentByEmail(userData.user.Email);
            setUserData(prev => ({ ...prev, studentDetails: updatedStudentDetails }));
            navigate("/studentProfile"); // Navigate to StudentDetails after successfully submitting the form
        } catch (error) {
            console.error(error);
            toast.error(error);
        }
    };



    return (
        <div className='StudentDetailsFormContainer'>
            <form className="studentDetailsForm" onSubmit={handleSubmit}>
                <h1>Student Details Form</h1>
                <p>Enter the following details :</p>
                <div className="studentDetailsInputBox">
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
                            id='registrationNo'
                            name='Registration_No'
                            value={studentDetails.Registration_No}
                            onChange={handleChange}
                        />
                        {/* <p className="error">{errors.Email}</p> */}
                    </div>
                    <div className="labelInput">
                        <label htmlFor="dob">Date of Birth [DD-MM-YYYY] : </label>
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
                        <label htmlFor="department">Student's Department : </label>
                        <select
                            id="department"
                            name="Department"
                            value={studentDetails.Department}
                            onChange={handleChange}
                        >
                            <option value="">Select Student's Department </option>
                            <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Instrumentation Engineering">Instrumentation Engineering</option>
                        </select>
                    </div>
                    <div className="labelInput">
                        <label htmlFor="semester">Current Semester : </label>
                        <input
                            type="number"
                            id='semester'
                            name='Semester'
                            value={studentDetails.Semester}
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
                </div>
                <button className='formButton' type='submit'>Submit</button>
            </form>
        </div>
    )
}
