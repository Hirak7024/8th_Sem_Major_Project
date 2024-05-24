import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../DataBase.js';

//TO REGISTER NEW ADMIN
export const RegisterAdmin = async (req, res) => {
    const { UserName, Password, Name } = req.body;
    // const serverSignUpKey = process.env.AdminSignUpKey;

    try {
        // Check if SignUpKey matches the server SignUpKey
        // if (SignUpKey !== serverSignUpKey) {
        //     return res.status(400).json({ message: "Invalid Sign Up Key", status_code: 400 });
        // }

        // Check if user already exists
        const [existingUsers] = await pool.execute('SELECT * FROM admin WHERE UserName = ?', [UserName]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "UserName already exists", status_code: 400 });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(Password, salt);

        // Insert new user
        await pool.execute('INSERT INTO admin (UserName, Password,Name) VALUES (?, ?,?)', [UserName, hashedPass, Name]);

        // Retrieve the newly inserted user to get Admin_ID
        const [newUser] = await pool.execute('SELECT Admin_ID,Name FROM admin WHERE UserName = ?', [UserName]);
        const user = newUser[0];

        // Generate JWT token
        const token = jwt.sign({ UserName, ID: user.Admin_ID, Name: user.Name  }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 });

        // Prepare response
        const userResponse = { UserName, ID: user.Admin_ID, Name: user.Name };

        res.status(200).json({ data: { userResponse, token }, message: "Admin Registered Successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// TO LOGIN ADMIN
export const LoginAdmin = async (req, res) => {
    const { UserName, Password } = req.body;

    try {
        // Check if user exists. BINARY keyword helps to check case sensitivity
        const [users] = await pool.execute('SELECT * FROM admin WHERE BINARY UserName = ?', [UserName]);
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
        const token = jwt.sign({ UserName, ID: user.Admin_ID, Name: user.Name  }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 });

        // Prepare response
        const userResponse = { UserName, ID: user.Admin_ID, Name: user.Name  };

        res.status(200).json({ data: { userResponse, token }, message: "Login Successful", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// TO UPDATE PASSWORD USING USERNAME OF ADMIN
export const UpdateAdminPassword = async (req, res) => {
    const { UserName, newPassword } = req.body;

    if (!UserName || !newPassword) {
        return res.status(400).json({ message: "UserName and New Password are required", status_code: 400 });
    }

    try {
        // Check if the admin exists
        const [existingUsers] = await pool.execute('SELECT * FROM admin WHERE BINARY UserName = ?', [UserName]);
        if (existingUsers.length === 0) {
            return res.status(404).json({ message: "Admin not found", status_code: 404 });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(newPassword, salt);

        // Update the admin's password
        await pool.execute('UPDATE admin SET Password = ? WHERE BINARY UserName = ?', [hashedPass, UserName]);

        res.status(200).json({ message: "Password updated successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
