import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuthStore();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    clearError();
    setFormError("");
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setFormError("Passwords do not match"); return; }
    if (form.password.length < 6) { setFormError("Password must be at least 6 characters"); return; }
    try {
      await register(form.name, form.email, form.password);
      toast.success("User Resgistered")
      navigate("/");
    } catch {}
  };

  const displayError = formError || error;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-3">🛍</div>
          <h1 className="text-2xl font-bold text-gray-800">Create account</h1>
          <p className="text-gray-500 text-sm mt-1">Join us today</p>
        </div>
        {displayError && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">{displayError}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "name", label: "Full Name", type: "text", placeholder: "Zaki Ahmed" },
            { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
            { name: "password", label: "Password", type: "password", placeholder: "Min 6 characters" },
            { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Re-enter password" },
          ].map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input name={name} type={type} value={form[name]} onChange={handleChange} required placeholder={placeholder} className="input-field" />
            </div>
          ))}
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base disabled:opacity-50">
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
