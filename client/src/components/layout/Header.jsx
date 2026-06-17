import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCartStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/listing?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-gray-50 border-b border-gray-100 text-xs text-gray-500">
        <nav className="flex gap-4">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/listing" className="hover:text-blue-600 transition-colors">All Products</Link>
          <Link to="/listing?category=Electronics" className="hover:text-blue-600 transition-colors">Electronics</Link>
          <Link to="/listing?category=Clothing" className="hover:text-blue-600 transition-colors">Clothing</Link>
          <Link to="/listing?category=Cameras" className="hover:text-blue-600 transition-colors">Cameras</Link>
          <Link to="/listing?category=Computers" className="hover:text-blue-600 transition-colors">Computers</Link>
        </nav>
        <div className="flex gap-4 items-center">
          <span>🌐 English, USD</span>
          <span>Ship to 🇵🇰</span>
        </div>
      </div>

      {/* Main header */}
      <div className="flex items-center gap-3 px-4 md:px-6 py-3">
        <button className="md:hidden text-gray-600 text-xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">🛍</div>
          <span className="font-bold text-blue-600 text-lg hidden sm:block">Brand</span>
        </Link>

        <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl mx-auto">
          <select
            className="border border-r-0 border-gray-300 rounded-l-md px-2 py-2 text-sm text-gray-600 bg-white hidden md:block focus:outline-none"
            onChange={(e) => { if (e.target.value) navigate(`/listing?category=${e.target.value}`); }}
          >
            <option value="">All category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Cameras">Cameras</option>
            <option value="Computers">Computers</option>
            <option value="Home & Outdoor">Home & Outdoor</option>
            <option value="Sports">Sports</option>
            <option value="Accessories">Accessories</option>
          </select>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
          <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-r-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Search
          </button>
        </form>

        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs text-gray-600 font-medium">Hi, {user.name?.split(" ")[0]}</span>
              {user.role === "admin" && (
                <Link to="/admin" className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-medium hover:bg-purple-200 transition-colors">
                  Admin Panel
                </Link>
              )}
              <Link to="/cart" className="text-xs text-gray-500 hover:text-blue-600">Orders</Link>
              <button onClick={handleLogout} className="text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link to="/login" className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">Login</Link>
              <Link to="/register" className="btn-primary text-xs px-3 py-1.5">Register</Link>
            </div>
          )}

          <Link to="/cart" className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors text-xs gap-0.5 relative">
            <span className="text-lg leading-none">🛒</span>
            <span className="hidden md:block">My cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
          {user ? (
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                {user.name?.[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <button onClick={handleLogout} className="text-xs text-red-500 border border-red-200 px-2 py-1 rounded-lg">Logout</button>
            </div>
          ) : (
            <div className="flex gap-2 mb-4">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 border border-gray-200 text-gray-600 text-sm py-2 rounded-lg text-center">Login</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 btn-primary text-sm py-2 text-center">Register</Link>
            </div>
          )}
          <nav className="space-y-1">
            {[
              { icon: "🏠", label: "Home", to: "/" },
              { icon: "🛍", label: "All Products", to: "/listing" },
              { icon: "📱", label: "Electronics", to: "/listing?category=Electronics" },
              { icon: "👗", label: "Clothing", to: "/listing?category=Clothing" },
              { icon: "🛒", label: "Cart", to: "/cart" },
            ].map(({ icon, label, to }) => (
              <Link key={label} to={to} onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2.5 border-b border-gray-100 text-gray-700 hover:text-blue-600">
                <span>{icon}</span> {label}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2.5 text-purple-600 font-medium">
                ⚙️ Admin Panel
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;