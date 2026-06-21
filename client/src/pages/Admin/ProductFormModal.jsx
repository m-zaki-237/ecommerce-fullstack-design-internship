import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Outdoor",
  "Sports",
  "Cameras",
  "Computers",
  "Accessories",
  "Other",
];

const EMPTY_FORM = {
  name: "",
  description: "",
  category: "Electronics",
  brand: "",
  price: "",
  originalPrice: "",
  countInStock: "",
  discount: "",
  shipping: "Free Shipping",
  isFeatured: false,
  images: "",
  features: "",
  supplierName: "",
  supplierCountry: "",
  supplierFlag: "",
  supplierVerified: false,
};

const ProductFormModal = ({ product, onSave, onClose }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "Electronics",
        brand: product.brand || "",
        price: product.price || "",
        originalPrice: product.originalPrice || "",
        countInStock: product.countInStock || "",
        discount: product.discount || "",
        shipping: product.shipping || "Free Shipping",
        isFeatured: product.isFeatured || false,
        images: product.images?.join(", ") || "",
        features: product.features?.join(", ") || "",
        supplierName: product.supplier?.name || "",
        supplierCountry: product.supplier?.country || "",
        supplierFlag: product.supplier?.flag || "",
        supplierVerified: product.supplier?.verified || false,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name,
      description: form.description,
      category: form.category,
      brand: form.brand,
      price: Number(form.price),
      originalPrice: form.originalPrice
        ? Number(form.originalPrice)
        : undefined,
      countInStock: Number(form.countInStock),
      discount: Number(form.discount) || 0,
      shipping: form.shipping,
      isFeatured: form.isFeatured,
      images: form.images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      features: form.features
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      supplier: {
        name: form.supplierName,
        country: form.supplierCountry,
        flag: form.supplierFlag,
        verified: form.supplierVerified,
      },
    };

    try {
      await onSave(payload, product?._id);

      toast.success(product ? "Product updated" : "Product created");

      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };


return (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
        <h2 className="font-bold text-gray-800 text-lg">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Basic info */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Basic Info
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g. Sony WH-1000XM5 Headphones"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="input-field resize-none"
              placeholder="Describe the product..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input-field"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. Sony"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-4 border-t border-gray-100 pt-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Pricing & Stock
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($) *
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Price ($)
              </label>
              <input
                name="originalPrice"
                type="number"
                step="0.01"
                min="0"
                value={form.originalPrice}
                onChange={handleChange}
                className="input-field"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock *
              </label>
              <input
                name="countInStock"
                type="number"
                min="0"
                value={form.countInStock}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                name="discount"
                type="number"
                min="0"
                max="100"
                value={form.discount}
                onChange={handleChange}
                className="input-field"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping
              </label>
              <input
                name="shipping"
                value={form.shipping}
                onChange={handleChange}
                className="input-field"
                placeholder="Free Shipping"
              />
            </div>
            <div className="flex items-center gap-3 mt-6">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600"
              />
              <label
                htmlFor="isFeatured"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Featured product
              </label>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4 border-t border-gray-100 pt-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Images & Features
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URLs
            </label>
            <textarea
              name="images"
              value={form.images}
              onChange={handleChange}
              rows={2}
              className="input-field resize-none"
              placeholder="https://image1.jpg, https://image2.jpg"
            />
            <p className="text-xs text-gray-400 mt-1">
              Separate multiple URLs with commas
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features
            </label>
            <textarea
              name="features"
              value={form.features}
              onChange={handleChange}
              rows={2}
              className="input-field resize-none"
              placeholder="4K video, Waterproof, Voice control"
            />
            <p className="text-xs text-gray-400 mt-1">
              Separate features with commas
            </p>
          </div>
        </div>

        {/* Supplier */}
        <div className="space-y-4 border-t border-gray-100 pt-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Supplier Info
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier Name
              </label>
              <input
                name="supplierName"
                value={form.supplierName}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. Sony Official"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                name="supplierCountry"
                value={form.supplierCountry}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. Japan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flag Emoji
              </label>
              <input
                name="supplierFlag"
                value={form.supplierFlag}
                onChange={handleChange}
                className="input-field"
                placeholder="🇯🇵"
              />
            </div>
            <div className="flex items-center gap-3 mt-6">
              <input
                type="checkbox"
                id="supplierVerified"
                name="supplierVerified"
                checked={form.supplierVerified}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600"
              />
              <label
                htmlFor="supplierVerified"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Verified supplier
              </label>
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 btn-primary py-2.5 text-sm disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : product
                ? "Update Product"
                : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};
export default ProductFormModal;
