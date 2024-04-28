import axios from 'axios';

const baseUrl = "http://localhost:8001/api";

const Api = {
    // API call to update profile picture of student 
    uploadProfilePicture: async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/studentdetails/upload/profilePicture`, formData
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
            const response = await axios.post(`${baseUrl}/studentinternships//upload/pdf/certificateAndReport/forInternship`, formData
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
            const response = await axios.post(`${baseUrl}/studentprojects/upload/pdf/certificateAndReport/forProject`, formData
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
            const response = await axios.get(`${baseUrl}/needCorrection/get/allValues`);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to insert data into the need_correction table
    insertIntoNeedCorrection: async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/needCorrection/insert`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

    //API call to delete data from table need_correction
    deleteNeedCorrectionByStudentID: async (studentID) => {
        try {
            const response = await axios.delete(`${baseUrl}/needCorrection/delete/row`, { data: { Student_ID: studentID } });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to fetch decoded token from backend
    GetPayloadFromToken: async (token) => {
        try {
            const response = await axios.get(`${baseUrl}/studentauth/getDecode/TokenPayload`, {
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
            const response = await axios.post(`${baseUrl}/admin/register`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to login as admin
    loginAdmin: async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/admin/login`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to fetch student details along with project and internship details based on admin input
    fetchStudentDetails: async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/studentdetails/getAll/studentDetails/internshipAndProject`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

    // API call to register a student
    registerStudent: async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/studentauth/register`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to login a student
    loginStudent: async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/studentauth/login`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to check if student details exist using email
    checkStudentByEmail: async (email) => {
        try {
            const response = await axios.post(`${baseUrl}/studentdetails/getStudentDetails/byEmail`, { Email: email });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to insert data into table students
    insertStudent: async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/studentdetails/students/insert`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to update values at table students
    updateStudent: async (formData) => {
        try {
            const response = await axios.put(`${baseUrl}/studentdetails/students/update`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

    // API call to fetch internships by roll number from table internships
    fetchInternshipsByRollNo: async (rollNo) => {
        try {
            const response = await axios.post(`${baseUrl}/studentinternships/internship/fetchAll/detailsofInternships`, { Roll_No: rollNo });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to insert internship details into table internships
    insertInternshipDetails: async (rollNo, formData) => {
        try {
            const data = { Internship_Roll_No: rollNo, ...formData };
            const response = await axios.post(`${baseUrl}/studentinternships/internship/insert`, data);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

    // API call to update internship details
    updateInternship: async (formData) => {
        try {
            const response = await axios.put(`${baseUrl}/studentinternships/internship/update`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to fetch internship details by Internship_ID
    fetchInternshipDetailsById: async (internshipId) => {
        try {
            const response = await axios.post(`${baseUrl}/studentinternships/internship/fetch/detailsofInternship/byID`, internshipId);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to delete an internship by Internship_ID
    deleteInternship: async (formData) => {
        try {
            const response = await axios.delete(`${baseUrl}/studentinternships/internship/delete`, { data: formData });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

    // API call to fetch all projects by roll number
    fetchProjectsByRollNo: async (rollNo) => {
        try {
            const response = await axios.post(`${baseUrl}/studentprojects/project/fetchAll/detailsofProjects`, { Roll_No: rollNo });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to insert project details into table projects
    insertProjectDetails: async (rollNo, formData) => {
        try {
            const data = { Project_Roll_No: rollNo, ...formData };
            const response = await axios.post(`${baseUrl}/studentprojects/project/insert`, data);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    // API call to fetch project details using Project_ID
    fetchProjectDetailsById: async (projectId) => {
        try {
            const response = await axios.post(`${baseUrl}/studentprojects/project/fetch/detailsofProject/byID`, projectId);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

    // API call to update project details
    updateProject: async (formData) => {
        try {
            const response = await axios.put(`${baseUrl}/studentprojects/project/update`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    //  API call to delete a project 
    deleteProject: async (formData) => {
        try {
            const response = await axios.delete(`${baseUrl}/studentprojects/project/delete`, { data: formData });
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },

};

export default Api;
