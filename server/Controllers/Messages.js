import pool from "../DataBase.js";

// TO INSERT VALUES INTO TABLE MESSAGES
export const insertIntoMessages = async (req, res) => {
  const fields = req.body;

  if (!fields || Object.keys(fields).length === 0) {
    return res.status(400).json({ message: 'Fields parameter is required' });
  }

  const columns = Object.keys(fields).join(', ');
  const values = Object.values(fields);

  const placeholders = Array(values.length).fill('?').join(', ');

  try {
    // Construct the SQL query dynamically
    const query = `INSERT INTO messages (${columns}) VALUES (${placeholders})`;

    // Execute the query
    await pool.query(query, values);
    
    // Respond with success message
    return res.status(200).json({ message: 'Values inserted into messages table' });
  } catch (error) {
    console.error('Error inserting values into messages table:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// TO UPDATE VALUES AT TABLE MESSAGES
export const updateMessage = async (req, res) => {
  const { id, ...updates } = req.body; // Extract id and other fields to be updated from request body

  try {
    // Check if the message with the provided id exists
    const checkMessageQuery = `SELECT * FROM messages WHERE id = ?`;
    const [existingMessage] = await pool.query(checkMessageQuery, [id]);
    if (existingMessage.length === 0) {
      return res.status(404).json({ message: "Message not found", status_code: 404 });
    }

    // Construct the dynamic SQL query to update only the provided fields
    const updateFields = Object.keys(updates);
    const updateValues = Object.values(updates);
    const updateQuery = `UPDATE messages SET ${updateFields.map(field => `${field} = ?`).join(', ')} WHERE id = ?`;

    // Execute the update query
    const valuesToUpdate = [...updateValues, id];
    await pool.query(updateQuery, valuesToUpdate);

    // Fetch the updated message record
    const updatedMessageQuery = `SELECT * FROM messages WHERE id = ?`;
    const [updatedMessage] = await pool.query(updatedMessageQuery, [id]);

    res.status(200).json({ data: updatedMessage[0], message: "Message updated successfully", status_code: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TO FETCH ALL ROWS USING Sender_Email
export const getMessagesBySenderEmail = async (req, res) => {
  const { Sender_Email } = req.body; // Extract Sender_Email from request body

  try {
    // Check if the Sender_Email exists in the messages table
    const checkSenderQuery = `SELECT * FROM messages WHERE Sender_Email = ? LIMIT 1`;
    const [existingSender] = await pool.query(checkSenderQuery, [Sender_Email]);

    if (existingSender.length === 0) {
      return res.status(404).json({ message: "Sender not found in messages", status_code: 404 });
    }

    // Fetch messages with the provided Sender_Email
    const query = `SELECT * FROM messages WHERE Sender_Email = ?`;
    const [messages] = await pool.query(query, [Sender_Email]);

    res.status(200).json({ data: messages, message: "Messages retrieved successfully", status_code: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TO FETCH ALL ROWS USING Receiver_Email
export const getMessagesByReceiverEmail = async (req, res) => {
  const { Receiver_Email } = req.body; // Extract Sender_Email from request body

  try {
    // Check if the Receiver_Email exists in the messages table
    const checkSenderQuery = `SELECT * FROM messages WHERE Receiver_Email = ? LIMIT 1`;
    const [existingSender] = await pool.query(checkSenderQuery, [Receiver_Email]);

    if (existingSender.length === 0) {
      return res.status(404).json({ message: "Receiver not found in messages", status_code: 404 });
    }

    // Fetch messages with the provided Receiver_Email
    const query = `SELECT * FROM messages WHERE Receiver_Email = ?`;
    const [messages] = await pool.query(query, [Receiver_Email]);

    res.status(200).json({ data: messages, message: "Messages retrieved successfully", status_code: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

