/**
 * API Configuration
 * Base URL and common API functions
 */

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

// Resume APIs
export const resumeAPI = {
  createOrUpdate: (data) => api.post('/resume', data),
  getAll: () => api.get('/resume'),
  getOne: (resumeId) => api.get(`/resume/${resumeId}`),
  delete: (resumeId) => api.delete(`/resume/${resumeId}`),
  downloadPDF: (resumeId) => api.get(`/resume/${resumeId}/pdf`, { responseType: 'blob' }),
};

export default api;
