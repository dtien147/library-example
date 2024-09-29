import express, { Application, Request, Response } from 'express';
import BookManager from './services/BookManager';
import { validateBook } from './validatiors/bookValidator';

class Server {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    // Middleware
    this.app.use(express.json());

    // Routes
    this.routes();
  }

  private routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Welcome to the Library!');
    });

    // Fetch all books
    this.app.get('/books', async (req: Request, res: Response) => {
      const books = await BookManager.getBooks();
      res.json(books);
    });

    // Get a specific book by ID
    this.app.get('/books/:id', async (req: Request, res: Response) => {
      const book = await BookManager.getBookById(parseInt(req.params.id));
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    });

    // Add a new book
    this.app.post('/books', async (req: Request, res: Response) => {
      const { title, author } = req.body;
      try {
        if (!title || typeof title !== 'string' || title.trim().length === 0) {
          throw new Error('Title is required and must be a non-empty string');
        }
      
        // Validate author
        if (!author || typeof author !== 'string' || author.trim().length === 0) {
          throw new Error('Author is required and must be a non-empty string');
        }

        const newBook = await BookManager.addBook(title, author);
        res.status(201).json(newBook);
      } catch (e: any) {
        res.status(400).json({
          message: e.message
        });
      }
    });

    // Update an existing book
    this.app.put('/books/:id', async (req: Request, res: Response) => {
      const { title, author } = req.body;
      const updatedBook = await BookManager.updateBook(parseInt(req.params.id), title, author);

      if (updatedBook) {
        res.json(updatedBook);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    });

    // Delete a book
    this.app.delete('/books/:id', async (req: Request, res: Response) => {
      const success = await BookManager.deleteBook(parseInt(req.params.id));

      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    });
  }

  public start(): void {
    this.app.listen(this.port, '0.0.0.0', () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default Server;
