import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../DataBase.js';

//TO REGISTER STUDENT
const RegisterStudent = async (req, res) => {
    const { Email, Password, SignUpKey } = req.body;
    const serverSignUpKey = process.env.StudentSignUpKey;

    try {
        // Check if SignUpKey matches the server SignUpKey
        if (SignUpKey !== serverSignUpKey) {
            return res.status(400).json({ message: "Invalid Sign Up Key", status_code: 400 });
        }

        // Check if user already exists
        const [existingUsers] = await pool.execute('SELECT * FROM student_auth WHERE Email = ?', [Email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "Student is already registered", status_code: 400 });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(Password, salt);

        // Insert new user
        await pool.execute('INSERT INTO student_auth (Email, Password) VALUES (?, ?)', [Email, hashedPass]);

        // Retrieve the newly inserted user to get Student_Auth_ID
        const [newUser] = await pool.execute('SELECT Student_Auth_ID FROM student_auth WHERE Email = ?', [Email]);
        const user = newUser[0];

        // Generate JWT token
        const token = jwt.sign({ Email }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 });

        // Prepare response
        const userResponse = { Email, Student_Auth_ID: user.Student_Auth_ID };

        res.status(200).json({ data: { userResponse, token }, message: "Student Registered Successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// TO LOGIN STUDENT
const LoginStudent = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        // Check if user exists
        const [users] = await pool.execute('SELECT * FROM student_auth WHERE Email = ?', [Email]);
        if (users.length === 0) {
            return res.status(404).json({ message: "Student doesn't exist", status_code: 404 });
        }

        const user = users[0];

        // Compare passwords
        const validity = await bcrypt.compare(Password, user.Password);
        if (!validity) {
            return res.status(400).json({ message: "Incorrect Password", status_code: 400 });
        }

        // Generate JWT token
        const token = jwt.sign({ Email }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 });

        // Prepare response
        const userResponse = { Email: user.Email, Student_Auth_ID: user.Student_Auth_ID };

        res.status(200).json({ data: { userResponse, token }, message: "Login Successful", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// TO UPDATE STUDENT LOGIN CREDENTIALS
const UpdateStudentAuth = async (req, res) => {
    const { Student_Auth_ID, Email, Password } = req.body;

    try {
        // Check if the student_auth with the provided Student_Auth_ID exists
        const checkStudentAuthQuery = `SELECT * FROM student_auth WHERE Student_Auth_ID = ?`;
        const [existingStudentAuth] = await pool.query(checkStudentAuthQuery, [Student_Auth_ID]);
        if (existingStudentAuth.length === 0) {
            return res.status(404).json({ message: "Student Auth ID not found", status_code: 404 });
        }

        // Construct the dynamic SQL query to update Email and/or Password
        let updateQuery = `UPDATE student_auth SET `;
        const updateValues = [];

        if (Email) {
            updateQuery += `Email = ?`;
            updateValues.push(Email);
        }

        if (Password) {
            // Hash the new password before updating
            const hashedPassword = await bcrypt.hash(Password, 10);
            if (Email) {
                updateQuery += `, `;
            }
            updateQuery += `Password = ?`;
            updateValues.push(hashedPassword);
        }

        updateQuery += ` WHERE Student_Auth_ID = ?`;
        updateValues.push(Student_Auth_ID);

        // Execute the update query
        await pool.query(updateQuery, updateValues);

        // Fetch the updated student_auth record
        const updatedStudentAuthQuery = `SELECT * FROM student_auth WHERE Student_Auth_ID = ?`;
        const [updatedStudentAuth] = await pool.query(updatedStudentAuthQuery, [Student_Auth_ID]);

        res.status(200).json({ data: updatedStudentAuth[0], message: "Student Authentication updated successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// TO DELETE A ROW FROM STUDENT AUTH TABLE
const DeleteStudentAuth = async (req, res) => {
    const { Student_Auth_ID } = req.body;

    try {
        // Check if the student_auth with the provided Student_Auth_ID exists
        const checkStudentAuthQuery = `SELECT * FROM student_auth WHERE Student_Auth_ID = ?`;
        const [existingStudentAuth] = await pool.query(checkStudentAuthQuery, [Student_Auth_ID]);
        if (existingStudentAuth.length === 0) {
            return res.status(404).json({ message: "Student Authentication not found", status_code: 404 });
        }

        // Delete the student_auth record
        const deleteQuery = `DELETE FROM student_auth WHERE Student_Auth_ID = ?`;
        await pool.query(deleteQuery, [Student_Auth_ID]);

        res.status(200).json({ message: "Student Authentication deleted successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export { RegisterStudent, LoginStudent, UpdateStudentAuth, DeleteStudentAuth };
