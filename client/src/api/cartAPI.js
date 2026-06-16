import api from "./client";

export const cartAPI = {
  getCart: () => api.get("/cart"),
  addToCart: (data) => api.post("/cart", data),
  updateItem: (itemId, data) => api.put(`/cart/${itemId}`, data),
  removeItem: (itemId) => api.delete(`/cart/${itemId}`),
  clearCart: () => api.delete("/cart"),
  saveForLater: (itemId) => api.put(`/cart/${itemId}/save`),
  moveToCart: (itemId) => api.put(`/cart/saved/${itemId}/move`),
  removeSaved: (itemId) => api.delete(`/cart/saved/${itemId}`),
  applyCoupon: (code) => api.post("/cart/coupon", { code }),
};
