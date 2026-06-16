import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import DiscountBanner from "../../components/common/DiscountBanner";

const TRUST_BADGES = [
  { icon: "🔒", label: "Secure payment", sub: "100% secured transactions" },
  { icon: "💬", label: "Customer support", sub: "24/7 dedicated support" },
  { icon: "🚚", label: "Free delivery", sub: "On orders over $100" },
];

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { cart, loading, fetchCart, updateQty, removeItem, clearCart, saveForLater, moveToCart, removeSaved, applyCoupon } = useCartStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  const items = cart?.items || [];
  const savedItems = cart?.savedItems || [];
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = cart?.discount || 0;
  const shipping = subtotal > 100 ? 0 : items.length > 0 ? 10 : 0;
  const tax = parseFloat((subtotal * 0.1).toFixed(2));
  const total = subtotal + shipping + tax - discount;

  const handleApplyCoupon = async () => {
    try {
      const saved = await applyCoupon(couponInput);
      setCouponMsg(`Coupon applied! You saved $${saved.toFixed(2)}`);
    } catch (err) {
      setCouponMsg(`${err.message}`);
    }
    setTimeout(() => setCouponMsg(""), 3000);
  };

  const handleCheckout = async () => {
    if (!user) { navigate("/login"); return; }
    setCheckoutLoading(true);
    setTimeout(() => {
      setCheckoutLoading(false);
      alert("Order placed successfully! (Integrate payment gateway here)");
    }, 1000);
  };

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Please log in to view your cart</h2>
        <Link to="/login" className="btn-primary inline-block mt-4">Login</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-4 flex gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
      <h1 className="font-bold text-gray-800 text-2xl mb-6">My cart ({items.length})</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cart items */}
        <div className="flex-1 min-w-0">
          <div className="card overflow-hidden">
            {items.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <p className="text-4xl mb-3">🛒</p>
                <p className="font-medium text-gray-600 mb-2">Your cart is empty</p>
                <Link to="/listing" className="link-blue">Browse products</Link>
              </div>
            ) : items.map((item, i) => (
              <div key={item._id} className={`flex gap-4 p-4 ${i < items.length - 1 ? "border-b border-gray-100" : ""}`}>
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 leading-snug line-clamp-2">{item.name}</h3>
                  {item.size && <p className="text-xs text-gray-400 mb-0.5">Size: {item.size}</p>}
                  {item.seller && <p className="text-xs text-gray-400 mb-2">Seller: {item.seller}</p>}
                  <div className="flex items-center gap-3">
                    <button onClick={() => removeItem(item._id)} className="text-xs text-blue-500 hover:text-red-500 transition-colors">Remove</button>
                    <button onClick={() => saveForLater(item._id)} className="text-xs text-blue-500 hover:underline">Save for later</button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <p className="font-bold text-gray-800">${(item.price * item.qty).toFixed(2)}</p>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQty(item._id, item.qty - 1)} className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 text-sm font-medium">−</button>
                    <span className="px-3 text-sm font-medium border-x border-gray-200">{item.qty}</span>
                    <button onClick={() => updateQty(item._id, item.qty + 1)} className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 text-sm font-medium">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <Link to="/listing" className="flex items-center gap-2 text-sm text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
              ← Back to shop
            </Link>
            {items.length > 0 && (
              <button onClick={clearCart} className="text-sm text-red-500 border border-red-200 rounded-lg px-4 py-2 hover:bg-red-50 transition-colors">
                Remove all
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            {TRUST_BADGES.map(({ icon, label, sub }) => (
              <div key={label} className="card p-3 flex items-center gap-3">
                <span className="text-2xl shrink-0">{icon}</span>
                <div><p className="text-xs font-semibold text-gray-700">{label}</p><p className="text-xs text-gray-400 hidden sm:block">{sub}</p></div>
              </div>
            ))}
          </div>

          {/* Saved for later */}
          {savedItems.length > 0 && (
            <div className="mt-8">
              <h2 className="section-title">Saved for later</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {savedItems.map((item) => (
                  <div key={item._id} className="card overflow-hidden hover:shadow-md transition-shadow">
                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <p className="font-bold text-gray-800 mb-1">${item.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.name}</p>
                      <div className="flex gap-1">
                        <button onClick={() => moveToCart(item._id)} className="flex-1 border border-blue-500 text-blue-500 rounded-lg py-1.5 text-xs font-medium hover:bg-blue-50 transition-colors">Move to cart</button>
                        <button onClick={() => removeSaved(item._id)} className="text-xs text-red-400 hover:text-red-600 px-1">✕</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="md:w-72 shrink-0">
          <div className="card p-5 sticky top-24">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Have a coupon?</p>
              <div className="flex gap-2">
                <input value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Enter code" className="input-field flex-1" />
                <button onClick={handleApplyCoupon} className="btn-primary px-3 py-2 text-xs">Apply</button>
              </div>
              {couponMsg && <p className="text-xs mt-1.5">{couponMsg}</p>}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2.5">
              <div className="flex justify-between text-sm text-gray-600"><span>Subtotal:</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm text-gray-600"><span>Shipping:</span><span className="font-medium">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-sm text-gray-600"><span>Tax (10%):</span><span className="font-medium">${tax.toFixed(2)}</span></div>
              {discount > 0 && <div className="flex justify-between text-sm text-gray-600"><span>Discount:</span><span className="text-red-500 font-medium">-${discount.toFixed(2)}</span></div>}
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-800">
                <span>Total:</span><span className="text-xl">${total > 0 ? total.toFixed(2) : "0.00"}</span>
              </div>
            </div>
            <button onClick={handleCheckout} disabled={items.length === 0 || checkoutLoading}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold mt-4 hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {checkoutLoading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      </div>

      <DiscountBanner />
    </div>
  );
};

export default CartPage;
