const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

let books = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', price: 500 },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', price: 700 }
];

// ✅ GET /api/books — Get all books (Public)
router.get('/', (req, res) => {
    res.json(books);
});

// ✅ GET /api/books/:id — Get single book (Public)
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});

// ✅ POST /api/books — Add book (Protected - need JWT)
router.post('/', authMiddleware, (req, res) => {
    const { title, author, price } = req.body;
    const newBook = { id: books.length + 1, title, author, price };
    books.push(newBook);
    res.status(201).json(newBook);
});

// ✅ PUT /api/books/:id — Update book (Protected)
router.put('/:id', authMiddleware, (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Book not found' });
    books[index] = { id: books[index].id, ...req.body };
    res.json(books[index]);
});

// ✅ DELETE /api/books/:id — Delete book (Protected)
router.delete('/:id', authMiddleware, (req, res) => {
    books = books.filter(b => b.id !== parseInt(req.params.id));
    res.json({ message: 'Book deleted successfully' });
});

module.exports = router;