import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from "../../Utils/Context.js";
import { toast } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate();
  const { registerStudent } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpKey, setShowSignUpKey] = useState(false);
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    SignUpKey: "",
  });
  const [errors, setErrors] = useState({
    Email: "",
    Password: "",
    SignUpKey: "",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const toggleShowSignUpKey = () => {
    setShowSignUpKey(!showSignUpKey);
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      Email: "",
      Password: "",
      SignUpKey: ""
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

    //Sign Up Key Validation
    if (formData.SignUpKey.length === 0) {
      newErrors.SignUpKey = "*Sign Up Key can't be empty";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await registerStudent(formData);
      if (result.success) {
        toast.success(result.message);
        navigate("/form/studentDetails"); // Navigate to StudentDetailsForm after successful registration
      } else {
        toast.error(result.message);
      }
    }
  };
  

  return (
    <div className='login_Container'>
      <h1 className="close_mark_btn">X</h1>
      <form className='login_form' onSubmit={handleSubmit}>
        <h1 className="formHeading">Register</h1>
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
            {showPassword ? <AiFillEye className='icon' onClick={toggleShowPassword} /> : <AiFillEyeInvisible className='icon' size={22} onClick={toggleShowPassword} />}
          </div>
          <p className="error">{errors.Password}</p>
        </div>
        <div className="labelInput">
          <label htmlFor="password">Enter Sign Up Key : </label>
          <div className="password_container">
            <input
              type={showSignUpKey ? "text" : "password"}
              className='password_input'
              id='signupkey'
              name='SignUpKey'
              value={formData.SignUpKey}
              onChange={handleChange}
            />
            {showPassword ? <AiFillEye className='icon' onClick={toggleShowSignUpKey} /> : <AiFillEyeInvisible className='icon' size={22} onClick={toggleShowSignUpKey} />}
            <p className="error">{errors.SignUpKey}</p>
          </div>
        </div>
        <button type='submit' className='login_btn'>
          Register
        </button>
        <div className='registerLink_Box'>
          Already Have an Account ? <Link to={"/"} className='register_Link'>login</Link>
        </div>
      </form>
    </div>
  )
}
