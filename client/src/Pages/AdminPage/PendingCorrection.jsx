import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Api from "../../API/Api.js";
import { toast } from "react-toastify";
import "./PendingCorrection.scss";
import { useAuth } from '../../Utils/Context.js';
import { useNavigate } from 'react-router-dom';

export default function PendingCorrection() {
    const { updateStudentDetails  } = useAuth();
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
                "Email": selectedStudentRow.Student_Email,
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
        { field: 'Student_ID', headerName: 'Student ID', width: 150 },
        { field: 'Student_Email', headerName: 'Email', width: 200 },
        { field: 'Student_RollNo', headerName: 'Roll No', width: 150 },
        { field: 'Student_Name', headerName: 'Name', width: 150 },
    ];

    return (
        <div className='PendingCorrectionContainer'>
            <h2>Pending Corrections</h2>
            <div className="pendingCorrectionTable" style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={pendingCorrections}
                    columns={columns}
                    pageSize={5}
                    pageSizeOptions={[5, 10]}
                    onRowDoubleClick={handleRowDoubleClick}
                />
            </div>
        </div>
    )
}
