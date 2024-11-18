const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.MY_SQL_HOST || 'localhost',
    user: process.env.MY_SQL_USER || 'root',
    password: process.env.MY_SQL_PASSWORD || '1234',
    database: process.env.MY_SQL_DATABASE || 'jwt_token',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

module.exports = connection;
