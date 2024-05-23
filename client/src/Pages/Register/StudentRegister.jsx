import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from 'react-toastify';
import SideBar from '../../Components/SideBar/SideBar.jsx';
import Api from '../../API/Api.js';
import "./AdminRegister.scss";

export default function StudentRegister() {
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
        try {
            const result = await Api.registerStudent(formData);
            console.log(result);
            toast.success(result.message);
            setFormData({
              UserName: "",
              Password: "",
              Name: ""
            });
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }
};


  return (
    <div className='adminregisterMainContainer'>
      <SideBar/>
      <div className='adminRegister_Container'>
        {/* <h1 className="close_mark_btn">X</h1> */}
        <form className='adminRegister_form' onSubmit={handleSubmit}>
          <h1 className="adminRegister_formHeading">Register Student</h1>
          <div className="adminRegister_labelInput">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              id='name'
              name='Name'
              value={formData.Name}
              onChange={handleChange}
            />
            <p className="adminRegister_error">{errors.Name}</p>
          </div>
          <div className="adminRegister_labelInput">
            <label htmlFor="UserName">UserName : </label>
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
            <label htmlFor="password">Password : </label>
            <div className="adminRegister_password_container">
              <input
                type={showPassword ? "text" : "password"}
                className='adminRegister_password_input'
                id='password'
                name='Password'
                value={formData.Password}
                onChange={handleChange}
              />
              {showPassword ? <AiFillEye className='icon' onClick={toggleShowPassword} /> : <AiFillEyeInvisible className='icon' size={22} onClick={toggleShowPassword} />}
            </div>
            <p className="adminRegister_error">{errors.Password}</p>
          </div>
          <button type='submit' className='adminRegister_login_btn' onClick={(e) => handleSubmit(e)}>Register</button>
        </form>
      </div>
    </div>
  )
}
