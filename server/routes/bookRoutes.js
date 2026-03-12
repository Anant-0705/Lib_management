const express = require('express');
const router = express.Router();
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
} = require('../controllers/bookController');

// Search route must come BEFORE /:id to avoid conflict
router.get('/search', searchBooks);

router.post('/', addBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
