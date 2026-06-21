import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "../../store/productStore";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import Breadcrumb from "../../components/ui/Breadcrumb";
import StarRating from "../../components/ui/StarRating";
import DiscountBanner from "../../components/common/DiscountBanner";
import { productAPI } from "../../api/productAPI";
import { toast } from "react-toastify";

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

  // Review form state
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewMsg, setReviewMsg] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  // Modal state
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [sellerOpen, setSellerOpen] = useState(false);
  const [inquiryMsg, setInquiryMsg] = useState("");
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    fetchProduct(id);
    setSelectedImg(0);
  }, [id]);
  useEffect(() => {
    if (inquirySent) {
      toast.success(`Inquiry sent to ${product.supplier?.name}!`);
    }
  }, [inquirySent]);
  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await addToCart(product._id, qty);
      toast.success("Added to cart!");
      setTimeout(() => setAddedMsg(""), 2000);
    } catch (err) {
      setAddedMsg("❌ " + (err.message || "Failed to add"));
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (reviewRating === 0) {
      setReviewMsg("❌ Please select a rating");
      return;
    }
    setReviewLoading(true);
    try {
      await productAPI.createReview(id, {
        rating: reviewRating,
        comment: reviewComment,
      });
      toast.sucess("Review submitted!");
      setReviewRating(0);
      setReviewComment("");
      fetchProduct(id);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setReviewLoading(false);
      setTimeout(() => setReviewMsg(""), 3000);
    }
  };

  const closeInquiry = () => {
    setInquiryOpen(false);
    setInquirySent(false);
    setInquiryMsg("");
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
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
      <Breadcrumb
        items={[
          "Home",
          "Products",
          product.category,
          product.name.slice(0, 30) + "...",
        ]}
      />

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Images */}
        <div className="md:w-80 shrink-0">
          <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 h-72 border border-gray-100">
            <img
              src={product.images?.[selectedImg]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {product.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${selectedImg === i ? "border-blue-500" : "border-transparent hover:border-gray-300"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {product.countInStock > 0 ? (
              <span className="text-green-500 text-sm font-medium">
                ✓ In stock ({product.countInStock} available)
              </span>
            ) : (
              <span className="text-red-500 text-sm font-medium">
                ✗ Out of stock
              </span>
            )}
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-3 leading-snug">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <StarRating score={product.rating * 2} />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-sm">
              💬 {product.numReviews} reviews
            </span>
          </div>

          {product.priceTiers?.length > 0 ? (
            <div className="flex gap-2 mb-5 flex-wrap">
              {product.priceTiers.map((tier, i) => (
                <div
                  key={i}
                  className={`rounded-lg px-4 py-2 text-center ${i === 0 ? "bg-red-500 text-white" : i === 1 ? "bg-orange-100 text-orange-700" : "bg-orange-50 text-orange-600"}`}
                >
                  <p className="font-bold text-lg leading-tight">
                    ${tier.price.toFixed(2)}
                  </p>
                  <p className="text-xs opacity-80 mt-0.5">
                    {tier.label ||
                      `${tier.minQty}${tier.maxQty ? `-${tier.maxQty}` : "+"} pcs`}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-bold text-red-500">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="badge-discount">-{product.discount}%</span>
              )}
            </div>
          )}

          <table className="w-full text-sm mb-5">
            <tbody>
              {product.specs?.map(({ label, value }) => (
                <tr key={label} className="border-b border-gray-100">
                  <td className="py-2 text-gray-400 pr-4 whitespace-nowrap w-1/3">
                    {label}:
                  </td>
                  <td className="py-2 text-gray-700">{value}</td>
                </tr>
              ))}
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-400 pr-4">Shipping:</td>
                <td className="py-2 text-green-600 font-medium">
                  {product.shipping}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2 hover:bg-gray-50 text-gray-600"
              >
                −
              </button>
              <span className="px-4 py-2 text-sm font-medium border-x border-gray-200">
                {qty}
              </span>
              <button
                onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                className="px-3 py-2 hover:bg-gray-50 text-gray-600"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={cartLoading || product.countInStock === 0}
              className="btn-primary px-8 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cartLoading ? "Adding..." : "Add to Cart"}
            </button>
            {addedMsg && (
              <span
                className={`text-sm font-medium ${addedMsg.includes("❌") ? "text-red-500" : "text-green-500"}`}
              >
                {addedMsg}
              </span>
            )}
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
                  <p className="text-sm font-semibold text-gray-800">
                    {product.supplier.name}
                  </p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-gray-500 mb-4">
                {product.supplier.flag && (
                  <p>
                    {product.supplier.flag} {product.supplier.country}
                  </p>
                )}
                {product.supplier.verified && (
                  <p className="text-green-600">✓ Verified Seller</p>
                )}
                <p>🌐 Worldwide shipping</p>
              </div>
              <button
                onClick={() => setInquiryOpen(true)}
                className="btn-primary w-full py-2.5 text-sm mb-2"
              >
                Send inquiry
              </button>
              <button
                onClick={() => setSellerOpen(true)}
                className="link-blue w-full text-center block"
              >
                Seller's profile
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="card overflow-hidden mb-8">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              {tab}
              {tab === "Reviews" && product.numReviews > 0 && (
                <span className="ml-1.5 bg-gray-100 text-gray-500 text-xs px-1.5 py-0.5 rounded-full">
                  {product.numReviews}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "Description" && (
            <div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {product.description}
              </p>
              {product.features?.length > 0 && (
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <span className="text-green-500 font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-4">
                  {product.reviews?.length === 0
                    ? "No reviews yet"
                    : `${product.numReviews} Review${product.numReviews !== 1 ? "s" : ""}`}
                </h3>
                {product.reviews?.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    Be the first to review this product!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {product.reviews.map((r) => (
                      <div
                        key={r._id}
                        className="border-b border-gray-100 pb-4 last:border-0"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                            {r.name?.[0]}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-800">
                              {r.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-400 text-sm">
                                {"★".repeat(r.rating)}
                                {"☆".repeat(5 - r.rating)}
                              </span>
                              <span className="text-xs text-gray-400">
                                {new Date(r.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 ml-11">
                          {r.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:w-72 shrink-0">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Write a Review
                  </h3>
                  {!user ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500 mb-3">
                        You need to be logged in to write a review
                      </p>
                      <button
                        onClick={() => navigate("/login")}
                        className="btn-primary text-sm px-6 py-2"
                      >
                        Login to review
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Rating *
                        </label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onMouseEnter={() => setHoveredStar(star)}
                              onMouseLeave={() => setHoveredStar(0)}
                              onClick={() => setReviewRating(star)}
                              className="text-2xl transition-transform hover:scale-110 focus:outline-none"
                            >
                              <span
                                className={
                                  star <= (hoveredStar || reviewRating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }
                              >
                                ★
                              </span>
                            </button>
                          ))}
                        </div>
                        {reviewRating > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {
                              [
                                "",
                                "Poor",
                                "Fair",
                                "Good",
                                "Very Good",
                                "Excellent",
                              ][reviewRating]
                            }
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Review *
                        </label>
                        <textarea
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          required
                          rows={4}
                          placeholder="Share your experience with this product..."
                          className="input-field resize-none"
                        />
                      </div>

                      {reviewMsg && (
                        <p
                          className={`text-xs font-medium ${reviewMsg.includes("❌") ? "text-red-500" : "text-green-600"}`}
                        >
                          {reviewMsg}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={reviewLoading}
                        className="btn-primary w-full py-2.5 disabled:opacity-50"
                      >
                        {reviewLoading ? "Submitting..." : "Submit Review"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Shipping" && (
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span>{" "}
                {product.shipping}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span> Standard
                delivery 3-7 business days
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span> Express
                delivery available at checkout
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span> Free returns
                within 30 days
              </p>
            </div>
          )}

          {activeTab === "About seller" && (
            <div className="text-sm text-gray-600 space-y-2">
              {product.supplier?.name ? (
                <>
                  <p>
                    <span className="font-medium">Seller:</span>{" "}
                    {product.supplier.name}
                  </p>
                  <p>
                    <span className="font-medium">Country:</span>{" "}
                    {product.supplier.flag} {product.supplier.country}
                  </p>
                  <p>
                    <span className="font-medium">Verified:</span>{" "}
                    {product.supplier.verified ? "✅ Yes" : "❌ No"}
                  </p>
                  <p>
                    <span className="font-medium">Shipping:</span> Worldwide
                  </p>
                </>
              ) : (
                <p className="text-gray-400">
                  No seller information available.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <DiscountBanner />

      {/* Send Inquiry Modal */}
      {inquiryOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 text-lg">Send Inquiry</h3>
              <button
                onClick={closeInquiry}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {inquirySent ? (
              <div className="text-center py-6">
                <p className="text-sm text-gray-400 mt-1">
                  They'll get back to you soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setInquirySent(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your message
                  </label>
                  <textarea
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    required
                    rows={4}
                    placeholder={`Hi, I'm interested in "${product.name}". Could you share more details about bulk pricing and shipping?`}
                    className="input-field resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-2.5">
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Seller Profile Modal */}
      {sellerOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 text-lg">
                Seller Profile
              </h3>
              <button
                onClick={() => setSellerOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-center mb-5">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-2xl mx-auto mb-3">
                {product.supplier?.name?.[0]}
              </div>
              <p className="font-semibold text-gray-800">
                {product.supplier?.name}
              </p>
              <p className="text-sm text-gray-400">
                {product.supplier?.flag} {product.supplier?.country}
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Verified</span>
                <span
                  className={
                    product.supplier?.verified
                      ? "text-green-600 font-medium"
                      : "text-gray-400"
                  }
                >
                  {product.supplier?.verified ? "✓ Yes" : "Not verified"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-700 font-medium">Worldwide</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Category</span>
                <span className="text-gray-700 font-medium">
                  {product.category}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSellerOpen(false);
                setInquiryOpen(true);
              }}
              className="btn-primary w-full py-2.5 mt-5"
            >
              Contact this seller
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
