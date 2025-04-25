require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to the database:', err);
  } else {
    console.log('✅ Connected to the MySQL database.');
  }
});

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Blood Bank Management API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
