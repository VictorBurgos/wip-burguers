import axios from 'axios';

const API_URL = 'http://localhost:4000/wipApi';

const Product = (incommingProduct) => {
  const product = {};
  if(!!incommingProduct.id) product.id = incommingProduct.id;
  if(!!incommingProduct.name) product.name = incommingProduct.name;
  if(!!incommingProduct.description) product.descriptio = incommingProduct.description;
  if(!!incommingProduct.price) product.price = incommingProduct.price;
  if(!!incommingProduct.image_name) product.image_name = incommingProduct.image_name;
  if(!!incommingProduct.category) product.category = incommingProduct.category;

  return product;
}

export const productService = {
  getAllProducts: async () => {
    const response = await axios.get(`${API_URL}/products`);
    const products = response.data.map(Product);
    return products;
  },
  
  createProduct: async (product) => { // CREATE
    const response = await axios.post(`${API_URL}/products`, product);
    if (response.data.message === "created") return "succeeded";
    return "failed";
  },
  
  getProductById: async (productId) => { // READ
    const response = await axios.get(`${API_URL}/products/${productId}`);
    const product = Product(response.data)
    return product;
  },

  updateProduct: async (productId, updatedProduct) => { // UPDATE
    const response = await axios.put(`${API_URL}/products/${productId}`, updatedProduct);
    if (response.data.message === "updated") return "succeeded";
    return "failed";
  },
  
  deleteProduct: async (productId) => { // DELETE
    const response = await axios.delete(`${API_URL}/products/${productId}`);
    if (response.data.message === "deleted") return "succeeded";
    return "failed";
  },
};
