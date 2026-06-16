import api from "./client";

export const productAPI = {
  getProducts: (params) => api.get("/products", { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  getFeatured: () => api.get("/products/featured"),
  getByCategory: (category) => api.get(`/products/category/${category}`),
  createProduct: (data) => api.post("/products", data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  createReview: (id, data) => api.post(`/products/${id}/reviews`, data),
};
