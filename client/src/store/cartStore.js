import { create } from "zustand";
import { cartAPI } from "../api/cartAPI";

const useCartStore = create((set, get) => ({
  cart: null,
  loading: false,
  error: null,

  get items() { return get().cart?.items || []; },
  get savedItems() { return get().cart?.savedItems || []; },
  get itemCount() { return get().cart?.items?.length || 0; },

  fetchCart: async () => {
    set({ loading: true });
    try {
      const { data } = await cartAPI.getCart();
      set({ cart: data.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  addToCart: async (productId, qty = 1, size = "", color = "") => {
    set({ loading: true });
    try {
      const { data } = await cartAPI.addToCart({ productId, qty, size, color });
      set({ cart: data.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to add item", loading: false });
      throw err;
    }
  },

  updateQty: async (itemId, qty) => {
    try {
      const { data } = await cartAPI.updateItem(itemId, { qty });
      set({ cart: data.data });
    } catch (err) {
      set({ error: err.response?.data?.message || "Update failed" });
    }
  },

  removeItem: async (itemId) => {
    try {
      const { data } = await cartAPI.removeItem(itemId);
      set({ cart: data.data });
    } catch (err) {
      set({ error: err.response?.data?.message || "Remove failed" });
    }
  },

  clearCart: async () => {
    try {
      await cartAPI.clearCart();
      set((state) => ({ cart: state.cart ? { ...state.cart, items: [] } : null }));
    } catch {}
  },

  saveForLater: async (itemId) => {
    try {
      const { data } = await cartAPI.saveForLater(itemId);
      set({ cart: data.data });
    } catch {}
  },

  moveToCart: async (itemId) => {
    try {
      const { data } = await cartAPI.moveToCart(itemId);
      set({ cart: data.data });
    } catch {}
  },

  removeSaved: async (itemId) => {
    try {
      const { data } = await cartAPI.removeSaved(itemId);
      set({ cart: data.data });
    } catch {}
  },

  applyCoupon: async (code) => {
  try {
    const { data } = await cartAPI.applyCoupon(code);

    const updatedCart = data.data?.cart || data.data;

    set({ cart: updatedCart });
    return data.data?.discount || updatedCart?.discount || 0;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Invalid coupon");
  }
},

  clearError: () => set({ error: null }),
}));

export default useCartStore;
