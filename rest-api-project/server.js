const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// ✅ SECURITY MIDDLEWARES (from Security PDF)
app.use(helmet()); // Security headers + XSS protection
app.use(cors({ // CORS - only allow trusted origins
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// ✅ DDoS Protection - Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per IP
    message: 'Too many requests, please try again later.'
});
app.use(limiter);

// ✅ Body Parser
app.use(express.json());

// ✅ ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/students', require('./routes/students'));

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});