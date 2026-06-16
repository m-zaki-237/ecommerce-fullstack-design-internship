import { useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import AdminProducts from "./AdminProducts";
import AdminStats from "./AdminStats";

const AdminLayout = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || user.role !== "admin") navigate("/");
  }, [user]);

  const links = [
    { to: "/admin", label: "📊 Dashboard", exact: true },
    { to: "/admin/products", label: "📦 Products" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <Link to="/" className="text-sm text-blue-500 hover:underline">← Back to site</Link>
      </div>

      {/* Tab nav */}
      <div className="flex gap-2 border-b border-gray-200 mb-6">
        {links.map(({ to, label, exact }) => {
          const active = exact ? location.pathname === to : location.pathname.startsWith(to) && to !== "/admin";
          const isActive = exact
            ? location.pathname === "/admin"
            : location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                isActive && (exact ? location.pathname === "/admin" : true)
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <Routes>
        <Route index element={<AdminStats />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/*" element={<AdminProducts />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;