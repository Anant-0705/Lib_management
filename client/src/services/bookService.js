import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add all books
export const addBook = (bookData) => api.post('/books', bookData);

// Get all books
export const getAllBooks = () => api.get('/books');

// Get book by ID
export const getBookById = (id) => api.get(`/books/${id}`);

// Update book
export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData);

// Delete book
export const deleteBook = (id) => api.delete(`/books/${id}`);

// Search books by title or author
export const searchBooks = (params) => api.get('/books/search', { params });

export default api;
