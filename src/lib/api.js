const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

async function request(endpoint, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur serveur');
  }
  return response.json();
}

export const api = {
  // Auth
  register: (data) => request('/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/login', { method: 'POST', body: JSON.stringify(data) }),
  
  // Produits
  getProducts: () => request('/products'),
  addProduct: (product) => request('/products', { method: 'POST', body: JSON.stringify(product) }),
  updateProduct: (id, product) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(product) }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE' }),
  
  // Admin
  getUsers: () => request('/users'),
  getStats: () => request('/stats'),   // <--- AJOUTER CETTE LIGNE
};