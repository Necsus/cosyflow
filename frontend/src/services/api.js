import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const newsApi = {
  getAll: (skip = 0, limit = 20) =>
    api.get('/api/news', { params: { skip, limit } }),

  getById: (id) =>
    api.get(`/api/news/${id}`),

  getBySlug: (slug) =>
    api.get(`/api/news/slug/${slug}`),

  getByCategory: (categoryId, skip = 0, limit = 20) =>
    api.get(`/api/news/category/${categoryId}`, { params: { skip, limit } }),

  create: (data) =>
    api.post('/api/news', data),

  update: (id, data) =>
    api.put(`/api/news/${id}`, data),

  delete: (id) =>
    api.delete(`/api/news/${id}`),
}

export const categoryApi = {
  getAll: () =>
    api.get('/api/categories'),

  getById: (id) =>
    api.get(`/api/categories/${id}`),

  getBySlug: (slug) =>
    api.get(`/api/categories/slug/${slug}`),

  create: (data) =>
    api.post('/api/categories', data),

  delete: (id) =>
    api.delete(`/api/categories/${id}`),
}

export default api
