const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

let students = [
    { id: 1, name: 'Ali', email: 'ali@gmail.com', department: 'CS' },
    { id: 2, name: 'Sara', email: 'sara@gmail.com', department: 'IT' }
];

// ✅ GET all students (Protected)
router.get('/', authMiddleware, (req, res) => {
    res.json(students);
});

// ✅ GET student by ID (Protected)
router.get('/:id', authMiddleware, (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
});

// ✅ POST create student (Protected)
router.post('/', authMiddleware, (req, res) => {
    const newStudent = { id: students.length + 1, ...req.body };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// ✅ PUT update student (Protected)
router.put('/:id', authMiddleware, (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ message: 'Student not found' });
    Object.assign(student, req.body);
    res.json(student);
});

// ✅ DELETE student (Protected)
router.delete('/:id', authMiddleware, (req, res) => {
    students = students.filter(s => s.id !== parseInt(req.params.id));
    res.json({ message: 'Student deleted successfully' });
});

module.exports = router;