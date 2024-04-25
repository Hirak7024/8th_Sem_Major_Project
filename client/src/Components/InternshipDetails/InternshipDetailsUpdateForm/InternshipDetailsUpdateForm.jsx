import React, { useState, useEffect } from 'react';
import Api from '../../../API/Api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../Utils/Context';
import "../InternShipDetailsForm/InternshipDetailsForm.scss"

export default function InternshipDetailsUpdateForm() {
  const { internshipId } = useParams();
  const { userData } = useAuth();
  const [internshipDetails, setInternshipDetails] = useState({
    Internship_Type: "",
    Internship_Title: "",
    Internship_Start_Date: "",
    Internship_End_Date: "",
    Internship_Organisation: "",
    Internship_Guide_Name: "",
    Internship_Guide_Designation: "",
    Internship_Description: ""
  });

  const [errors, setErrors] = useState({
    Internship_Type: "",
    Internship_Title: "",
    Internship_Start_Date: "",
    Internship_End_Date: "",
    Internship_Organisation: "",
    Internship_Description: ""
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
    if (validateForm()) {
      try {
        await Api.updateInternship({ Internship_ID: internshipId, ...internshipDetails });
        toast.success('Internship details updated successfully');
        navigate('/studentProfile');
      } catch (error) {
        toast.error('Error updating internship details');
        console.error('Error updating internship details:', error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      Internship_Type: "",
      Internship_Title: "",
      Internship_Start_Date: "",
      Internship_End_Date: "",
      Internship_Organisation: "",
      Internship_Description: ""
    };

    // Internship Type validation
    if (internshipDetails.Internship_Type.trim() === "") {
      newErrors.Internship_Type = "*Internship Type field can't be empty";
      isValid = false;
    }

    // Internship Title validation
    if (internshipDetails.Internship_Title.trim() === "") {
      newErrors.Internship_Title = "*Title field can't be empty";
      isValid = false;
    }

    // Start Date validation
    if (!/^\d{2}-\d{2}-\d{4}$/.test(internshipDetails.Internship_Start_Date)) {
      newErrors.Internship_Start_Date = "*Start Date should be in DD-MM-YYYY format";
      isValid = false;
    }

    // End Date validation
    if (!/^\d{2}-\d{2}-\d{4}$/.test(internshipDetails.Internship_End_Date)) {
      newErrors.Internship_End_Date = "*End Date should be in DD-MM-YYYY format";
      isValid = false;
    }

    // Organisation Name validation
    if (internshipDetails.Internship_Organisation.trim() === "") {
      newErrors.Internship_Organisation = "*Organisation Name field can't be empty";
      isValid = false;
    }

    // Description validation
    if (internshipDetails.Internship_Description.trim() === "") {
      newErrors.Internship_Description = "*Description field can't be empty";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  return (
    <div className='InternshipDetailsFormContainer'>
      <form className="InternshipDetailsForm" onSubmit={handleSubmit}>
        <h1>Internship Details Update Form</h1>
        <p>Update the fields needed :</p>
        <div className="NewInternshipFormBox">
          <div className="labelInput" id='GridBox_1' >
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
            <p className="error">{errors.Internship_Type}</p>
          </div>
          <div className="labelInput" id='GridBox_2'>
            <label htmlFor="title">Title : </label>
            <input
              type="text"
              id='title'
              name='Internship_Title'
              value={internshipDetails.Internship_Title}
              onChange={handleChange}
            />
            <p className="error">{errors.Internship_Title}</p>
          </div>
          <div className="labelInput" id='GridBox_3'>
            <label htmlFor="startDate">Start Date [DD-MM-YYYY] </label>
            <input
              type="text"
              id='startDate'
              name='Internship_Start_Date'
              value={internshipDetails.Internship_Start_Date}
              onChange={handleChange}
            />
            <p className="error">{errors.Internship_Start_Date}</p>
          </div>
          <div className="labelInput" id='GridBox_4'>
            <label htmlFor="endDate">End Date [DD-MM-YYYY] </label>
            <input
              type="text"
              id='endDate'
              name='Internship_End_Date'
              value={internshipDetails.Internship_End_Date}
              onChange={handleChange}
            />
            <p className="error">{errors.Internship_End_Date}</p>
          </div>
          <div className="labelInput" id='GridBox_5'>
            <label htmlFor="organisation">Organisation Name  </label>
            <input
              type="text"
              id='organisation'
              name='Internship_Organisation'
              value={internshipDetails.Internship_Organisation}
              onChange={handleChange}
            />
            <p className="error">{errors.Internship_Organisation}</p>
          </div>
          <div className="labelInput" id='GridBox_6'>
            <label htmlFor="guideName">Guide's Name </label>
            <input
              type="text"
              id='guideName'
              name='Internship_Guide_Name'
              value={internshipDetails.Internship_Guide_Name}
              onChange={handleChange}
            />
          </div>
          <div className="labelInput" id='GridBox_7'>
            <label htmlFor="guideDesignation">Guide's Designation </label>
            <input
              type="text"
              id='guideDesignation'
              name='Internship_Guide_Designation'
              value={internshipDetails.Internship_Guide_Designation}
              onChange={handleChange}
            />
          </div>
          <div className="labelInput" id='GridBox_8'>
            <label htmlFor="description">Description </label>
            <textarea
              id="description"
              name="Internship_Description"
              value={internshipDetails.Internship_Description}
              onChange={handleChange}
            ></textarea>
            <p className="error">{errors.Internship_Description}</p>
          </div>
        </div>
        <button className='formButton' type='submit'>Submit</button>
      </form>
    </div>
  )
}
