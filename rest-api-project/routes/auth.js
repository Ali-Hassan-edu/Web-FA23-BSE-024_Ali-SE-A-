const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Dummy user database (in real project, use MongoDB/MySQL)
let users = [];

// ✅ POST /api/auth/register
router.post('/register', async(req, res) => {
    const { name, email, password } = req.body;

    // Check if user exists
    const existing = users.find(u => u.email === email);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    // Hash password (never store plain text!)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(user);

    res.status(201).json({ message: 'User registered successfully', user: { id: user.id, name, email } });
});

// ✅ POST /api/auth/login
router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email },
        process.env.JWT_SECRET, { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
});

module.exports = router;