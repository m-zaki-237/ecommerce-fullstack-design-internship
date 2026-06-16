const BRANDS = ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"];
const FEATURES = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"];
const RATINGS = [5, 4, 3, 2];

const FilterSidebar = ({
  selectedBrands, toggleBrand,
  selectedFeatures, toggleFeature,
  condition, setCondition,
  priceMin, setPriceMin,
  priceMax, setPriceMax,
  clearFilters,
}) => (
  <aside className="hidden md:block w-52 shrink-0">
    <div className="card p-4 space-y-5 sticky top-24">
      {/* Category */}
      <div>
        <h3 className="font-semibold text-gray-800 text-sm mb-2 flex justify-between items-center">
          Category <span className="text-gray-400 font-normal text-xs">▾</span>
        </h3>
        <ul className="space-y-1.5">
          {["Mobile accessory", "Electronics", "Smartphones", "Modern tech"].map((cat) => (
            <li key={cat}>
              <button
                className={`text-sm transition-colors ${
                  cat === "Mobile accessory"
                    ? "text-blue-600 font-medium"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
          <li><button className="link-blue text-xs">See all</button></li>
        </ul>
      </div>

      <div className="border-t border-gray-100" />

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-gray-800 text-sm mb-2 flex justify-between items-center">
          Brands <span className="text-gray-400 font-normal text-xs">▾</span>
        </h3>
        <ul className="space-y-2">
          {BRANDS.map((brand) => (
            <li key={brand} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded accent-blue-600"
              />
              <label htmlFor={`brand-${brand}`} className="text-sm text-gray-600 cursor-pointer">
                {brand}
              </label>
            </li>
          ))}
          <li><button className="link-blue text-xs">See all</button></li>
        </ul>
      </div>

      <div className="border-t border-gray-100" />

      {/* Features */}
      <div>
        <h3 className="font-semibold text-gray-800 text-sm mb-2 flex justify-between items-center">
          Features <span className="text-gray-400 font-normal text-xs">▾</span>
        </h3>
        <ul className="space-y-2">
          {FEATURES.map((feat) => (
            <li key={feat} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`feat-${feat}`}
                checked={selectedFeatures.includes(feat)}
                onChange={() => toggleFeature(feat)}
                className="rounded accent-blue-600"
              />
              <label htmlFor={`feat-${feat}`} className="text-sm text-gray-600 cursor-pointer">
                {feat}
              </label>
            </li>
          ))}
          <li><button className="link-blue text-xs">See all</button></li>
        </ul>
      </div>

      <div className="border-t border-gray-100" />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-800 text-sm mb-3 flex justify-between items-center">
          Price range <span className="text-gray-400 font-normal text-xs">▾</span>
        </h3>
        <div className="flex gap-2 mb-2">
          <input
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            placeholder="Min"
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-blue-400"
          />
          <input
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            placeholder="Max"
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-blue-400"
          />
        </div>
        <button className="w-full border border-blue-500 text-blue-500 rounded py-1 text-xs hover:bg-blue-50 transition-colors">
          Apply
        </button>
      </div>

      <div className="border-t border-gray-100" />

      {/* Condition */}
      <div>
        <h3 className="font-semibold text-gray-800 text-sm mb-2 flex justify-between items-center">
          Condition <span className="text-gray-400 font-normal text-xs">▾</span>
        </h3>
        {["Any", "Refurbished", "Brand new", "Old items"].map((c) => (
          <label key={c} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="radio"
              name="condition"
              checked={condition === c.toLowerCase()}
              onChange={() => setCondition(c.toLowerCase())}
              className="accent-blue-600"
            />
            <span className="text-sm text-gray-600">{c}</span>
          </label>
        ))}
      </div>

      <div className="border-t border-gray-100" />

      {/* Ratings */}
      <div>
        <h3 className="font-semibold text-gray-800 text-sm mb-2 flex justify-between items-center">
          Ratings <span className="text-gray-400 font-normal text-xs">▾</span>
        </h3>
        {RATINGS.map((r) => (
          <label key={r} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="checkbox" className="rounded accent-blue-600" />
            <span className="text-yellow-400 text-sm">
              {"★".repeat(r)}{"☆".repeat(5 - r)}
            </span>
          </label>
        ))}
      </div>

      {(selectedBrands.length > 0 || selectedFeatures.length > 0) && (
        <button
          onClick={clearFilters}
          className="w-full text-xs text-red-500 border border-red-200 rounded py-1.5 hover:bg-red-50 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  </aside>
);

export default FilterSidebar;
