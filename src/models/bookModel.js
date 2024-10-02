// bookModel.js
const db = require('../db'); // Import the database connection

// Function to add a new book
async function addBook(title, author) {
    try {
        // Insert the new book into the database
        const [bookId] = await db('books').insert({ title, author }).returning('id'); // Insert and get the new book ID

        // Fetch the newly created book
        const newBook = await db('books').where({ id: bookId }).first(); // Get the full book record

        return newBook; // Return the complete book object
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
}

// Function to update a book
async function updateBook(id, title, author) {
    try {
        const [updatedBook] = await db('books')
            .where('id', id)
            .update({ title, author })
            .returning('*'); // Returns the updated book
        return updatedBook; // Returns null if no book was updated
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
}

// Function to delete a book
async function deleteBook(id) {
    try {
        const deletedBook = await db('books')
            .where('id', id)
            .del() // Deletes the book
            .returning('*'); // Returns the deleted book (if your database supports this)
        return deletedBook; // Return null if no book was deleted
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}

// Function to get all books
async function getAllBooks() {
    try {
        const books = await db('books'); // Automatically uses 'select * from books'
        return books;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

// Function to get a book by its ID
async function getBookById(id) {
    const book = await db('books').where({ id }).first(); // Fetch the book with the given ID
    return book; // Return the book object or undefined if not found
}


// Export the functions
module.exports = {
    addBook,
    updateBook,
    deleteBook,
    getAllBooks,
    getBookById,
};
