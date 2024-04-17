import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Utils/Context.js';
import { useNavigate } from 'react-router-dom';
import defaultImage from "../../Assets/No_Profile_Picture.jpeg"
import Api from "../../API/Api.js" // Import the Api.js file
import "./StudentDetails.scss";

export default function StudentDetails() {
    const { userData } = useAuth();
    const [studentDetails, setStudentDetails] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageURL, setImageURL] = useState(defaultImage); // Initialize with default image

    useEffect(() => {
        if (userData && userData.studentDetails) {
            setStudentDetails(userData.studentDetails);
        }
    }, [userData]);

    const navigate = useNavigate();

    const handleImageFile = (e) => {
        setImageFile(e.target.files[0]);
        setImageURL(URL.createObjectURL(e.target.files[0])); // Set image URL for preview
    };

    const handleUploadImage = () => {
        if (!imageFile || !studentDetails || !studentDetails.Student_ID) {
            console.log("No image selected or Student_ID missing");
            return;
        }

        console.log("Student ID is : "+ studentDetails.Student_ID);
    
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("Student_ID", studentDetails.Student_ID); // Send Student_ID in the request body
    
        Api.uploadProfilePicture(formData)
            .then(res => {
                if (res.Status === "Success") {
                    console.log("Image uploaded successfully");
                    setImageURL(URL.createObjectURL(imageFile)); // Update image URL
                } else {
                    console.log("Failed to upload image");
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='StudentDetailsContainer'>
            <h1 className='studentDetailsTitle'>Student Details</h1>
            <button className='studentDetailsEditBtn' onClick={() => navigate("/form/update/studentDetails")}>Edit</button>
            {studentDetails ? (
                <div>
                    {/* Display updated user details */}
                    <input type="file" onChange={handleImageFile} />
                    <button onClick={handleUploadImage}>Upload Image</button>
                    <p><strong>Name : </strong>{studentDetails.Name}</p>
                    <p><strong>Roll No : </strong>{studentDetails.Roll_No}</p>
                    <p><strong>Registration No : </strong>{studentDetails.Registration_No}</p>
                    <p><strong>Date of Birth : </strong>{studentDetails.Date_of_Birth}</p>
                    <p><strong>Course : </strong>{studentDetails.Course}</p>
                    <p><strong>Department : </strong>{studentDetails.Department}</p>
                    <p><strong>Batch : </strong>{studentDetails.Year_of_Joining}-{studentDetails.Year_of_Passing}</p>
                    <p><strong>Phone No : </strong>{studentDetails.Phone_No}</p>
                    <p><strong>Email : </strong>{studentDetails.Email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
