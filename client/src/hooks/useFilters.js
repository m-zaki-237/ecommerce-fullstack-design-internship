import { useState } from "react";

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

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setPage(1);
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedFeatures([]);
    setPriceMin("");
    setPriceMax("");
    setCondition("any");
    setPage(1);
  };

  const activeFilters = [...selectedBrands, ...selectedFeatures];

  const removeFilter = (tag) => {
    setSelectedBrands((prev) => prev.filter((b) => b !== tag));
    setSelectedFeatures((prev) => prev.filter((f) => f !== tag));
    setPage(1);
  };

  return {
    selectedBrands, selectedFeatures, condition, setCondition,
    priceMin, setPriceMin, priceMax, setPriceMax,
    verifiedOnly, setVerifiedOnly,
    sortBy, setSortBy, viewMode, setViewMode,
    page, setPage,
    toggleBrand, toggleFeature, clearFilters,
    activeFilters, removeFilter,
  };
};

export default useFilters;