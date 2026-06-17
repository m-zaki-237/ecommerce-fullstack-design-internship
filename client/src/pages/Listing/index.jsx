import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useProductStore from "../../store/productStore";
import useFilters from "../../hooks/useFilters";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Pagination from "../../components/ui/Pagination";
import FilterSidebar from "./FilterSidebar";
import StarRating from "../../components/ui/StarRating";

const BREADCRUMB = ["Home", "Products", "All Products"];

const ProductCard = ({ product, viewMode }) => (
  <Link
    to={`/product/${product._id}`}
    className={`card hover:shadow-md hover:border-blue-200 transition-all block group ${
      viewMode === "list" ? "flex gap-4 p-4" : "overflow-hidden"
    }`}
  >
    <div className={viewMode === "list" ? "w-36 h-36 shrink-0 relative" : "relative"}>
      <img
        src={product.images?.[0]}
        alt={product.name}
        className={`object-cover rounded-lg ${viewMode === "list" ? "w-full h-full" : "w-full aspect-square"}`}
      />
      {product.discount > 0 && (
        <span className="absolute top-2 left-2 badge-discount">-{product.discount}%</span>
      )}
    </div>
    <div className={viewMode === "list" ? "flex-1 min-w-0" : "p-3"}>
      {viewMode === "list" && (
        <h3 className="font-semibold text-gray-800 text-base mb-2">{product.name}</h3>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`font-bold text-red-500 ${viewMode === "list" ? "text-lg" : "text-base"}`}>
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <span className="text-gray-400 text-xs line-through">${product.originalPrice.toFixed(2)}</span>
        )}
      </div>
      <div className="my-1">
        <StarRating score={product.rating * 2} />
      </div>
      <div className="flex gap-2 text-xs text-gray-500 flex-wrap">
        <span>{product.numReviews} reviews</span>
        <span className="text-green-500 font-medium">{product.shipping}</span>
      </div>
      {viewMode === "list" && (
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
      )}
      {viewMode !== "list" && (
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{product.name}</p>
      )}
    </div>
  </Link>
);

const ListingPage = () => {
  const [searchParams] = useSearchParams();
  const { products, loading, pagination, fetchProducts } = useProductStore();
  const {
    selectedBrands, selectedFeatures, condition, setCondition,
    priceMin, setPriceMin, priceMax, setPriceMax,
    verifiedOnly, setVerifiedOnly, sortBy, setSortBy,
    viewMode, setViewMode, page, setPage,
    toggleBrand, toggleFeature, clearFilters, activeFilters, removeFilter,
  } = useFilters();

  const urlCategory = searchParams.get("category");
  const urlSearch = searchParams.get("search");

  useEffect(() => {
    const params = { page, sort: sortBy };
    if (priceMin) params.minPrice = priceMin;
    if (priceMax) params.maxPrice = priceMax;
    if (selectedBrands.length > 0) params.brand = selectedBrands.join(",");
    if (urlCategory) params.category = urlCategory;
    if (urlSearch) params.search = urlSearch;

    fetchProducts(params);
  }, [page, sortBy, priceMin, priceMax, selectedBrands, urlCategory, urlSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
      <Breadcrumb items={urlCategory ? ["Home", "Products", urlCategory] : BREADCRUMB} />
      <div className="flex gap-6">
        <FilterSidebar
          selectedBrands={selectedBrands} toggleBrand={toggleBrand}
          selectedFeatures={selectedFeatures} toggleFeature={toggleFeature}
          condition={condition} setCondition={setCondition}
          priceMin={priceMin} setPriceMin={setPriceMin}
          priceMax={priceMax} setPriceMax={setPriceMax}
          clearFilters={clearFilters}
        />
        <div className="flex-1 min-w-0">
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600">
                  {tag}
                  <button onClick={() => removeFilter(tag)} className="text-gray-400 hover:text-red-500 font-bold">×</button>
                </span>
              ))}
              <button onClick={clearFilters} className="text-xs text-blue-500 hover:underline">Clear all</button>
            </div>
          )}

          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">{pagination.total}</span> products found
              {urlSearch && <span> for "<span className="font-medium">{urlSearch}</span>"</span>}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={verifiedOnly} onChange={() => setVerifiedOnly(!verifiedOnly)} className="rounded accent-blue-600" />
                Verified only
              </label>
              <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none bg-white">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                {["grid", "list"].map((mode) => (
                  <button key={mode} onClick={() => setViewMode(mode)}
                    className={`px-2.5 py-1.5 text-sm transition-colors ${viewMode === mode ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
                    {mode === "grid" ? "⊞" : "☰"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-3"}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-3 animate-pulse">
                  <div className="w-full aspect-square bg-gray-200 rounded-lg mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium text-gray-600">No products found</p>
              {activeFilters.length > 0 && (
                <button onClick={clearFilters} className="link-blue mt-2">Clear filters and try again</button>
              )}
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-3"}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}

          <Pagination currentPage={pagination.page} totalPages={pagination.pages || 1} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default ListingPage;