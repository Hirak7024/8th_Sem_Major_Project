import React, { useState } from 'react';
import Api from '../../../API/Api';
import { toast } from 'react-toastify';
import "./UploadInternshipCertificateReport.scss"

export default function UploadCertificateReport({ Internship_ID, setUploadPdfFiles }) {
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
        formData.append('Internship_ID', Internship_ID);
        formData.append('Internship_Certificate', pdfFiles.Certificate);
        formData.append('Internship_Report', pdfFiles.Report);

        Api.uploadPdfFiles(formData)
            .then((res) => {
                if (res.Status === 'Success') {
                    toast.success('PDF files uploaded successfully');
                    setUploadPdfFiles(false); 
                    window.location.reload(); 
                } else {
                    toast.error('Failed to upload PDF files');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="UploadCertificateReport_Container">
            <form className='uploadPdfForm_Container'>
                <button className="modelCloseBtn" onClick={()=>setPdfFiles(false)}>X</button>
                <div className="labelInput">
                    <label htmlFor="certificate">Upload Certificate : </label>
                    <input
                        type="file"
                        id="certificate"
                        name="Certificate"
                        onChange={handlePdfFile}
                    />
                </div>
                <div className="labelInput">
                    <label htmlFor="report">Upload Report : </label>
                    <input
                        type="file"
                        id="report"
                        name="Report"
                        onChange={handlePdfFile}

                    />
                </div>
                <button type="button" className='InternshipPdfSubmitBtn' onClick={handleUploadPdf}>
                    Upload Files
                </button>
            </form>
        </div>
    );
}
