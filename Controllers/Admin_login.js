const connection = require('../Connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleAdminLogin = async (req, res) => {
    const { username, password } = req.body;

    // Validate username and password
    if (!username || username.trim() === "") {
        return res.status(200).json({ ResponseCode: 0, message: "Username Is Required" });
    }

    if (!password || password.trim() === "") {
        return res.status(200).json({ ResponseCode: 0, message: "Password Is Required" });
    }

    const admin_login_query = "CALL SP_admin_login(?)";

    try {
        connection.query(admin_login_query, [username], async (err, result) => {
            if (err) {
                return res.status(500).json({ ResponseCode: 0, message: "Internal Server Error" });
            }

            const user = result[0][0];

            if (!user) {
                return res.status(200).json({ ResponseCode: 0, message: "Invalid Username" });
            }

            // Check if the password exists
            if (!user.password) {
                return res.status(200).json({ ResponseCode: 0, message: "Password not found" });
            }

            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(200).json({ ResponseCode: 0, message: "Check your password" });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            );const handleAdminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate username and password
        if (!username || username.trim() === "") {
            return res.status(400).json({ ResponseCode: 0, message: "Username Is Required" });
        }

        if (!password || password.trim() === "") {
            return res.status(400).json({ ResponseCode: 0, message: "Password Is Required" });
        }

        const admin_login_query = "CALL SP_admin_login(?)";

        connection.query(admin_login_query, [username], async (err, result) => {
            if (err) {
                console.error('Error:', err);
                return res.status(500).json({ ResponseCode: 0, message: "Internal Server Error" });
            }

            const user = result[0][0];

            if (!user) {
                return res.status(401).json({ ResponseCode: 0, message: "Invalid Username" });
            }

            // Check if the password exists
            if (!user.password) {
                return res.status(401).json({ ResponseCode: 0, message: "Password not found" });
            }

            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ ResponseCode: 0, message: "Check your password" });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            );

            // Set cookie options
            const domain = process.env.COOKIE_DOMAIN || 'your-default-domain.com'; // Replace with your domain or set it in environment variables

            res.cookie('token', token, {
                path: '/',
                domain: domain,
                secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                sameSite: 'Strict', // Adjust based on your needs
                httpOnly: true, // Prevent JavaScript access to the cookie
            });

            return res.status(200).json({
                ResponseCode: 1,
                message: "User logged in successfully",
                username: user.username,
                token: token
            });
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ ResponseCode: 0, message: "Internal Server Error" });
    }
};

            console.log(token);

            // Set cookie options
            const domain = process.env.COOKIE_DOMAIN || 'your-default-domain.com'; // Replace with your domain or set it in environment variables
            
            res.cookie('token', token, {
                path: '/',
                domain: domain,
                secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                sameSite: 'Strict', // Adjust based on your needs
            });

            return res.status(200).json({
                ResponseCode: 1,
                message: "User logged in successfully",
                username: user.username,
                token: token
            });
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ ResponseCode: 0, message: "Internal Server Error" });
    }
};

module.exports = handleAdminLogin;
