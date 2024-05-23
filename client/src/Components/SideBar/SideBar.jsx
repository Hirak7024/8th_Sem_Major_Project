import React from 'react'
import "./SideBar.scss";
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
    const navigate = useNavigate();
    return (
        <div className='Sidebar_MainContainer'>
            <ul className='sidebarList'>
                <li className="sideBarListItem" onClick={()=>navigate("/adminPage")}>Student Details</li>
                <li className="sideBarListItem" onClick={() => { navigate("/adminPage/pendingCorrections") }}>Pending Corrections</li>
                <li className="sideBarListItem" onClick={()=>navigate("/register/student")} >Register Student</li>
                <li className="sideBarListItem" onClick={()=>navigate("/register/admin")}>Register Admin</li>
            </ul>
        </div>
    )
}
