import pool from '../DataBase.js';

// INSERT INTO INTERNSHIPS
export const InsertInternship = async (req, res) => {
    const { Internship_Roll_No, Internship_Type, Internship_Title, Internship_Start_Date, Internship_End_Date, Internship_Organisation, Internship_Guide_Name, Internship_Guide_Designation, Internship_Description} = req.body;

    try {
        // Check if the provided Roll No exists in the students table
        const checkRollNoQuery = `SELECT * FROM students WHERE Roll_No = ?`;
        const [existingStudent] = await pool.query(checkRollNoQuery, [Internship_Roll_No]);
        if (existingStudent.length === 0) {
            return res.status(400).json({ message: "Student Roll No doesn't exist in table students", status_code: 400 });
        }

        // Insert new project
        const insertQuery = `INSERT INTO internships (Internship_Roll_No, Internship_Type, Internship_Title, Internship_Start_Date, Internship_End_Date, Internship_Organisation, Internship_Guide_Name, Internship_Guide_Designation, Internship_Description) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await pool.query(insertQuery, [Internship_Roll_No, Internship_Type, Internship_Title, Internship_Start_Date, Internship_End_Date, Internship_Organisation, Internship_Guide_Name, Internship_Guide_Designation, Internship_Description]);

        res.status(200).json({ message: "Internship inserted successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE INTERNSHIPS
export const UpdateInternship = async (req, res) => {
    const { Internship_ID, ...updateFields } = req.body;

    try {
        // Check if the internship with the provided Internship_ID exists
        const checkInternshipQuery = `SELECT * FROM internships WHERE Internship_ID = ?`;
        const [existingInternship] = await pool.query(checkInternshipQuery, [Internship_ID]);
        if (existingInternship.length === 0) {
            return res.status(404).json({ message: "Internship not found", status_code: 404 });
        }

        // Construct the dynamic SQL query to update the internship
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

        // Fetch the updated internship record
        const updatedInternshipQuery = `SELECT * FROM internships WHERE Internship_ID = ?`;
        const [updatedInternship] = await pool.query(updatedInternshipQuery, [Internship_ID]);

        res.status(200).json({ data: updatedInternship[0], message: "Internship updated successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//DELETE AN INTERNSHIP 
export const DeleteInternship = async (req, res) => {
    const { Internship_ID } = req.body;

    try {
        // Check if the internship with the provided Internship_ID exists
        const checkInternshipQuery = `SELECT * FROM internships WHERE Internship_ID = ?`;
        const [existingInternship] = await pool.query(checkInternshipQuery, [Internship_ID]);
        if (existingInternship.length === 0) {
            return res.status(404).json({ message: "Internship not found", status_code: 404 });
        }

        // Delete the internship record
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
    const [rows, fields] = await pool.execute('SELECT * FROM internships WHERE Internship_Roll_No = ?', [Roll_No]);

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

// FETCH INTERNSHIP DETAILS OF A PARTICULAR INTERNSHIP USING INTERNSHIP_ID
export const fetchInternshipDetailsById = async (req, res) => {
  try {
    const { Internship_ID } = req.body;

    // Query to check if the internship exists
    const [internshipRows, _] = await pool.execute('SELECT * FROM internships WHERE Internship_ID = ?', [Internship_ID]);

    // Check if any internship was found
    if (internshipRows.length === 0) {
      // Internship not found
      return res.status(404).json({ message: 'Internship details not found' });
    } 

    // Internship found, fetch details
    const [rows, fields] = await pool.execute('SELECT * FROM internships WHERE Internship_ID = ?', [Internship_ID]);
    const internship = rows[0];
    
    return res.status(200).json(internship);
    
  } catch (error) {
    console.error('Error fetching internship details by Internship_ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};