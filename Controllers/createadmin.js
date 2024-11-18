const bcrypt = require('bcrypt');
const conn = require('../Connection')

const CreateUser = async (req, res) => {
    const {username, password} = req.body;


    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const query = 'INSERT INTO admin_login (username, password) VALUES (?, ?)';
        
        conn.query(query, [username, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send('Error registering user');
            }
            res.status(201).send('User registered successfully');
        });
    } catch (err) {
        console.error('Error hashing password:', err);
        res.status(500).send('Error registering user');
    }


}

module.exports = CreateUser