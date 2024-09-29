import { body } from 'express-validator';

export const validateBook = [
  body('title').isString().isLength({ min: 1 }).withMessage('Title is required'),
  body('author').isString().isLength({ min: 1 }).withMessage('Author is required'),
  body('publicationDate').isISO8601().withMessage('Invalid publication date'),
  body('genre').isString().withMessage('Genre is required'),
];
