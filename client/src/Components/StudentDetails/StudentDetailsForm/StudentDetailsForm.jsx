import React, { useState } from 'react';
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
    });
    const [errors, setErrors] = useState({
        Name: "",
        Roll_No: "",
        Registration_No: "",
        Date_of_Birth: "",
        Phone_No: "",
        Course: "",
        Department: "",
        Semester: "",
        Year_of_Joining: "",
        Year_of_Passing: ""
    });

    const handleChange = (e) => {
        setStudentDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        // Clear error message when user starts typing
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
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
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            Name: "",
            Roll_No: "",
            Registration_No: "",
            Date_of_Birth: "",
            Phone_No: "",
            Course: "",
            Department: "",
            Semester: "",
            Year_of_Joining: "",
            Year_of_Passing: ""
        };

        // Name validation
        if (!/^[a-zA-Z ]+$/.test(studentDetails.Name)) {
            newErrors.Name = "*Name should contain only alphabets";
            isValid = false;
        }

        // Roll No validation
        if (studentDetails.Roll_No.trim() === "") {
            newErrors.Roll_No = "*Roll No field can't be empty";
            isValid = false;
        }

        // Registration No validation
        if (studentDetails.Registration_No.trim() === "") {
            newErrors.Registration_No = "*Registration No field can't be empty";
            isValid = false;
        }

        // Date of Birth validation
        if (!/^\d{2}-\d{2}-\d{4}$/.test(studentDetails.Date_of_Birth)) {
            newErrors.Date_of_Birth = "*Date of Birth should be in DD-MM-YYYY format";
            isValid = false;
        }

        // Phone No validation
        if (!/^\d{10}$/.test(studentDetails.Phone_No)) {
            newErrors.Phone_No = "*Phone No should be 10 digits";
            isValid = false;
        }

        // Course validation
        if (studentDetails.Course.trim() === "") {
            newErrors.Course = "*Course field can't be empty";
            isValid = false;
        }

        // Department validation
        if (studentDetails.Department.trim() === "") {
            newErrors.Department = "*Student's Department field can't be empty";
            isValid = false;
        }

        // Semester validation
        if (!studentDetails.Semester) {
            newErrors.Semester = "*Semester field can't be empty";
            isValid = false;
        }

        // Year of Joining validation
        if (!studentDetails.Year_of_Joining) {
            newErrors.Year_of_Joining = "*Year of Joining field can't be empty";
            isValid = false;
        }

        // Year of Passing validation
        if (!studentDetails.Year_of_Passing) {
            newErrors.Year_of_Passing = "*Year of Passing field can't be empty";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
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
                        <p className="error">{errors.Name}</p>
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
                        <p className="error">{errors.Roll_No}</p>
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
                        <p className="error">{errors.Registration_No}</p>
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
                        <p className="error">{errors.Date_of_Birth}</p>
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
                        <p className="error">{errors.Phone_No}</p>
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
                        <p className="error">{errors.Course}</p>
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
                        <p className="error">{errors.Department}</p>
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
                        <p className="error">{errors.Semester}</p>
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
                        <p className="error">{errors.Year_of_Joining}</p>
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
                        <p className="error">{errors.Year_of_Passing}</p>
                    </div>
                </div>
                <button className='formButton' type='submit'>Submit</button>
            </form>
        </div>
    );
}
