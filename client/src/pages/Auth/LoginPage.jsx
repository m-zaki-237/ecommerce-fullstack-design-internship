import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuthStore();
  const { fetchCart } = useCartStore();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    clearError();
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      await fetchCart();
      toast.success("Logged In")
      navigate("/");
    } catch {}
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-3">🛍</div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="••••••••" className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base disabled:opacity-50">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
