import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAuth } from '../../Utils/Context.js';
import { toast } from 'react-toastify';
import "./Login.scss";

export default function Login() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        Email: "",
        Password: ""
    });
    const [errors, setErrors] = useState({
        Email: "",
        Password: ""
    });

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            Email: "",
            Password: ""
        };

        // Email validation
        if (formData.Email.length === 0) {
            newErrors.Email = "*Email field can't be empty";
            isValid = false;
        } else if (!formData.Email.match(/^.+@gmail\.com$/)) {
            newErrors.Email = "*Enter a valid gmail address";
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
            const result = await loginUser(formData);
            if (result.success) {
                toast.success(result.message);
                if (result.studentDetailsExist) {
                    navigate("/studentProfile");
                } 
                // else {
                //     navigate("/form/studentDetails");
                // }
            } else {
                // toast.error(result.message);
                navigate("/form/studentDetails");
            }
        }
    };
    

    return (
        <div className='login_Container'>
            <h1 className="close_mark_btn">X</h1>
            <form className='login_form' onSubmit={handleSubmit}>
                <h1 className="formHeading">Login</h1>
                <div className="labelInput">
                    <label htmlFor="email">Enter Your Email : </label>
                    <input
                        type="text"
                        id='email'
                        name='Email'
                        value={formData.Email}
                        onChange={handleChange}
                    />
                    <p className="error">{errors.Email}</p>
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
                        {showPassword ? <AiFillEye className='icon' size={22} onClick={toggleShowPassword} /> : <AiFillEyeInvisible className='icon' size={22} onClick={toggleShowPassword} />}
                    </div>
                    <p className="error">{errors.Password}</p>
                </div>
                <button type='submit' className='login_btn'>
                    Login
                </button>
                <div className='registerLink_Box'>
                    Don't Have an Account ? <Link to={"/register"} className='register_Link'>Sign Up</Link>
                </div>
            </form>
        </div>
    )
}
