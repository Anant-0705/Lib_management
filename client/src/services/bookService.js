import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach stored token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lib_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const addBook = (bookData) => api.post('/books', bookData);
export const getAllBooks = () => api.get('/books');
export const getBookById = (id) => api.get(`/books/${id}`);
export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData);
export const deleteBook = (id) => api.delete(`/books/${id}`);
export const searchBooks = (params) => api.get('/books/search', { params });
export const borrowBook = (id) => api.put(`/books/${id}/borrow`);
export const returnBook = (id) => api.put(`/books/${id}/return`);

export default api;
