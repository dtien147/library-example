// bookRoutes.js
const express = require('express');
const router = express.Router();
const bookModel = require('../models/bookModel'); // Import book model
const authenticateUser = require('../middlewares/authMiddleware'); // Import authentication middleware

// Middleware to validate the request body for adding/updating a book
function validateAddBook(req, res, next) {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }
    next();
}

// Route to add a new book (requires authentication)
router.post('/books', authenticateUser, validateAddBook, async (req, res) => {
    const { title, author } = req.body;
    try {
        const newBook = await bookModel.addBook(title, author);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Error adding book' });
    }
});

// Route to update a book (requires authentication)
router.put('/books/:id', authenticateUser, validateAddBook, async (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    try {
        const updatedBook = await bookModel.updateBook(id, title, author);
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error updating book' });
    }
});

// Route to delete a book (requires authentication)
router.delete('/books/:id', authenticateUser, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await bookModel.deleteBook(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book' });
    }
});

// Route to get all books
router.get('/books', async (req, res) => {
    try {
        const books = await bookModel.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books' });
    }
});

// Route to get a book by its ID
router.get('/books/:id', async (req, res) => {
    const { id } = req.params; // Get the book ID from the route parameters

    try {
        const book = await bookModel.getBookById(id); // Fetch the book from the model
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book); // Return the book details
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
