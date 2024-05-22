import pool from "../DataBase.js";

// TO INSERT VALUES INTO TABLE NEED_CORRECTION
export const insertIntoNeedCorrection = async (req, res) => {
  const { Student_ID, Student_UserName, Student_RollNo, Student_Name } = req.body;

  // Check if the student roll number already exists
  const [existingStudent] = await pool.query('SELECT * FROM need_correction WHERE Student_ID = ?', [Student_ID]);
  if (existingStudent.length > 0) {
    return res.status(400).json({ message: 'Student already exists' });
  }

  try {
    // Insert values into the need_correction table
    await pool.query(
      'INSERT INTO need_correction (Student_ID, Student_UserName, Student_RollNo, Student_Name) VALUES (?, ?, ?, ?)',
      [Student_ID, Student_UserName, Student_RollNo, Student_Name]
    );
    
    // Respond with success message
    return res.status(200).json({ message: 'Student Saved Successfully' });
  } catch (error) {
    console.error('Error inserting values into need_correction table:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// TO GET ALL ROWS OF TABLE NEED_CORRECTION
export const getAllNeedCorrection = async (req, res) => {
  try {
    // Query to select all rows and values from the need_correction table
    const [rows] = await pool.query('SELECT * FROM need_correction');
    
    // Respond with the retrieved rows
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Error retrieving data from need_correction table:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// TO DELETE A ROW FROM TABLE NEED_CORRECTION
export const deleteNeedCorrectionByStudentID = async (req, res) => {
  const { Student_ID } = req.body;

  if (!Student_ID) {
    return res.status(400).json({ message: 'Student_ID parameter is required' });
  }

  try {
    // Delete the row from the need_correction table based on the provided Student_ID
    const [result] = await pool.query('DELETE FROM need_correction WHERE Student_ID = ?', [Student_ID]);

    // Check if any row was affected by the deletion
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Respond with a success message
    return res.status(200).json({ message: 'Student removed successfully' });
  } catch (error) {
    console.error('Error deleting row from need_correction table:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





