import React, { useState, useEffect } from 'react';
import Api from '../../../API/Api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../Utils/Context';

export default function InternshipDetailsUpdateForm() {
    const { internshipId } = useParams();
    const { userData } = useAuth();
    const [internshipDetails, setInternshipDetails] = useState({
        Internship_Type: "",
        Title: "",
        Start_Date: "",
        End_Date: "",
        Organisation: "",
        Guide_Name: "",
        Guide_Designation: "",
        Description: "",
        Certificate_Link: "",
        Report_Link: ""
    });

    useEffect(() => {
        async function fetchInternshipDetails() {
            try {
                const data = await Api.fetchInternshipDetailsById({ Internship_ID: internshipId });
                setInternshipDetails(data);
            } catch (error) {
                console.error('Error fetching internship details:', error);
            }
        }

        fetchInternshipDetails();
    }, [internshipId]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInternshipDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Api.updateInternship({ Internship_ID: internshipId, ...internshipDetails });
            toast.success('Internship details updated successfully');
            navigate('/studentProfile');
        } catch (error) {
            toast.error('Error updating internship details');
            console.error('Error updating internship details:', error);
        }
    };


  return (
    <div className='StudentDetailsFormContainer'>
      <form className="studentDetailsForm" onSubmit={handleSubmit}>
        <h1>Internship Details Update Form</h1>
        <p>Update the fields needed :</p>
        <div className="labelInput">
          <label htmlFor="internshipType">Internship Type : </label>
          <select
            id="internshipType"
            name="Internship_Type"
            value={internshipDetails.Internship_Type}
            onChange={handleChange}
          >
            <option value="">Select Internship Type</option>
            <option value="Social Internship">Social Internship</option>
            <option value="Academic Internship">Academic Internship</option>
            <option value="Industrial Internship">Industrial Internship</option>
          </select>
        </div>
        <div className="labelInput">
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            id='title'
            name='Title'
            value={internshipDetails.Title}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="startDate">Start Date : </label>
          <input
            type="text"
            id='startDate'
            name='Start_Date'
            value={internshipDetails.Start_Date}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="endDate">End Date : </label>
          <input
            type="text"
            id='endDate'
            name='End_Date'
            value={internshipDetails.End_Date}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="organisation">Organisation Name : </label>
          <input
            type="text"
            id='organisation'
            name='Organisation'
            value={internshipDetails.Organisation}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="guideName">Guide's Name : </label>
          <input
            type="text"
            id='guideName'
            name='Guide_Name'
            value={internshipDetails.Guide_Name}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="guideDesignation">Guide's Designation : </label>
          <input
            type="text"
            id='guideDesignation'
            name='Guide_Designation'
            value={internshipDetails.Guide_Designation}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="description">Description : </label>
          <textarea
            id="description"
            name="Description"
            value={internshipDetails.Description}
            onChange={handleChange}
          ></textarea>
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="certificateLink">Certificate [Paste the Google Drive Link] : </label>
          <input
            type="text"
            id='certificateLink'
            name='Certificate_Link'
            value={internshipDetails.Certificate_Link}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <div className="labelInput">
          <label htmlFor="reportLink">Report [Paste the Google Drive Link] : </label>
          <input
            type="text"
            id='reportLink'
            name='Report_Link'
            value={internshipDetails.Report_Link}
            onChange={handleChange}
          />
          {/* <p className="error">{errors.Email}</p> */}
        </div>
        <button className='formButton' type='submit'>Submit</button>
      </form>
    </div>
  )
}
