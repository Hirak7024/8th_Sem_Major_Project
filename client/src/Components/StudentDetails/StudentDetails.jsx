import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Utils/Context.js';
import { useNavigate } from 'react-router-dom';
import defaultImage from "../../Assets/No_Profile_Picture.jpeg"
import Api from "../../API/Api.js"
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import "./StudentDetails.scss";

export default function StudentDetails() {
    const { userData } = useAuth();
    const [studentDetails, setStudentDetails] = useState(null);
    const [imageURL, setImageURL] = useState(defaultImage); // Initialize with default image
    const [imageFile, setImageFile] = useState(null);
    const [profilePictureEditModel, setProfilePictureEditModel] = useState(false);

    useEffect(() => {
        if (userData && userData.studentDetails) {
            setStudentDetails(userData.studentDetails);
            if (userData.studentDetails.ProfilePicture) {
                // Construct the URL for the profile picture using the file name
                const profilePictureURL = `http://localhost:8001/images/${userData.studentDetails.ProfilePicture}`;
                // Check if the image exists
                fetch(profilePictureURL)
                    .then(response => {
                        // If image exists, set the imageURL
                        if (response.ok) {
                            setImageURL(profilePictureURL);
                        } else {
                            // If image doesn't exist, set the default image
                            setImageURL(defaultImage);
                        }
                    })
                    .catch(error => {
                        // If fetch fails, set the default image
                        console.error('Error checking image existence:', error);
                        setImageURL(defaultImage);
                    });
            }
        }
    }, [userData]);
    

    const navigate = useNavigate();

    const handleImageFile = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleUploadImage = () => {
        if (!imageFile || !studentDetails || !studentDetails.Student_ID) {
            console.log("No image selected or Student_ID missing");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("Student_ID", studentDetails.Student_ID);

        Api.uploadProfilePicture(formData)
            .then(res => {
                if (res.status === "Success") {
                    // Update image URL after successful upload
                    const uploadedImageURL = URL.createObjectURL(imageFile);
                    setImageURL(uploadedImageURL);
                    toast.success("Profile Picture Uploaded Successfully");
                    setProfilePictureEditModel(false);
                } else {
                    console.log("Failed to upload image");
                }
            })
            .catch(err => console.log(err));
    };

    const handleModalClose = () => {
        // Reset image file state when modal is closed
        setImageFile(null);
        setProfilePictureEditModel(false);
    };

    return (
        <div className='StudentDetailsMainContainer'>
            {studentDetails ? (
                <div className='StudentDetailsContainer'>
                    <div className="profilePictureBox">
                        <div className='imageAndEditBtn'>
                            <img className='ProdileImageTag' src={imageURL} alt="Uploaded" />
                            <MdOutlineModeEditOutline className='ProfileImageEditBtn' onClick={() => setProfilePictureEditModel(true)} />
                        </div>
                        {profilePictureEditModel && <div className='ProfilePictureEditContainer'>
                            <div className="profilePictureEditBox">
                                <button className='ProfilePictureEditContainerExit' onClick={handleModalClose} >X</button>
                                <img className='ModelProfilePic' src={imageFile ? URL.createObjectURL(imageFile) : defaultImage} alt="NewProfilePicture" />
                                <input className='ModelImgInputTag' type="file" onChange={handleImageFile} />
                                <button className='uploadImgButton' onClick={handleUploadImage}>Upload Image</button>
                            </div>
                        </div>}
                    </div>
                    <div className="studentDetailsBox">
                        < MdOutlineModeEditOutline className='studentDetailsEditBtn' onClick={() => navigate("/form/update/studentDetails")} />
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
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
