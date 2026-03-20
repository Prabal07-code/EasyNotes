import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const getNotes = (q = '', tag = '') =>
  API.get('/notes', { params: { q, tag } });

export const getNote = (id) => API.get(`/notes/${id}`);

export const createNote = (data) => API.post('/notes', data);

export const updateNote = (id, data) => API.put(`/notes/${id}`, data);

export const deleteNote = (id) => API.delete(`/notes/${id}`);
