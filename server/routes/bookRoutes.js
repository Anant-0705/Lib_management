const express = require('express');
const router = express.Router();
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
  borrowBook,
  returnBook,
} = require('../controllers/bookController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes
router.get('/search', searchBooks);
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// Member routes (must be logged in)
router.put('/:id/borrow', protect, borrowBook);
router.put('/:id/return', protect, returnBook);

// Admin-only routes
router.post('/', protect, adminOnly, addBook);
router.put('/:id', protect, adminOnly, updateBook);
router.delete('/:id', protect, adminOnly, deleteBook);

module.exports = router;
