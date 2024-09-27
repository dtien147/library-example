import { Router } from 'express';
import { BookController } from '../controllers/BookController';

const router = Router();
const bookController = new BookController();

router.get('/', bookController.getBooks);
router.post('/', bookController.addBook);
router.delete('/:id', bookController.deleteBook);

export default router;
