import pool from '../DataBase.js';

// INSERT INTO INTERNSHIPS
export const InsertInternship = async (req, res) => {
    const { Roll_No, Internship_Type, Title, Start_Date, End_Date, Organisation, Guide_Name, Guide_Designation, Description, Certificate_Link, Report_Link } = req.body;

    try {
        // Check if the provided Roll No exists in the students table
        const checkRollNoQuery = `SELECT * FROM students WHERE Roll_No = ?`;
        const [existingStudent] = await pool.query(checkRollNoQuery, [Roll_No]);
        if (existingStudent.length === 0) {
            return res.status(400).json({ message: "Student Roll No doesn't exist in table students", status_code: 400 });
        }

        // Insert new project
        const insertQuery = `INSERT INTO internships (Roll_No, Internship_Type, Title, Start_Date, End_Date, Organisation, Guide_Name, Guide_Designation, Description, Certificate_Link, Report_Link) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await pool.query(insertQuery, [Roll_No, Internship_Type, Title, Start_Date, End_Date, Organisation, Guide_Name, Guide_Designation, Description, Certificate_Link, Report_Link]);

        res.status(200).json({ message: "Internship inserted successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE INTERNSHIPS
export const UpdateInternship = async (req, res) => {
    const { Internship_ID, ...updateFields } = req.body;

    try {
        // Check if the project with the provided Project_ID exists
        const checkProjectQuery = `SELECT * FROM internships WHERE Internship_ID = ?`;
        const [existingProject] = await pool.query(checkProjectQuery, [Internship_ID]);
        if (existingProject.length === 0) {
            return res.status(404).json({ message: "Internship not found", status_code: 404 });
        }

        // Construct the dynamic SQL query to update the project
        let updateQuery = `UPDATE internships SET `;
        const updateValues = [];
        Object.keys(updateFields).forEach(key => {
            updateQuery += `${key} = ?, `;
            updateValues.push(updateFields[key]);
        });
        // Remove the trailing comma and space from the query string
        updateQuery = updateQuery.slice(0, -2);
        updateQuery += ` WHERE Internship_ID = ?`;
        updateValues.push(Internship_ID);

        // Execute the update query
        await pool.query(updateQuery, updateValues);

        res.status(200).json({ message: "Internship updated successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//DELETE AN INTERNSHIP 
export const DeleteInternship = async (req, res) => {
    const { Internship_ID } = req.body;

    try {
        // Check if the project with the provided Project_ID exists
        const checkProjectQuery = `SELECT * FROM internships WHERE Internship_ID = ?`;
        const [existingProject] = await pool.query(checkProjectQuery, [Internship_ID]);
        if (existingProject.length === 0) {
            return res.status(404).json({ message: "Internship not found", status_code: 404 });
        }

        // Delete the project record
        const deleteQuery = `DELETE FROM internships WHERE Internship_ID = ?`;
        await pool.query(deleteQuery, [Internship_ID]);

        res.status(200).json({ message: "Internship deleted successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//FETCH ALL INTERNSHIPS OF A STUDENT BY ROLL NO
export const fetchInternshipsByRollNo = async (req, res) => {
  try {
    const { Roll_No } = req.body;

    // Query to fetch all internship details of the student using Roll_No
    const [rows, fields] = await pool.execute('SELECT * FROM internships WHERE Roll_No = ?', [Roll_No]);

    // Check if any internships were found
    if (rows.length > 0) {
      // Internships found, return all details
      const internships = rows;
      return res.status(200).json(internships);
    } else {
      // No internships found for the student
      return res.status(404).json({ message: 'No internship details found for the student' });
    }
  } catch (error) {
    console.error('Error fetching internships by Roll_No:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};






