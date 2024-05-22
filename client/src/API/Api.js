import axios from 'axios';

export const backendBaseURL = "http://localhost:8001";

const Api = {

    // API call to add a comment
    addCommentProject: async (commentData) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/comments/projects/addComment`, commentData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to add a comment
    addComment: async (commentData) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/comments/addComment`, commentData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API Call to fetch comments by Internship ID
    fetchCommentsByProjectId: async (Project_ID) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/comments/projects/getCommentByProjectId`, { Project_ID });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API Call to fetch comments by Internship ID
    fetchCommentsByInternshipId: async (Internship_ID) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/comments/getCommentByInternshipId`, { Internship_ID });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

    // API call to fetch messages by Sender_Email
    fetchMessagesBySenderEmail: async (Sender_Email) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/messages/fetchMessage`, { Sender_Email });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to fetch messages by Receiver_Email
    fetchMessagesByReceiverEmail: async (Receiver_Email) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/messages/receiver/fetchMessage`, { Receiver_Email });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to update profile picture of student 
    uploadProfilePicture: async (formData) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/studentdetails/upload/profilePicture`, formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to upload Internship pdf files
    uploadPdfFiles: async (formData) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/studentinternships//upload/pdf/certificateAndReport/forInternship`, formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to upload Project pdf files
    uploadProjectPdfFiles: async (formData) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/studentprojects/upload/pdf/certificateAndReport/forProject`, formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to fetch all rows from table need_correction
    getAllNeedCorrection: async () => {
        try {
            const response = await axios.get(`${backendBaseURL}/api/needCorrection/get/allValues`);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to insert data into the need_correction table
    insertIntoNeedCorrection: async (formData) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/needCorrection/insert`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

    //API call to delete data from table need_correction
    deleteNeedCorrectionByStudentID: async (studentID) => {
        try {
            const response = await axios.delete(`${backendBaseURL}/api/needCorrection/delete/row`, { data: { Student_ID: studentID } });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to fetch decoded token from backend
    GetPayloadFromToken: async (token) => {
        try {
            const response = await axios.get(`${backendBaseURL}/api/studentauth/getDecode/TokenPayload`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to register new admin
    registerAdmin: async (formData) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/admin/register`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to login as admin
    loginAdmin: async (formData) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/admin/login`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to fetch student details along with project and internship details based on admin input
    fetchStudentDetails: async (formData) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/studentdetails/getAll/studentDetails/internshipAndProject`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

    // API call to register a student
    registerStudent: async (formData) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/studentauth/register`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to login a student
    loginStudent: async (formData) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/studentauth/login`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to check if student details exist using UserName
    checkStudentByUserName: async (userName) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/studentdetails/getStudentDetails/byUserName`, { UserName: userName });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to insert data into table students
    insertStudent: async (formData) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/studentdetails/students/insert`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to update values at table students
    updateStudent: async (formData) => {
        try {
            const response = await axios.put(`${backendBaseURL}/api/studentdetails/students/update`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

    // API call to fetch internships by roll number from table internships
    fetchInternshipsByRollNo: async (rollNo) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/studentinternships/internship/fetchAll/detailsofInternships`, { Roll_No: rollNo });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to insert internship details into table internships
    insertInternshipDetails: async (rollNo, formData) => {
        try {
            const data = { Internship_Roll_No: rollNo, ...formData };
            const response = await axios.post(`${backendBaseURL}/api/studentinternships/internship/insert`, data);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

    // API call to update internship details
    updateInternship: async (formData) => {
        try {
            const response = await axios.put(`${backendBaseURL}/api/studentinternships/internship/update`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to fetch internship details by Internship_ID
    fetchInternshipDetailsById: async (internshipId) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/studentinternships/internship/fetch/detailsofInternship/byID`, internshipId);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to delete an internship by Internship_ID
    deleteInternship: async (formData) => {
        try {
            const response = await axios.delete(`${backendBaseURL}/api/studentinternships/internship/delete`, { data: formData });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

    // API call to fetch all projects by roll number
    fetchProjectsByRollNo: async (rollNo) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/studentprojects/project/fetchAll/detailsofProjects`, { Roll_No: rollNo });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to insert project details into table projects
    insertProjectDetails: async (rollNo, formData) => {
        try {
            const data = { Project_Roll_No: rollNo, ...formData };
            const response = await axios.post(`${backendBaseURL}/api/studentprojects/project/insert`, data);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to fetch project details using Project_ID
    fetchProjectDetailsById: async (projectId) => {
        try {
            const response = await axios.post(`${backendBaseURL}/api/studentprojects/project/fetch/detailsofProject/byID`, projectId);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

    // API call to update project details
    updateProject: async (formData) => {
        try {
            const response = await axios.put(`${backendBaseURL}/api/studentprojects/project/update`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    //  API call to delete a project 
    deleteProject: async (formData) => {
        try {
            const response = await axios.delete(`${backendBaseURL}/api/studentprojects/project/delete`, { data: formData });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

};

export default Api;
