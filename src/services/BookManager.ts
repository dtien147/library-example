import db from '../db/knex';
import { Book } from '../models/Book';
import logger from '../utils/Logger';

class BookManager {
  // Get all books from the database
  public async getBooks(): Promise<Book[]> {
    logger.logInfo('Fetching all books from the database');
    const books = await db<Book>('books').select('*');
    return books;
  }

  // Get a single book by ID
  public async getBookById(id: number): Promise<Book | undefined> {
    logger.logInfo(`Fetching book with ID: ${id}`);
    const book = await db<Book>('books').where({ id }).first();
    return book;
  }

  // Add a new book
  public async addBook(title: string, author: string): Promise<Book> {
    const [id] = await db<Book>('books').insert({ title, author });
    const newBook = { id, title, author };
    logger.logInfo(`Added new book: ${title} by ${author}`);
    return newBook;
  }

  // Update a book
  public async updateBook(id: number, title: string, author: string): Promise<Book | undefined> {
    const updatedRows = await db<Book>('books')
      .where({ id })
      .update({ title, author });

    if (updatedRows) {
      logger.logInfo(`Updated book with ID: ${id}`);
      return { id, title, author };
    } else {
      logger.logError(`Failed to update book with ID: ${id}`);
      return undefined;
    }
  }

  // Delete a book
  public async deleteBook(id: number): Promise<boolean> {
    const deletedRows = await db<Book>('books')
      .where({ id })
      .delete();

    if (deletedRows) {
      logger.logInfo(`Deleted book with ID: ${id}`);
      return true;
    } else {
      logger.logError(`Failed to delete book with ID: ${id}`);
      return false;
    }
  }
}

export default new BookManager();
