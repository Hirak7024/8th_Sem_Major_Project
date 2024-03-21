import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Utils/Context';
import { toast } from "react-toastify";
import "./Navbar.scss";

export default function Navbar() {
    const { setUserData } = useAuth();

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("studentDetails");
        navigate("/");
        setUserData(null);
        toast.success("Logged Out")
    }

    return (
        <div className='NavbarMainContainer'>
            <h1 className="title">Title</h1>
            <button className="logoutBtn" onClick={handleLogout}>Logout</button>
        </div>
    )
}
