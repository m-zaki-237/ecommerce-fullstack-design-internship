import { useEffect, useState } from "react";
import { productAPI } from "../../api/productAPI";
import ProductFormModal from "./ProductFormModal";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [msg, setMsg] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getProducts({ limit: 100 });
      setProducts(data.data);
    } catch (err) {
      setMsg("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleEdit = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await productAPI.deleteProduct(id);
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Failed to delete");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const handleSave = async (formData, id) => {
    try {
      if (id) {
        await productAPI.updateProduct(id, formData);
        toast.success("Product updated");
      } else {
        await productAPI.createProduct(formData);
        toast.success("Product created");
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error((err.response?.data?.message || "Failed to save"));
    }
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0">Products ({products.length})</h2>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
          + Add Product
        </button>
      </div>

      {msg && (
        <div className={`text-sm px-4 py-2.5 rounded-lg mb-4 ${msg.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {msg}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card p-4 flex gap-4 animate-pulse">
              <div className="w-14 h-14 bg-gray-200 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Category</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Price</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Stock</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Featured</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr key={product._id} className={`border-b border-gray-100 hover:bg-gray-50 ${i === products.length - 1 ? "border-0" : ""}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.images?.[0]} alt={product.name} className="w-12 h-12 object-cover rounded-lg shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-400">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{product.category}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${product.countInStock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {product.countInStock > 0 ? `${product.countInStock} in stock` : "Out of stock"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${product.isFeatured ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                        {product.isFeatured ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(product)} className="text-xs border border-blue-200 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <ProductFormModal
          product={editProduct}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminProducts;