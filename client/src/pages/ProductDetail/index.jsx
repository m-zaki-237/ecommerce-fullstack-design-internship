import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "../../store/productStore";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import Breadcrumb from "../../components/ui/Breadcrumb";
import StarRating from "../../components/ui/StarRating";
import DiscountBanner from "../../components/common/DiscountBanner";

const TABS = ["Description", "Reviews", "Shipping", "About seller"];

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, fetchProduct } = useProductStore();
  const { addToCart, loading: cartLoading } = useCartStore();
  const { user } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");
  const [qty, setQty] = useState(1);
  const [addedMsg, setAddedMsg] = useState("");

  useEffect(() => {
    fetchProduct(id);
    setSelectedImg(0);
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) { navigate("/login"); return; }
    try {
      await addToCart(product._id, qty);
      setAddedMsg("Added to cart!");
      setTimeout(() => setAddedMsg(""), 2000);
    } catch (err) {
      setAddedMsg(err.message || "Failed to add");
    }
  };

  if (loading || !product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 animate-pulse">
          <div className="md:w-80 h-72 bg-gray-200 rounded-xl" />
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-10 bg-gray-200 rounded w-1/3" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => <div key={i} className="h-3 bg-gray-100 rounded" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
      <Breadcrumb items={["Home", "Products", product.category, product.name.slice(0, 30) + "..."]} />

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Images */}
        <div className="md:w-80 shrink-0">
          <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 h-72 border border-gray-100">
            <img src={product.images?.[selectedImg]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {product.images?.map((img, i) => (
              <button key={i} onClick={() => setSelectedImg(i)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${selectedImg === i ? "border-blue-500" : "border-transparent hover:border-gray-300"}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {product.countInStock > 0
              ? <span className="text-green-500 text-sm font-medium">✓ In stock ({product.countInStock} available)</span>
              : <span className="text-red-500 text-sm font-medium">✗ Out of stock</span>}
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-3 leading-snug">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <StarRating score={product.rating * 2} />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-sm">💬 {product.numReviews} reviews</span>
          </div>

          {/* Price tiers */}
          {product.priceTiers?.length > 0 ? (
            <div className="flex gap-2 mb-5 flex-wrap">
              {product.priceTiers.map((tier, i) => (
                <div key={i} className={`rounded-lg px-4 py-2 text-center ${i === 0 ? "bg-red-500 text-white" : i === 1 ? "bg-orange-100 text-orange-700" : "bg-orange-50 text-orange-600"}`}>
                  <p className="font-bold text-lg leading-tight">${tier.price.toFixed(2)}</p>
                  <p className="text-xs opacity-80 mt-0.5">{tier.label || `${tier.minQty}${tier.maxQty ? `-${tier.maxQty}` : "+"} pcs`}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-bold text-red-500">${product.price.toFixed(2)}</span>
              {product.originalPrice && <span className="text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>}
              {product.discount > 0 && <span className="badge-discount">-{product.discount}%</span>}
            </div>
          )}

          {/* Specs */}
          <table className="w-full text-sm mb-5">
            <tbody>
              {product.specs?.map(({ label, value }) => (
                <tr key={label} className="border-b border-gray-100">
                  <td className="py-2 text-gray-400 pr-4 whitespace-nowrap w-1/3">{label}:</td>
                  <td className="py-2 text-gray-700">{value}</td>
                </tr>
              ))}
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-400 pr-4">Shipping:</td>
                <td className="py-2 text-green-600 font-medium">{product.shipping}</td>
              </tr>
            </tbody>
          </table>

          {/* Qty + Add to Cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-gray-50 text-gray-600">−</button>
              <span className="px-4 py-2 text-sm font-medium border-x border-gray-200">{qty}</span>
              <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} className="px-3 py-2 hover:bg-gray-50 text-gray-600">+</button>
            </div>
            <button onClick={handleAddToCart} disabled={cartLoading || product.countInStock === 0}
              className="btn-primary px-8 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed">
              {cartLoading ? "Adding..." : "Add to Cart"}
            </button>
            {addedMsg && <span className={`text-sm font-medium ${addedMsg.includes("Failed") ? "text-red-500" : "text-green-500"}`}>{addedMsg}</span>}
          </div>
        </div>

        {/* Supplier */}
        {product.supplier?.name && (
          <div className="md:w-56 shrink-0">
            <div className="card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                  {product.supplier.name[0]}
                </div>
                <div>
                  <p className="text-xs text-gray-400">Supplier</p>
                  <p className="text-sm font-semibold text-gray-800">{product.supplier.name}</p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-gray-500 mb-4">
                {product.supplier.flag && <p>{product.supplier.flag} {product.supplier.country}</p>}
                {product.supplier.verified && <p className="text-green-600">✓ Verified Seller</p>}
                <p>🌐 Worldwide shipping</p>
              </div>
              <button className="btn-primary w-full py-2.5 text-sm mb-2">Send inquiry</button>
              <button className="link-blue w-full text-center block">Seller's profile</button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="card overflow-hidden mb-8">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === "Description" && (
            <div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.description}</p>
              {product.features?.length > 0 && (
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500 font-bold">✓</span>{f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {activeTab === "Reviews" && (
            <div>
              {product.reviews?.length === 0
                ? <p className="text-gray-400 text-center py-8">No reviews yet. Be the first!</p>
                : product.reviews?.map((r) => (
                  <div key={r._id} className="border-b border-gray-100 pb-4 mb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-800">{r.name}</span>
                      <StarRating score={r.rating * 2} />
                    </div>
                    <p className="text-sm text-gray-600">{r.comment}</p>
                  </div>
                ))}
            </div>
          )}
          {(activeTab === "Shipping" || activeTab === "About seller") && (
            <p className="text-sm text-gray-500 text-center py-8">
              {activeTab === "Shipping"
                ? `${product.shipping} • Standard delivery 3-7 business days`
                : product.supplier?.name ? `Sold by ${product.supplier.name} from ${product.supplier.country}` : "No supplier info available"}
            </p>
          )}
        </div>
      </div>

      <DiscountBanner />
    </div>
  );
};

export default ProductDetailPage;
