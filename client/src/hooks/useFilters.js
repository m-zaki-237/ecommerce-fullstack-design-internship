import { useState, useMemo } from "react";
import { LISTING_PRODUCTS } from "../data/products";

const useFilters = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [condition, setCondition] = useState("any");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("list");
  const [page, setPage] = useState(1);

  const toggleBrand = (brand) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );

  const toggleFeature = (feature) =>
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedFeatures([]);
  };

  const activeFilters = [...selectedBrands, ...selectedFeatures];

  const removeFilter = (tag) => {
    setSelectedBrands((prev) => prev.filter((b) => b !== tag));
    setSelectedFeatures((prev) => prev.filter((f) => f !== tag));
  };

  const filteredProducts = useMemo(() => {
    let result = [...LISTING_PRODUCTS];
    const min = parseFloat(priceMin);
    const max = parseFloat(priceMax);
    if (!isNaN(min)) result = result.filter((p) => p.price >= min);
    if (!isNaN(max)) result = result.filter((p) => p.price <= max);
    if (sortBy === "price_asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [priceMin, priceMax, sortBy]);

  return {
    selectedBrands, selectedFeatures, condition, setCondition,
    priceMin, setPriceMin, priceMax, setPriceMax,
    verifiedOnly, setVerifiedOnly,
    sortBy, setSortBy, viewMode, setViewMode,
    page, setPage,
    toggleBrand, toggleFeature, clearFilters,
    activeFilters, removeFilter,
    filteredProducts,
  };
};

export default useFilters;
