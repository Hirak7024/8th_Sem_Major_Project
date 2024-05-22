import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../Utils/Context.js";
import { toast } from 'react-toastify';
import "../Login/Login.scss";

export default function StudentRegister() {
    const navigate = useNavigate();
    const { registerStudent, registerAdmin } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        UserName: "",
        Password: "",
        Name: "",
    });
    const [errors, setErrors] = useState({
        UserName: "",
        Password: "",
        Name: "",
    });

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

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            UserName: "",
            Password: "",
            Name: ""
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

        //Sign Up Key Validation
        if (formData.Name.length === 0) {
            newErrors.Name = "*Name can't be empty";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            let result;
            //   result = await registerStudent(formData);
            //   if (result.success) {
            //     toast.success(result.message);
            //     navigate("/form/studentDetails");
            //   } else {
            //     toast.error(result.message);
            //   }

            result = await registerAdmin(formData);
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
            <form className='login_form' onSubmit={handleSubmit}>
                <h1 className="formHeading">Register</h1>
                <div className="labelInput">
                    <label htmlFor="name">Enter Your Name : </label>
                    <input
                        type="text"
                        id='name'
                        name='Name'
                        value={formData.Name}
                        onChange={handleChange}
                    />
                    <p className="error">{errors.Name}</p>
                </div>
                <div className="labelInput">
                    <label htmlFor="UserName">Enter Your UserName : </label>
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
                    <label htmlFor="password">Enter Your Password : </label>
                    <div className="password_container">
                        <input
                            type={showPassword ? "text" : "password"}
                            className='password_input'
                            id='password'
                            name='Password'
                            value={formData.Password}
                            onChange={handleChange}
                        />
                        {showPassword ? <AiFillEye className='icon' onClick={toggleShowPassword} /> : <AiFillEyeInvisible className='icon' size={22} onClick={toggleShowPassword} />}
                    </div>
                    <p className="error">{errors.Password}</p>
                </div>
                <button type='submit' className='login_btn' onClick={(e) => handleSubmit(e)}>Register as Admin</button>
                {/* <button type='submit' className='login_btn' onClick={(e) => handleSubmit(e, 'admin')}>Register as Admin</button> */}
                {/* <div className='registerLink_Box'>
          Already Have an Account ? <Link to={"/"} className='register_Link'>login</Link>
        </div> */}
            </form>
        </div>
    )
}
