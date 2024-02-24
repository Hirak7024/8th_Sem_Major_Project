import pool from "../DataBase.js";

//INSERT INTO TABLE STUDENTS
const InsertStudent = async (req, res) => {
    const { Student_Auth_ID, Roll_No, Email, Name, Phone_No, Date_of_Birth, Registration_No, Course, Department, Year_of_Joining, Year_of_Passing } = req.body;

    try {
        // Check if Student_Auth_ID corresponds to the Email in student_auth table
        const authIdEmailCheckQuery = `SELECT * FROM student_auth WHERE Student_Auth_ID = ? AND Email = ?`;
        const [authIdEmailCheckResult] = await pool.query(authIdEmailCheckQuery, [Student_Auth_ID, Email]);
        if (authIdEmailCheckResult.length === 0) {
            return res.status(400).json({ message: "Email and Student Auth Id doesn't match as per Student Authentication Table", status_code: 400 });
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

        // Get the last inserted Student_ID
        const getLastInsertedIdQuery = `SELECT LAST_INSERT_ID() AS Student_ID`;
        const [lastInsertedIdResult] = await pool.query(getLastInsertedIdQuery);
        const Student_ID = lastInsertedIdResult[0].Student_ID;

        // Prepare userResponse including Student_ID
        const userResponse = { Student_ID, Student_Auth_ID, Roll_No, Email, Name, Phone_No, Date_of_Birth, Registration_No, Course, Department, Year_of_Joining, Year_of_Passing };

        res.status(200).json({ data: { userResponse }, message: "Student Data Inserted Successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//UPDATE VALUES AT TABLE STUDENT
const UpdateStudent = async (req, res) => {
    const { Student_ID, ...updates } = req.body; // Extract Student_ID and other fields to be updated from request body

    try {
        // Check if the student with the provided Student_ID exists
        const checkStudentQuery = `SELECT * FROM students WHERE Student_ID = ?`;
        const [existingStudent] = await pool.query(checkStudentQuery, [Student_ID]);
        if (existingStudent.length === 0) {
            return res.status(404).json({ message: "Student not found", status_code: 404 });
        }

        // Construct the dynamic SQL query to update only the provided fields
        const updateFields = Object.keys(updates);
        const updateValues = Object.values(updates);
        const updateQuery = `UPDATE students SET ${updateFields.map(field => `${field} = ?`).join(', ')} WHERE Student_ID = ?`;

        // Execute the update query
        const valuesToUpdate = [...updateValues, Student_ID];
        await pool.query(updateQuery, valuesToUpdate);

        // Fetch the updated student record
        const updatedStudentQuery = `SELECT * FROM students WHERE Student_ID = ?`;
        const [updatedStudent] = await pool.query(updatedStudentQuery, [Student_ID]);

        res.status(200).json({ data: updatedStudent[0], message: "Student updated successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//DELETE A REW FROM TABLE STUDENT
const DeleteStudent = async (req, res) => {
    const { Student_ID } = req.body;

    try {
        // Check if the student with the provided Student_ID exists
        const checkStudentQuery = `SELECT * FROM students WHERE Student_ID = ?`;
        const [existingStudent] = await pool.query(checkStudentQuery, [Student_ID]);
        if (existingStudent.length === 0) {
            return res.status(404).json({ message: "Student not found", status_code: 404 });
        }

        // Delete the student record
        const deleteQuery = `DELETE FROM students WHERE Student_ID = ?`;
        await pool.query(deleteQuery, [Student_ID]);

        res.status(200).json({ message: "Student deleted successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { InsertStudent, UpdateStudent, DeleteStudent };


