import pool from "../DataBase.js";

const insertStudent = async (req, res) => {
    const { Student_Auth_ID, Roll_No, Email, Name, Phone_No, Date_of_Birth, Registration_No, Course, Department, Year_of_Joining, Year_of_Passing } = req.body;

    try {
        // Check if Student_Auth_ID corresponds to the Email in student_auth table
        const authIdEmailCheckQuery = `SELECT * FROM student_auth WHERE Student_Auth_ID = ? AND Email = ?`;
        const [authIdEmailCheckResult] = await pool.query(authIdEmailCheckQuery, [Student_Auth_ID, Email]);
        if (authIdEmailCheckResult.length === 0) {
            return res.status(400).json({ message: "Email and Student Auth Id doesn't match as per Student Authenctication Table", status_code: 400 });
        }

        // Check if Roll_No already exists
        const rollNoExistsQuery = `SELECT * FROM students WHERE Roll_No = ?`;
        const [existingRollNo] = await pool.query(rollNoExistsQuery, [Roll_No]);
        if (existingRollNo.length > 0) {
            return res.status(400).json({ message: "Roll No already exists", status_code: 400 });
        }

        // Check if Registration_No already exists
        const regNoExistsQuery = `SELECT * FROM students WHERE Registration_No = ?`;
        const [existingRegNo] = await pool.query(regNoExistsQuery, [Registration_No]);
        if (existingRegNo.length > 0) {
            return res.status(400).json({ message: "Registration No already exists", status_code: 400 });
        }

        // Insert new student
        const insertQuery = `INSERT INTO students (Student_Auth_ID, Roll_No, Email, Name, Phone_No, Date_of_Birth, Registration_No, Course, Department, Year_of_Joining, Year_of_Passing) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await pool.query(insertQuery, [Student_Auth_ID, Roll_No, Email, Name, Phone_No, Date_of_Birth, Registration_No, Course, Department, Year_of_Joining, Year_of_Passing]);

        // Prepare userResponse
        const userResponse = { Student_Auth_ID, Roll_No, Email, Name, Phone_No, Date_of_Birth, Registration_No, Course, Department, Year_of_Joining, Year_of_Passing };

        res.status(200).json({ data: { userResponse }, message: "Student Data Inserted Successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export { insertStudent };

// Update student by Roll No
// export const updateStudent = async (req, res) => {
//     const { Roll_No } = req.params;
//     const { Name, Phone_No, Date_of_Birth, Registration_No, Course, Department, Year_of_Joining, Year_of_Passing } = req.body;
//     try {
//         const query = `UPDATE students SET Name=?, Phone_No=?, Date_of_Birth=?, Registration_No=?, Course=?, Department=?, Year_of_Joining=?, Year_of_Passing=? WHERE Roll_No=?`;
//         await pool.query(query, [Name, Phone_No, Date_of_Birth, Registration_No, Course, Department, Year_of_Joining, Year_of_Passing, Roll_No]);
//         res.status(200).json({ message: "Student updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Delete student by Roll No
// export const deleteStudent = async (req, res) => {
//     const { Roll_No } = req.params;
//     try {
//         const query = `DELETE FROM students WHERE Roll_No=?`;
//         await pool.query(query, [Roll_No]);
//         res.status(200).json({ message: "Student deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Get student by Roll No
// export const getStudentByRollNo = async (req, res) => {
//     const { Roll_No } = req.params;
//     try {
//         const query = `SELECT * FROM students WHERE Roll_No=?`;
//         const [student] = await pool.query(query, [Roll_No]);
//         res.status(200).json({ student });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

