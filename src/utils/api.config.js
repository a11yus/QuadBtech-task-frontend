// src/utils/api.config.js
import axios from "axios";

const API_URL = axios.create({
  baseURL: "http://localhost:5000/api",
});

API_URL.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
  getProducts: `${API_URL}/products`,
  getProductById: (id) => `${API_URL}/products/${id}`,
  addProduct: `${API_URL}/admin/products`,
  updateProduct: (id) => `${API_URL}/admin/products/${id}`,
  deleteProduct: (id) => `${API_URL}/admin/products/${id}`,
  addToCart: (userId, productId) =>
    `${API_URL}/cart/${userId}/add/${productId}`,
  removeFromCart: (userId, productId) =>
    `${API_URL}/cart/${userId}/remove/${productId}`,
};
