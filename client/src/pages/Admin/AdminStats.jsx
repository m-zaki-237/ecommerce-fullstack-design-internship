import { useEffect, useState } from "react";
import api from "../../api/client";

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/stats")
      .then(({ data }) => setStats(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Total Users", value: stats?.totalUsers, icon: "👥", color: "bg-blue-50 text-blue-600" },
    { label: "Total Products", value: stats?.totalProducts, icon: "📦", color: "bg-green-50 text-green-600" },
    { label: "Total Orders", value: stats?.totalOrders, icon: "🛒", color: "bg-orange-50 text-orange-600" },
    { label: "Total Revenue", value: stats ? `$${stats.revenue.toFixed(2)}` : null, icon: "💰", color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div>
      <h2 className="section-title">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon, color }) => (
          <div key={label} className="card p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${color}`}>
              {icon}
            </div>
            {loading ? (
              <div className="h-7 bg-gray-200 rounded animate-pulse w-1/2 mb-1" />
            ) : (
              <p className="text-2xl font-bold text-gray-800">{value ?? 0}</p>
            )}
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStats;