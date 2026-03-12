import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const registerUser = (data) => authApi.post('/auth/register', data);
export const loginUser = (data) => authApi.post('/auth/login', data);
export const getMe = (token) =>
  authApi.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
