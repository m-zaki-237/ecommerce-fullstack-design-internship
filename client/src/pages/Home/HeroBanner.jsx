import { Link } from "react-router-dom";
import { NAV_CATEGORIES } from "../../data/products";

const HeroBanner = () => (
  <div className="flex">
    {/* Sidebar */}
    <aside className="hidden md:block w-48 shrink-0 bg-white border-r border-gray-200">
      <ul className="py-2">
        {NAV_CATEGORIES.map((cat, i) => (
          <li key={cat}>
            <button
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-blue-50 hover:text-blue-600 ${
                i === 0 ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-600"
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>

    {/* Hero image */}
    <div
      className="flex-1 relative overflow-hidden min-h-[220px] md:min-h-[260px] flex items-center"
      style={{
        background: "linear-gradient(135deg, #e0f7f4 0%, #e8f4fd 60%, #dbeafe 100%)",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop"
        alt="Hero Electronics"
        className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-70"
      />
      <div className="relative z-10 px-8 py-8">
        <p className="text-gray-500 text-sm font-medium mb-1">Latest trending</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Electronic items</h1>
        <Link
          to="/listing"
          className="inline-block border border-gray-400 text-gray-700 px-5 py-2 rounded text-sm font-medium bg-white/80 hover:bg-white hover:border-gray-600 transition-colors"
        >
          Learn more
        </Link>
      </div>
    </div>

    {/* Auth + promo sidebar */}
    <div className="hidden md:flex flex-col w-44 border-l border-gray-200 bg-white shrink-0">
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            👤
          </div>
          <div>
            <p className="text-xs text-gray-400">Hi, user</p>
            <p className="text-xs font-semibold text-gray-700">let's get started</p>
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white rounded py-1.5 text-xs font-semibold hover:bg-blue-700 transition-colors mb-1.5">
          Join now
        </button>
        <button className="w-full border border-gray-300 text-gray-600 rounded py-1.5 text-xs font-medium hover:bg-gray-50 transition-colors">
          Log in
        </button>
      </div>
      <div className="p-3 bg-orange-500 text-white">
        <p className="font-semibold text-sm mb-0.5">Get US $10 off</p>
        <p className="text-xs opacity-80">with a new supplier</p>
      </div>
      <div className="p-3 bg-blue-500 text-white mt-auto">
        <p className="font-semibold text-xs leading-snug">
          Send quotes with supplier preferences
        </p>
      </div>
    </div>
  </div>
);

export default HeroBanner;
