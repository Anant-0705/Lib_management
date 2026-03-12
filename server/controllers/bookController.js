const Book = require('../models/Book');

// @desc    Add a new book
// @route   POST /books
// @access  Public
const addBook = async (req, res, next) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: savedBook,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A book with this ISBN already exists',
      });
    }
    next(err);
  }
};

// @desc    Get all books
// @route   GET /books
// @access  Public
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get book by ID
// @route   GET /books/:id
// @access  Public
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update book by ID
// @route   PUT /books/:id
// @access  Public
const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete book by ID
// @route   DELETE /books/:id
// @access  Public
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Search books by title or author
// @route   GET /books/search?title=xyz  or  ?author=xyz
// @access  Public
const searchBooks = async (req, res, next) => {
  try {
    const { title, author } = req.query;

    if (!title && !author) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a title or author to search',
      });
    }

    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (author) query.author = { $regex: author, $options: 'i' };

    const books = await Book.find(query);
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Borrow a book (member)
// @route   PUT /books/:id/borrow
const borrowBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    if (book.availableCopies <= 0 || book.status === 'Checked Out') {
      return res.status(400).json({ success: false, message: 'No copies available to borrow' });
    }
    if (book.bookType === 'Reference') {
      return res.status(400).json({ success: false, message: 'Reference books cannot be borrowed' });
    }

    book.availableCopies -= 1;
    if (book.availableCopies === 0) book.status = 'Checked Out';
    await book.save();

    res.status(200).json({ success: true, message: 'Book borrowed successfully', data: book });
  } catch (err) {
    next(err);
  }
};

// @desc    Return a book (member)
// @route   PUT /books/:id/return
const returnBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    if (book.availableCopies >= book.totalCopies) {
      return res.status(400).json({ success: false, message: 'All copies are already returned' });
    }

    book.availableCopies += 1;
    if (book.availableCopies > 0) book.status = 'Available';
    await book.save();

    res.status(200).json({ success: true, message: 'Book returned successfully', data: book });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
  borrowBook,
  returnBook,
};
