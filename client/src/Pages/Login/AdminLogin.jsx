import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAuth } from '../../Utils/Context.js';
import { toast } from 'react-toastify';
import "./Login.scss";

export default function AdminLogin() {
    const navigate = useNavigate();
    const { loginAdmin } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        UserName: "",
        Password: ""
    });
    const [errors, setErrors] = useState({
        UserName: "",
        Password: ""
    });

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        // Prevent the user from navigating back using the browser's back button
        const disableBackButton = () => {
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = () => {
                window.history.pushState(null, "", window.location.href);
            };
        };

        disableBackButton();

        // Cleanup on component unmount
        return () => {
            window.onpopstate = null;
        };
    }, []);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            UserName: "",
            Password: ""
        };

        // UserName validation
        if (formData.UserName.length === 0) {
            newErrors.UserName = "*UserName field can't be empty";
            isValid = false;
        }

        // Password validation
        if (formData.Password.length < 8) {
            newErrors.Password = "*Password must have at least 8 characters.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            let result;
            // result = await loginStudent(formData);
            // if (result.success) {
            //     toast.success(result.message);
            //     if (result.studentDetailsExist) {
            //         navigate("/studentProfile");
            //     } else {
            //         navigate("/form/studentDetails");
            //     }
            // } else {
            //     // Check if the message indicates student details do not exist
            //     if (result.message === "Student details do not exist") {
            //         navigate("/form/studentDetails");
            //     } else {
            //         toast.error(result.message);
            //     }
            // }

            result = await loginAdmin(formData);
            if (result.success) {
                toast.success(result.message);
                navigate("/adminPage");
            } else {
                toast.error(result.message);
            }
        }
    };



    return (
        <div className='login_Container'>
            {/* <h1 className="close_mark_btn">X</h1> */}
            <h1 className="goToAdmin" onClick={() => navigate("/")}>Student</h1>
            <form className='login_form'>
                <h1 className="formHeading">Login</h1>
                <div className="labelInput">
                    <label htmlFor="UserName">UserName : </label>
                    <input
                        type="text"
                        id='UserName'
                        name='UserName'
                        value={formData.UserName}
                        onChange={handleChange}
                    />
                    <p className="error">{errors.UserName}</p>
                </div>
                <div className="labelInput">
                    <label htmlFor="password">Password : </label>
                    <div className="password_container">
                        <input
                            type={showPassword ? "text" : "password"}
                            className='password_input'
                            id='password'
                            name='Password'
                            value={formData.Password}
                            onChange={handleChange}
                        />
                        {showPassword ? <AiFillEye className='icon' size={22} onClick={toggleShowPassword} /> : <AiFillEyeInvisible className='icon' size={22} onClick={toggleShowPassword} />}
                    </div>
                    <p className="error">{errors.Password}</p>
                </div>
                <button type='submit' className='login_btn' onClick={(e) => handleSubmit(e)}>Login as Admin</button>
                {/* <button type='submit' className='login_btn' onClick={(e) => handleSubmit(e, 'admin')}>Login as Admin</button> */}
                {/* <div className='registerLink_Box'>
                    Don't Have an Account ? <Link to={"/register"} className='register_Link'>Sign Up</Link>
                </div> */}
            </form>
        </div>
    )
}
