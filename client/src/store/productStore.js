import { create } from "zustand";
import { productAPI } from "../api/productAPI";

const useProductStore = create((set) => ({
  products: [],
  product: null,
  featuredProducts: [],
  loading: false,
  error: null,
  pagination: { total: 0, page: 1, pages: 1, limit: 12 },

  fetchProducts: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const { data } = await productAPI.getProducts(params);
      set({ products: data.data, pagination: data.pagination, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to load products", loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true, error: null, product: null });
    try {
      const { data } = await productAPI.getProduct(id);
      set({ product: data.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Product not found", loading: false });
    }
  },

  fetchFeatured: async () => {
    try {
      const { data } = await productAPI.getFeatured();
      set({ featuredProducts: data.data });
    } catch {}
  },

  clearProduct: () => set({ product: null }),
  clearError: () => set({ error: null }),
}));

export default useProductStore;
