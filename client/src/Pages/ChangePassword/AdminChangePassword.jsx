import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from 'react-toastify';
import SideBar from '../../Components/SideBar/SideBar.jsx';
import Api from '../../API/Api.js';
import "../Register/AdminRegister.scss";

export default function AdminChangePassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        UserName: "",
        newPassword: "",
    });
    const [errors, setErrors] = useState({
        UserName: "",
        newPassword: "",
    });

    // useEffect(() => {
    //     // Prevent the user from navigating back using the browser's back button
    //     const disableBackButton = () => {
    //         window.history.pushState(null, "", window.location.href);
    //         window.onpopstate = () => {
    //             window.history.pushState(null, "", window.location.href);
    //         };
    //     };

    //     disableBackButton();

    //     // Cleanup on component unmount
    //     return () => {
    //         window.onpopstate = null;
    //     };
    // }, []);

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
            newPassword: "",
        };

        // newPassword validation
        if (formData.newPassword.length < 8) {
            newErrors.newPassword = "*newPassword must have at least 8 characters.";
            isValid = false;
        }

        //Sign Up Key Validation
        if (formData.UserName.length === 0) {
            newErrors.UserName = "*UserName can't be empty";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const result = await Api.changeAdminPassword(formData);
                console.log(result);
                toast.success(result.message);
                setFormData({
                    UserName: "",
                    newPassword: "",
                  });
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        }
    };


    return (
        <div className="adminregisterMainContainer">
            <SideBar />
            <div className='adminRegister_Container'>
                <form className='adminRegister_form' onSubmit={handleSubmit}>
                    <h1 className="adminRegister_formHeading">Change Password</h1>
                    <div className="adminRegister_labelInput">
                        <label htmlFor="UserName">Admin's UserName : </label>
                        <input
                            type="text"
                            id='UserName'
                            name='UserName'
                            value={formData.UserName}
                            onChange={handleChange}
                        />
                        <p className="adminRegister_error">{errors.UserName}</p>
                    </div>
                    <div className="adminRegister_labelInput">
                        <label htmlFor="NewPassword">New Password : </label>
                        <div className="adminRegister_password_container">
                            <input
                                type={showPassword ? "text" : "password"}
                                className='adminRegister_password_input'
                                id='NewPassword'
                                name='newPassword'
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                            {showPassword ? <AiFillEye className='icon' onClick={toggleShowPassword} /> : <AiFillEyeInvisible className='icon' size={22} onClick={toggleShowPassword} />}
                        </div>
                        <p className="adminRegister_error">{errors.newPassword}</p>
                    </div>
                    <button type='submit' className='adminRegister_login_btn' onClick={(e) => handleSubmit(e)}>Change Password</button>
                </form>
            </div>
        </div>
    )
}
