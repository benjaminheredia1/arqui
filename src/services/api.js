import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

// Servicios de dashboard
export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
  getIncidents: async () => {
    const response = await api.get('/dashboard/incidents');
    return response.data;
  },
};

// Servicios de rutas
export const rutasService = {
  getAll: async () => {
    const response = await api.get('/rutas');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/rutas/${id}`);
    return response.data;
  },
  create: async (rutaData) => {
    const response = await api.post('/rutas', rutaData);
    return response.data;
  },
  update: async (id, rutaData) => {
    const response = await api.put(`/rutas/${id}`, rutaData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/rutas/${id}`);
    return response.data;
  },
};

// Servicios de reportes
export const reportesService = {
  getReportes: async (filters = {}) => {
    const response = await api.get('/reportes', { params: filters });
    return response.data;
  },
  getReportesAdministrativos: async (filters = {}) => {
    const response = await api.get('/reportes/administrativos', { params: filters });
    return response.data;
  },
  exportReport: async (type, filters = {}) => {
    const response = await api.get(`/reportes/export/${type}`, {
      params: filters,
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;

