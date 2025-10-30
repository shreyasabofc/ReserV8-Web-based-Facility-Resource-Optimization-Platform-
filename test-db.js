const express = require('express');
const mysql = require('mysql');
const admin = require('./firebase'); // Import Firebase

const app = express();
const PORT = process.env.PORT || 5000;

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    port: process.env.DB_PORT || 3306,
    user: 'root',
    password: 'Shreyas007#',  // Replace with your actual password
    database: 'reserv8db'    // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
        process.exit(1); // Stop server if DB connection fails
    }
    console.log("✅ Connected to MySQL");

    // Check Firebase Connection
    admin.auth().listUsers(1)
        .then(() => console.log("🔥 Firebase Connected"))
        .catch((err) => console.error("❌ Firebase Connection Failed:", err.message));

    // Start Express server after successful DB & Firebase connection
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});
