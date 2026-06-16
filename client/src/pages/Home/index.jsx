import { useEffect } from "react";
import { Link } from "react-router-dom";
import useProductStore from "../../store/productStore";
import HeroBanner from "./HeroBanner";
import DealsSection from "./DealsSection";
import QuoteBanner from "./QuoteBanner";
import ExtraServices from "./ExtraServices";
import SuppliersByRegion from "./SuppliersByRegion";
import { HOME_OUTDOOR, ELECTRONICS } from "../../data/products";
import CategorySection from "./CategorySection";

const HomePage = () => {
  const { featuredProducts, fetchFeatured } = useProductStore();

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

  return (
    <div>
      <HeroBanner />
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6 py-6">
        <DealsSection products={featuredProducts} />
        <CategorySection
          title="Home and outdoor"
          bgImage="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=400&fit=crop"
          items={HOME_OUTDOOR}
        />
        <CategorySection
          title="Consumer electronics and gadgets"
          bgImage="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=400&fit=crop"
          items={ELECTRONICS}
        />
        <QuoteBanner />

        {/* Recommended items from API */}
        <section>
          <h2 className="section-title">Recommended items</h2>
          {featuredProducts.length === 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="card p-3 animate-pulse">
                  <div className="w-full aspect-square bg-gray-200 rounded-lg mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="card p-3 hover:shadow-md hover:border-blue-200 transition-all group"
                >
                  <div className="relative mb-3">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    {product.discount > 0 && (
                      <span className="absolute top-2 left-2 badge-discount">-{product.discount}%</span>
                    )}
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">${product.price.toFixed(2)}</p>
                  {product.originalPrice && (
                    <p className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-0.5 leading-tight line-clamp-2">{product.name}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <ExtraServices />
        <SuppliersByRegion />
      </div>
    </div>
  );
};

export default HomePage;
