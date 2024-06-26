import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Api from "../../API/Api.js";
import { toast } from "react-toastify";
import "./PendingCorrection.scss";
import { useAuth } from '../../Utils/Context.js';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar.jsx';

export default function PendingCorrection() {
    const { updateStudentDetails } = useAuth();
    const [pendingCorrections, setPendingCorrections] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPendingCorrections();
    }, []);

    const fetchPendingCorrections = async () => {
        try {
            const response = await Api.getAllNeedCorrection();
            setPendingCorrections(response);
        } catch (error) {
            console.error("Error fetching pending corrections:", error);
            toast.error(error);
        }
    };

    const handleRowDoubleClick = (params) => {
        const selectedStudentRow = pendingCorrections.find(student => student.id === params.id);
        if (selectedStudentRow) {
            updateStudentDetails({
                "Student_ID": selectedStudentRow.Student_ID,
                "UserName": selectedStudentRow.Student_UserName,
                "Roll_No": selectedStudentRow.Student_RollNo,
                "Name": selectedStudentRow.Student_Name
            });
        } else {
            console.error("Selected student row not found:", params);
            toast.error("Selected student row not found. Please try again.");
        }
        navigate('/from/adminSide/StudentProfile');
    };


    const columns = [
        { field: 'Student_ID', headerName: 'Student ID', width: 150,headerAlign: 'center' },
        { field: 'Student_UserName', headerName: 'UserName', width: 200,headerAlign: 'center' },
        { field: 'Student_RollNo', headerName: 'Roll No', width: 150,headerAlign: 'center' },
        { field: 'Student_Name', headerName: 'Name', width: 150,headerAlign: 'center' },
    ];

    return (
        <div className='PendingCorrectioMainContainer'>
            <SideBar/>
            <div className='PendingCorrectionContainer'>
                <h2 className='pendingCorrectons'>Pending Corrections</h2>
                <div className="pendingCorrectionTable" style={{ height: '100%', width: '90%' }}>
                    <DataGrid style={{backgroundColor:"white"}}
                        rows={pendingCorrections}
                        columns={columns}
                        pageSize={5}
                        pageSizeOptions={[5, 10]}
                        onRowDoubleClick={handleRowDoubleClick}
                    />
                </div>
            </div>
        </div>
    )
}
