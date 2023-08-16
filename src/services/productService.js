import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const productService = {
  getAllProducts: async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  },
  
  createProduct: async (product) => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  },
  
  deleteProduct: async (productId) => {
    const response = await axios.delete(`${API_URL}/products/${productId}`);
    return response.data;
  },

  getProductById: async (productId) => {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  },

  updateProduct: async (productId, updatedProduct) => {
    const response = await axios.put(`${API_URL}/products/${productId}`, updatedProduct);
    return response.data;
  },
};
