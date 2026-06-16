import { create } from "zustand";
import { authAPI } from "../api/authAPI";

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await authAPI.register({ name, email, password });
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      set({ user: data.data, token: data.data.token, loading: false });
      return data.data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Registration failed", loading: false });
      throw err;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await authAPI.login({ email, password });
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      set({ user: data.data, token: data.data.token, loading: false });
      return data.data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Login failed", loading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },

  getMe: async () => {
    try {
      const { data } = await authAPI.getMe();
      set({ user: data.data });
      return data.data;
    } catch {
      get().logout();
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
