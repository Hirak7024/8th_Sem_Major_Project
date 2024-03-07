import React, { createContext, useState, useContext } from 'react';
import Api from "../API/Api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    // Function to Register a Student
    const registerUser = async (formData) => {
        try {
            const data = await Api.registerUser(formData);
            const { userResponse, token } = data.data;
            setUserData({ user: userResponse, token });
            localStorage.setItem("authToken", token);
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: error };
        }
    };

    // Function to Login a Student
    const loginUser = async (formData) => {
        try {
            const data = await Api.loginUser(formData);
            const { userResponse, token } = data.data;
            setUserData({ user: userResponse, token });

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
            registerUser,
            loginUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
