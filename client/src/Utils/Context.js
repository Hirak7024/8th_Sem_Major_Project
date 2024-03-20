import React, { createContext, useState, useContext, useEffect } from 'react';
import Api from "../API/Api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchTokenData = async () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const decodedToken = await Api.GetPayloadFromToken(token);
                    const { Email } = decodedToken.payload; // Assuming Email is part of decoded payload
                    setUserData({user: {Email: Email}});
                    const studentDetailsExist = await Api.checkStudentByEmail(Email);
                    if (studentDetailsExist) {
                        const studentDetails = await Api.checkStudentByEmail(Email);
                        setUserData(prev => ({ ...prev, studentDetails }));
                    }
                } catch (error) {
                    console.error("Error fetching token data:", error);
                }
            }
        };

        fetchTokenData();
    }, []); // Run only once on component mount

    // Function to Register new Admin
    const registerAdmin = async (formData) => {
        try {
            const data = await Api.registerAdmin(formData);
            const { userResponse, token } = data.data;
            setUserData({ user: userResponse, token });
            localStorage.setItem("authToken", token);
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: error };
        }
    };

    // Function to Login as Admin
    const loginAdmin = async (formData) => {
        try {
            const data = await Api.loginAdmin(formData);
            const { userResponse, token } = data.data;
            setUserData({ user: userResponse, token });
            localStorage.setItem("authToken", token);
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: error };
        }
    };

    // Function to Register a Student
    const registerStudent = async (formData) => {
        try {
            const data = await Api.registerStudent(formData);
            const { userResponse, token } = data.data;
            setUserData({ user: userResponse, token });
            localStorage.setItem("authToken", token);
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: error };
        }
    };

    // Function to Login a Student
    const loginStudent = async (formData) => {
        try {
            const data = await Api.loginStudent(formData);
            const { userResponse, token } = data.data;
            setUserData({ user: userResponse, token });
            localStorage.setItem("authToken", token);

            // Check if student details exist
            const studentDetailsExist = await Api.checkStudentByEmail(formData.Email);
            if (studentDetailsExist) {
                const studentDetails = await Api.checkStudentByEmail(formData.Email);
                setUserData(prev => ({ ...prev, studentDetails }));
                return { success: true, message: data.message, studentDetailsExist: true };
            } else {
                return { success: true, message: data.message, studentDetailsExist: false };
            }
        } catch (error) {
            return { success: false, message: error };
        }
    };



    return (
        <AuthContext.Provider value={{
            userData,
            setUserData,
            registerStudent,
            loginStudent,
            registerAdmin,
            loginAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
