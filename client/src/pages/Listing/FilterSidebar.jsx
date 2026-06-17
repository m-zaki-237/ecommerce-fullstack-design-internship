const BRANDS = ["Apple", "Samsung", "Sony", "Canon", "GoPro", "Razer"];
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
          {["Electronics", "Cameras", "Computers", "Clothing", "Accessories", "Home & Outdoor", "Sports"].map((cat) => (
            <li key={cat}>
              <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                {cat}
              </button>
            </li>
          ))}
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
            type="number"
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-blue-400"
          />
          <input
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            placeholder="Max"
            type="number"
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Condition */}
      <div>
        <h3 className="font-semibold text-gray-800 text-sm mb-2 flex justify-between items-center">
          Condition <span className="text-gray-400 font-normal text-xs">▾</span>
        </h3>
        {["Any", "Brand new"].map((c) => (
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

      {selectedBrands.length > 0 && (
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