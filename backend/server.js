require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5291', // Allow only this frontend
    credentials: true // Allowed headers
}));
app.use(bodyParser.json()); // Parse JSON requests
app.use(cookieParser());
const JWT_SECRET = process.env.JWT_SECRET;
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected TO MySQL SERVER-JS');
});
app.get("/profile", (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Invalid token" });

        db.query("SELECT id, name, email FROM users WHERE id = ?", [decoded.id], (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.json(result[0]);
        });
    });
});
// Sign-up Route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user exists
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (results.length > 0) return res.status(400).json({ msg: 'User already exists' });

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Insert new user
            db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword],
                (err, result) => {
                    if (err) return res.status(500).json({ msg: 'Database error' });
                    res.json({ msg: 'User registered successfully' });
                }
            );
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
});
// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (results.length === 0) return res.status(401).json({ msg: 'Invalid credentials' });

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // Set to true in production (HTTPS required)
                sameSite: "strict",
                maxAge: 3600000, // 1 hour
            });
            res.json({ message: "Login successful" });
            //res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
