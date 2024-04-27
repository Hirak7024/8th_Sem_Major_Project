import pool from "../DataBase.js";

// TO INSERT VALUES INTO TABLE COMMENTS
export const insertIntoComments = async (req, res) => {
  const fields = req.body;

  if (!fields || Object.keys(fields).length === 0) {
    return res.status(400).json({ message: 'Fields parameter is required' });
  }

  const columns = Object.keys(fields).join(', ');
  const values = Object.values(fields);

  const placeholders = Array(values.length).fill('?').join(', ');

  try {
    // Construct the SQL query dynamically
    const query = `INSERT INTO comments (${columns}) VALUES (${placeholders})`;

    // Execute the query
    await pool.query(query, values);
    
    // Respond with success message
    return res.status(200).json({ message: 'Values inserted into comments table' });
  } catch (error) {
    console.error('Error inserting values into comments table:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// TO UPDATE VALUES INTO TABLE COMMENTS
export const updateCommentField = async (req, res) => {
  const { id, AdminMsgReadStatus, StudentReply, StudentReplyReadStatus } = req.body;

  if (!id || (!AdminMsgReadStatus && !StudentReply && !StudentReplyReadStatus)) {
    return res.status(400).json({ message: 'ID and at least one field to update are required' });
  }

  try {
    const updates = [];
    const values = [];

    // Build the update query dynamically based on the fields provided
    if (AdminMsgReadStatus !== undefined) {
      updates.push('AdminMsgReadStatus = ?');
      values.push(AdminMsgReadStatus);
    }
    if (StudentReply !== undefined) {
      updates.push('StudentReply = ?');
      values.push(StudentReply);
    }
    if (StudentReplyReadStatus !== undefined) {
      updates.push('StudentReplyReadStatus = ?');
      values.push(StudentReplyReadStatus);
    }

    // Construct the SQL query dynamically
    const query = `UPDATE comments SET ${updates.join(', ')} WHERE id = ?`;

    // Execute the query
    const allValues = [...values, id];
    await pool.query(query, allValues);
    
    // Respond with success message
    return res.status(200).json({ message: 'Fields updated successfully' });
  } catch (error) {
    console.error('Error updating fields in comments table:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};







