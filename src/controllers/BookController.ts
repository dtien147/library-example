import { Request, Response } from 'express';
import { BookService } from '../services/BookService';

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    public getBooks = (req: Request, res: Response): void => {
        res.json(this.bookService.getAllBooks());
    };

    public addBook = (req: Request, res: Response): void => {
        const { title, author, year } = req.body;
        const newBook = this.bookService.addBook(title, author, year);
        res.status(201).json(newBook);
    };

    public deleteBook = (req: Request, res: Response): void => {
        const { id } = req.params;
        this.bookService.deleteBook(parseInt(id));
        res.status(204).send();
    };
}
