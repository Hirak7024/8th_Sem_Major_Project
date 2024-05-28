import React, { useState } from 'react';
import Api from '../../../API/Api';
import { toast } from 'react-toastify';
import "./UploadProjectCertificateReport.scss";

export default function UploadProjectCertificateReport({ Project_ID, setUploadProjectPdfFiles }) {
    const [pdfFiles, setPdfFiles] = useState({
        Certificate: null,
        Report: null
    });

    const handlePdfFile = (e) => {
        const file = e.target.files[0];
        setPdfFiles((prev) => ({
            ...prev,
            [e.target.name]: file
        }));
    };

    const handleUploadPdf = () => {
        if (!pdfFiles.Certificate || !pdfFiles.Report) {
            toast.error('Please select both certificate and report files.');
            return;
        }

        const formData = new FormData();
        formData.append('Project_ID', Project_ID);
        formData.append('Project_Certificate', pdfFiles.Certificate);
        formData.append('Project_Report', pdfFiles.Report);

        Api.uploadProjectPdfFiles(formData)
            .then((res) => {
                if (res.Status === 'Success') {
                    toast.success('PDF files uploaded successfully');
                    setUploadProjectPdfFiles(false); 
                    window.location.reload(); 
                } else {
                    toast.error('Failed to upload PDF files');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="UploadProjectCertificateReport_Container">
            <form className='uploadProjectPdfForm_Container'>
            <button className="projectModelCloseBtn" onClick={()=>setPdfFiles(false)}>X</button>
                <div className="labelInput">
                    <label htmlFor="certificate">Upload Certificate : </label>
                    <input
                        type="file"
                        id="certificate"
                        name="Certificate"
                        accept="application/pdf"
                        onChange={handlePdfFile}
                    />
                </div>
                <div className="labelInput">
                    <label htmlFor="report">Upload Report : </label>
                    <input
                        type="file"
                        id="report"
                        name="Report"
                        accept="application/pdf"
                        onChange={handlePdfFile}
                    />
                </div>
                <button type="button" className='ProjectPdfSubmitBtn' onClick={handleUploadPdf}>
                    Upload Files
                </button>
            </form>
        </div>
    );
}
