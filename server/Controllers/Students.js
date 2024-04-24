import pool from "../DataBase.js";

//INSERT INTO TABLE STUDENTS
export const InsertStudent = async (req, res) => {
    const { Student_Auth_ID, Roll_No, Email, Name, Phone_No, Date_of_Birth, Registration_No, Course, Department, Year_of_Joining, Year_of_Passing,Semester } = req.body;

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
        const insertQuery = `INSERT INTO students (Student_Auth_ID, Roll_No, Email, Name, Phone_No, Date_of_Birth, Registration_No, Course, Department, Year_of_Joining, Year_of_Passing,Semester) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
        await pool.query(insertQuery, [Student_Auth_ID, Roll_No, Email, Name, Phone_No, Date_of_Birth, Registration_No, Course, Department, Year_of_Joining, Year_of_Passing,Semester]);

        // Get the last inserted Student_ID
        const getLastInsertedIdQuery = `SELECT LAST_INSERT_ID() AS Student_ID`;
        const [lastInsertedIdResult] = await pool.query(getLastInsertedIdQuery);
        const Student_ID = lastInsertedIdResult[0].Student_ID;

        // Prepare userResponse including Student_ID
        const userResponse = { Student_ID, Student_Auth_ID, Roll_No, Email, Name, Phone_No, Date_of_Birth, Registration_No, Course, Department, Year_of_Joining, Year_of_Passing, Semester };

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

//DELETE A ROW FROM TABLE STUDENT
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

//GET STUDENT DETAILS BY EMAIL
export const checkStudentByEmail = async (req, res) => {
  try {
    const { Email } = req.body;

    // Query to check if the student exists
    const [rows, fields] = await pool.execute('SELECT * FROM students WHERE Email = ?', [Email]);

    // Check if any student was found
    if (rows.length > 0) {
      // Student found, return all details
      const student = rows[0];
      return res.status(200).json(student);
    } else {
      // Student not found
      return res.status(404).json({ message: 'Student details do not exist' });
    }
  } catch (error) {
    console.error('Error checking student by email:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// FETCHING STUDENT DETAILS ALONG WITH INTERNSHIPS AND PROJECTS (ADMIN SIDE)
// export const fetchAllDetails = async (req, res) => {
//     try {
//       let { Roll_No, Registration_No, Department, Year_of_Joining, Year_of_Passing, Internship_Type, Project_Type } = req.body;
  
//       // Validate input parameters
//       if (!Department || !Year_of_Joining || !Year_of_Passing) {
//         return res.status(400).json({ success: false, error: 'Missing required parameters' });
//       }
  
//       if (isNaN(Year_of_Joining) || isNaN(Year_of_Passing)) {
//         return res.status(400).json({ success: false, error: 'Invalid joining or passing year' });
//       }
  
//       // If Roll_No, Registration_No, or Project_Type are not provided, set them to null
//       Roll_No = Roll_No || null;
//       Registration_No = Registration_No || null;
//       Project_Type = Project_Type || null;
//       Internship_Type = Internship_Type || null;
  
//       let query = `
//         SELECT 
//           students.*,
//           internships.Internship_Type, internships.Title AS Internship_Title, internships.Start_Date AS Internship_Start_Date, internships.End_Date AS Internship_End_Date,
//           projects.Project_Type, projects.Title AS Project_Title, projects.Start_Date AS Project_Start_Date, projects.End_Date AS Project_End_Date
//         FROM students
//         LEFT JOIN internships ON students.Roll_No = internships.Roll_No AND internships.Internship_Type = ?
//         LEFT JOIN projects ON students.Roll_No = projects.Roll_No AND projects.Project_Type = ?
//         WHERE 
//           students.Department = ? AND
//           (students.Year_of_Joining = ? OR students.Year_of_Joining IS NULL) AND
//           (students.Year_of_Passing = ? OR students.Year_of_Passing IS NULL)
//       `;
  
//       let queryParams = [Internship_Type, Project_Type, Department, Year_of_Joining, Year_of_Passing];
  
//       if (Roll_No) {
//         query += ` AND students.Roll_No = ?`;
//         queryParams.push(Roll_No);
//       }
  
//       if (Registration_No) {
//         query += ` AND students.Registration_No = ?`;
//         queryParams.push(Registration_No);
//       }
  
//       // Fetching student details with LEFT JOINs for internship and project details
//       const [rows] = await pool.query(query, queryParams);
  
//       // Sending the response
//       res.status(200).json({ success: true, data: rows });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       res.status(500).json({ success: false, error: 'Internal Server Error', details: error.message });
//     }
//   };
  

export const fetchAllDetails = async (req, res) => {
  try {
    let { Roll_No, Registration_No, Department, Year_of_Joining, Year_of_Passing, Internship_Type, Project_Type } = req.body;

    // Validate input parameters
    if (!Department || !Year_of_Joining || !Year_of_Passing) {
      return res.status(400).json({ success: false, error: 'Missing required parameters' });
    }

    if (isNaN(Year_of_Joining) || isNaN(Year_of_Passing)) {
      return res.status(400).json({ success: false, error: 'Invalid joining or passing year' });
    }

    // If Roll_No, Registration_No, or Project_Type are not provided, set them to null
    Roll_No = Roll_No || null;
    Registration_No = Registration_No || null;
    Project_Type = Project_Type || null;
    Internship_Type = Internship_Type || null;

    let query = `
      SELECT 
        students.*,
        internships.*, 
        projects.*     
      FROM students
      LEFT JOIN internships ON students.Roll_No = internships.Internship_Roll_No AND internships.Internship_Type = ?
      LEFT JOIN projects ON students.Roll_No = projects.Project_Roll_No AND projects.Project_Type = ?
      WHERE 
        students.Department = ? AND
        (students.Year_of_Joining = ? OR students.Year_of_Joining IS NULL) AND
        (students.Year_of_Passing = ? OR students.Year_of_Passing IS NULL)
    `;

    let queryParams = [Internship_Type, Project_Type, Department, Year_of_Joining, Year_of_Passing];

    if (Roll_No) {
      query += ` AND students.Roll_No = ?`;
      queryParams.push(Roll_No);
    }

    if (Registration_No) {
      query += ` AND students.Registration_No = ?`;
      queryParams.push(Registration_No);
    }

    // Fetching student details with LEFT JOINs for internship and project details
    const [rows] = await pool.query(query, queryParams);

    // Sending the response
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error', details: error.message });
  }
};



















