import axios from 'axios';

const baseUrl = "http://localhost:8001/api";

const Api = {
    //API call to register a student
    registerUser: async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/studentauth/register`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
    //API call to login a student
    loginUser: async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/studentauth/login`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    },
};

export default Api;
