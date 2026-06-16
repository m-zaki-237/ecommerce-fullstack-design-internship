import api from "./client";

export const orderAPI = {
  createOrder: (data) => api.post("/orders", data),
  getMyOrders: (params) => api.get("/orders/myorders", { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  payOrder: (id, data) => api.put(`/orders/${id}/pay`, data),
  getAllOrders: (params) => api.get("/orders", { params }),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};
