import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../DataBase.js';

//TO REGISTER NEW ADMIN
export const RegisterAdmin = async (req, res) => {
    const { Email, Password, SignUpKey, Admin_Name } = req.body;
    const serverSignUpKey = process.env.AdminSignUpKey;

    try {
        // Check if SignUpKey matches the server SignUpKey
        if (SignUpKey !== serverSignUpKey) {
            return res.status(400).json({ message: "Invalid Sign Up Key", status_code: 400 });
        }

        // Check if user already exists
        const [existingUsers] = await pool.execute('SELECT * FROM admin WHERE Email = ?', [Email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "Admin is already registered", status_code: 400 });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(Password, salt);

        // Insert new user
        await pool.execute('INSERT INTO admin (Email, Password,Admin_Name) VALUES (?, ?,?)', [Email, hashedPass, Admin_Name]);

        // Retrieve the newly inserted user to get Admin_ID
        const [newUser] = await pool.execute('SELECT Admin_ID,Admin_Name FROM admin WHERE Email = ?', [Email]);
        const user = newUser[0];

        // Generate JWT token
        const token = jwt.sign({ Email }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 });

        // Prepare response
        const userResponse = { Email, Admin_ID: user.Admin_ID, Admin_Name: user.Admin_Name };

        res.status(200).json({ data: { userResponse, token }, message: "Admin Registered Successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// TO LOGIN ADMIN
export const LoginAdmin = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        // Check if user exists
        const [users] = await pool.execute('SELECT * FROM admin WHERE Email = ?', [Email]);
        if (users.length === 0) {
            return res.status(404).json({ message: "Admin doesn't exist", status_code: 404 });
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
        const userResponse = { Email: user.Email, Admin_ID: user.Admin_ID, Admin_Name: user.Admin_Name };

        res.status(200).json({ data: { userResponse, token }, message: "Login Successful", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};