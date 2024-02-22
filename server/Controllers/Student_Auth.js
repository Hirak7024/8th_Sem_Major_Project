import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../DataBase.js';

const RegisterStudent = async (req, res) => {
  const { Email, Password } = req.body;

  try {
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

    // Generate JWT token
    const token = jwt.sign({ Email }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 });

    // Prepare response
    const userResponse = { Email };

    res.status(200).json({ data: { userResponse, token }, message: "Student Registered Successfully", status_code: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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
    const userResponse = { Email };

    res.status(200).json({ data: { userResponse, token }, message: "Login Successful", status_code: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { RegisterStudent, LoginStudent };
