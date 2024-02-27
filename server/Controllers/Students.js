import pool from "../DataBase.js";

//INSERT INTO TABLE STUDENTS
export const InsertStudent = async (req, res) => {
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
export const UpdateStudent = async (req, res) => {
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
export const DeleteStudent = async (req, res) => {
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

// GET STUDENT DETAILS ALONG WITH THEIR INTERNSHIPS AND PROJECTS
export const FetchStudentDetails = async (req, res) => {
    const { Roll_No } = req.body;

    try {
        // Fetch student details from the students table
        const studentQuery = `SELECT * FROM students WHERE Roll_No = ?`;
        const [studentResult] = await pool.query(studentQuery, [Roll_No]);
        if (studentResult.length === 0) {
            return res.status(404).json({ message: "Student not found", status_code: 404 });
        }

        // Fetch projects of the student from the projects table
        const projectsQuery = `SELECT * FROM projects WHERE Roll_No = ?`;
        const [projectsResult] = await pool.query(projectsQuery, [Roll_No]);

        // Fetch internships of the student from the internships table
        const internshipsQuery = `SELECT * FROM internships WHERE Roll_No = ?`;
        const [internshipsResult] = await pool.query(internshipsQuery, [Roll_No]);

        // Prepare response object
        const studentDetails = {
            student: studentResult[0],
            projects: projectsResult,
            internships: internshipsResult
        };

        res.status(200).json({ data: studentDetails, status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // const { Roll_No } = req.body;

    // try {
    //     // Construct the SQL query to fetch student details along with projects and internships
    //     const query = `
    //         SELECT 
    //             s.Student_ID,
    //             s.Student_Auth_ID,
    //             s.Roll_No,
    //             s.Email,
    //             s.Name,
    //             s.Phone_No,
    //             s.Date_of_Birth,
    //             s.Registration_No,
    //             s.Course,
    //             s.Department,
    //             s.Year_of_Joining,
    //             s.Year_of_Passing,
    //             p.Project_ID AS Project_ID,
    //             p.Project_Type,
    //             p.Title AS Project_Title,
    //             p.Start_Date AS Project_Start_Date,
    //             p.End_Date AS Project_End_Date,
    //             p.Organisation AS Project_Organisation,
    //             p.Guide_Name AS Project_Guide_Name,
    //             p.Guide_Designation AS Project_Guide_Designation,
    //             p.Description AS Project_Description,
    //             p.Certificate_Link AS Project_Certificate_Link,
    //             p.Report_Link AS Project_Report_Link,
    //             i.Internship_ID AS Internship_ID,
    //             i.Internship_Type,
    //             i.Title AS Internship_Title,
    //             i.Start_Date AS Internship_Start_Date,
    //             i.End_Date AS Internship_End_Date,
    //             i.Organisation AS Internship_Organisation,
    //             i.Guide_Name AS Internship_Guide_Name,
    //             i.Guide_Designation AS Internship_Guide_Designation,
    //             i.Description AS Internship_Description,
    //             i.Certificate_Link AS Internship_Certificate_Link,
    //             i.Report_Link AS Internship_Report_Link
    //         FROM students s
    //         LEFT JOIN projects p ON s.Roll_No = p.Roll_No
    //         LEFT JOIN internships i ON s.Roll_No = i.Roll_No
    //         WHERE s.Roll_No = ?
    //     `;

    //     // Execute the SQL query
    //     const [result] = await pool.query(query, [Roll_No]);

    //     // Send the result as a JSON response
    //     res.status(200).json({ data: result, status_code: 200 });
    // } catch (error) {
    //     // Handle errors
    //     res.status(500).json({ message: error.message });
    // }
};



// FETCH ALL DETAILS OF A STUDENT IN A ROW

export const GetStudentDetailsInRow = async (req, res) => {
    const rollNo = req.body.Roll_No;

    try {
        const [rows] = await pool.query(`
            SELECT 
                s.Student_ID,
                s.Student_Auth_ID,
                s.Roll_No,
                s.Email,
                s.Name,
                s.Phone_No,
                s.Date_of_Birth,
                s.Registration_No,
                s.Course,
                s.Department,
                s.Year_of_Joining,
                s.Year_of_Passing,
                MIN(CASE WHEN p.Project_Type = 'minor project' THEN p.Project_ID END) AS Minor_Project_ID,
                MAX(CASE WHEN p.Project_Type = 'minor project' THEN p.Title END) AS Minor_Project_Title,
                MAX(CASE WHEN p.Project_Type = 'minor project' THEN p.Start_Date END) AS Minor_Project_Start_Date,
                MAX(CASE WHEN p.Project_Type = 'minor project' THEN p.End_Date END) AS Minor_Project_End_Date,
                MAX(CASE WHEN p.Project_Type = 'minor project' THEN p.Organisation END) AS Minor_Project_Organisation,
                MAX(CASE WHEN p.Project_Type = 'minor project' THEN p.Guide_Name END) AS Minor_Project_Guide_Name,
                MAX(CASE WHEN p.Project_Type = 'minor project' THEN p.Guide_Designation END) AS Minor_Project_Guide_Designation,
                MAX(CASE WHEN p.Project_Type = 'minor project' THEN p.Description END) AS Minor_Project_Description,
                MAX(CASE WHEN p.Project_Type = 'minor project' THEN p.Certificate_Link END) AS Minor_Project_Certificate_Link,
                MAX(CASE WHEN p.Project_Type = 'minor project' THEN p.Report_Link END) AS Minor_Project_Report,
                MIN(CASE WHEN p.Project_Type = 'major project' THEN p.Project_ID END) AS Major_Project_ID,
                MAX(CASE WHEN p.Project_Type = 'major project' THEN p.Title END) AS Major_Project_Title,
                MAX(CASE WHEN p.Project_Type = 'major project' THEN p.Start_Date END) AS Major_Project_Start_Date,
                MAX(CASE WHEN p.Project_Type = 'major project' THEN p.End_Date END) AS Major_Project_End_Date,
                MAX(CASE WHEN p.Project_Type = 'major project' THEN p.Organisation END) AS Major_Project_Organisation,
                MAX(CASE WHEN p.Project_Type = 'major project' THEN p.Guide_Name END) AS Major_Project_Guide_Name,
                MAX(CASE WHEN p.Project_Type = 'major project' THEN p.Guide_Designation END) AS Major_Project_Guide_Designation,
                MAX(CASE WHEN p.Project_Type = 'major project' THEN p.Description END) AS Major_Project_Description,
                MAX(CASE WHEN p.Project_Type = 'major project' THEN p.Certificate_Link END) AS Major_Project_Certificate_Link,
                MAX(CASE WHEN p.Project_Type = 'major project' THEN p.Report_Link END) AS Major_Project_Report,
                MIN(CASE WHEN i.Internship_Type = 'social' THEN i.Internship_ID END) AS Social_Internship_ID,
                MAX(CASE WHEN i.Internship_Type = 'social' THEN i.Title END) AS Social_Internship_Title,
                MAX(CASE WHEN i.Internship_Type = 'social' THEN i.Start_Date END) AS Social_Internship_Start_Date,
                MAX(CASE WHEN i.Internship_Type = 'social' THEN i.End_Date END) AS Social_Internship_End_Date,
                MAX(CASE WHEN i.Internship_Type = 'social' THEN i.Organisation END) AS Social_Internship_Organisation,
                MAX(CASE WHEN i.Internship_Type = 'social' THEN i.Guide_Name END) AS Social_Internship_Guide_Name,
                MAX(CASE WHEN i.Internship_Type = 'social' THEN i.Guide_Designation END) AS Social_Internship_Guide_Designation,
                MAX(CASE WHEN i.Internship_Type = 'social' THEN i.Description END) AS Social_Internship_Description,
                MAX(CASE WHEN i.Internship_Type = 'social' THEN i.Certificate_Link END) AS Social_Internship_Certificate_Link,
                MAX(CASE WHEN i.Internship_Type = 'social' THEN i.Report_Link END) AS Social_Internship_Report,
                MIN(CASE WHEN i.Internship_Type = 'academic' THEN i.Internship_ID END) AS Academic_Internship_ID,
                MAX(CASE WHEN i.Internship_Type = 'academic' THEN i.Title END) AS Academic_Internship_Title,
                MAX(CASE WHEN i.Internship_Type = 'academic' THEN i.Start_Date END) AS Academic_Internship_Start_Date,
                MAX(CASE WHEN i.Internship_Type = 'academic' THEN i.End_Date END) AS Academic_Internship_End_Date,
                MAX(CASE WHEN i.Internship_Type = 'academic' THEN i.Organisation END) AS Academic_Internship_Organisation,
                MAX(CASE WHEN i.Internship_Type = 'academic' THEN i.Guide_Name END) AS Academic_Internship_Guide_Name,
                MAX(CASE WHEN i.Internship_Type = 'academic' THEN i.Guide_Designation END) AS Academic_Internship_Guide_Designation,
                MAX(CASE WHEN i.Internship_Type = 'academic' THEN i.Description END) AS Academic_Internship_Description,
                MAX(CASE WHEN i.Internship_Type = 'academic' THEN i.Certificate_Link END) AS Academic_Internship_Certificate_Link,
                MAX(CASE WHEN i.Internship_Type = 'academic' THEN i.Report_Link END) AS Academic_Internship_Report,
                MIN(CASE WHEN i.Internship_Type = 'industrial' THEN i.Internship_ID END) AS Industrial_Internship_ID,
                MAX(CASE WHEN i.Internship_Type = 'industrial' THEN i.Title END) AS Industrial_Internship_Title,
                MAX(CASE WHEN i.Internship_Type = 'industrial' THEN i.Start_Date END) AS Industrial_Internship_Start_Date,
                MAX(CASE WHEN i.Internship_Type = 'industrial' THEN i.End_Date END) AS Industrial_Internship_End_Date,
                MAX(CASE WHEN i.Internship_Type = 'industrial' THEN i.Organisation END) AS Industrial_Internship_Organisation,
                MAX(CASE WHEN i.Internship_Type = 'industrial' THEN i.Guide_Name END) AS Industrial_Internship_Guide_Name,
                MAX(CASE WHEN i.Internship_Type = 'industrial' THEN i.Guide_Designation END) AS Industrial_Internship_Guide_Designation,
                MAX(CASE WHEN i.Internship_Type = 'industrial' THEN i.Description END) AS Industrial_Internship_Description,
                MAX(CASE WHEN i.Internship_Type = 'industrial' THEN i.Certificate_Link END) AS Industrial_Internship_Certificate_Link,
                MAX(CASE WHEN i.Internship_Type = 'industrial' THEN i.Report_Link END) AS Industrial_Internship_Report
            FROM
                students s
                    LEFT JOIN
                projects p ON s.Roll_No = p.Roll_No
                    LEFT JOIN
                internships i ON s.Roll_No = i.Roll_No
            WHERE
                s.Roll_No = ?
            GROUP BY s.Student_ID;
        `, [rollNo]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ data: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



