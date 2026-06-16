const asyncHandler = require("express-async-handler");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");
const { successResponse } = require("../utils/apiResponse");

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate("items.product", "name images price countInStock");
  if (!cart) cart = await Cart.create({ user: userId, items: [], savedItems: [] });
  return cart;
};

// @desc  Get cart
// @route GET /api/cart
// @access Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  successResponse(res, cart);
});

// @desc  Add item to cart
// @route POST /api/cart
// @access Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, qty = 1, size = "", color = "" } = req.body;
  const product = await Product.findById(productId);
  if (!product) { res.status(404); throw new Error("Product not found"); }
  if (product.countInStock < qty) { res.status(400); throw new Error("Insufficient stock"); }

  const cart = await getOrCreateCart(req.user._id);
  const existingIdx = cart.items.findIndex((i) => i.product.toString() === productId);

  if (existingIdx > -1) {
    cart.items[existingIdx].qty += qty;
  } else {
    cart.items.push({
      product: productId,
      name: product.name,
      image: product.images[0] || "",
      price: product.price,
      qty,
      seller: product.supplier?.name || "",
      size,
      color,
    });
  }
  await cart.save();
  successResponse(res, cart, "Item added to cart");
});

// @desc  Update cart item quantity
// @route PUT /api/cart/:itemId
// @access Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { qty } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) { res.status(404); throw new Error("Cart not found"); }

  const item = cart.items.id(req.params.itemId);
  if (!item) { res.status(404); throw new Error("Item not found in cart"); }

  if (qty < 1) {
    item.deleteOne();
  } else {
    item.qty = qty;
  }
  await cart.save();
  successResponse(res, cart, "Cart updated");
});

// @desc  Remove item from cart
// @route DELETE /api/cart/:itemId
// @access Private
const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) { res.status(404); throw new Error("Cart not found"); }
  const item = cart.items.id(req.params.itemId);
  if (!item) { res.status(404); throw new Error("Item not found"); }
  item.deleteOne();
  await cart.save();
  successResponse(res, cart, "Item removed");
});

// @desc  Clear cart
// @route DELETE /api/cart
// @access Private
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (cart) { cart.items = []; await cart.save(); }
  successResponse(res, null, "Cart cleared");
});

// @desc  Save item for later
// @route PUT /api/cart/:itemId/save
// @access Private
const saveForLater = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) { res.status(404); throw new Error("Cart not found"); }
  const item = cart.items.id(req.params.itemId);
  if (!item) { res.status(404); throw new Error("Item not found"); }
  cart.savedItems.push({ ...item.toObject(), _id: undefined });
  item.deleteOne();
  await cart.save();
  successResponse(res, cart, "Item saved for later");
});

// @desc  Move saved item to cart
// @route PUT /api/cart/saved/:itemId/move
// @access Private
const moveToCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) { res.status(404); throw new Error("Cart not found"); }
  const item = cart.savedItems.id(req.params.itemId);
  if (!item) { res.status(404); throw new Error("Saved item not found"); }
  cart.items.push({ ...item.toObject(), _id: undefined });
  item.deleteOne();
  await cart.save();
  successResponse(res, cart, "Item moved to cart");
});

// @desc  Remove saved item
// @route DELETE /api/cart/saved/:itemId
// @access Private
const removeSaved = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) { res.status(404); throw new Error("Cart not found"); }
  const item = cart.savedItems.id(req.params.itemId);
  if (!item) { res.status(404); throw new Error("Saved item not found"); }
  item.deleteOne();
  await cart.save();
  successResponse(res, cart, "Saved item removed");
});

// @desc  Apply coupon
// @route POST /api/cart/coupon
// @access Private
const applyCoupon = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isActive: true,
  });

  if (!coupon) throw new Error("Invalid or expired coupon");
  if (coupon.expiresAt && coupon.expiresAt < new Date())
    throw new Error("Coupon has expired");
  if (coupon.usedCount >= coupon.maxUses)
    throw new Error("Coupon usage limit reached");

  const cart = await Cart.findOne({ user: req.user._id });

  const subtotal = cart.items.reduce((s, i) => s + i.price * i.qty, 0);

  if (subtotal < coupon.minOrderAmount) {
    throw new Error(`Minimum order amount is $${coupon.minOrderAmount}`);
  }

  const discount =
    coupon.discountType === "percentage"
      ? (subtotal * coupon.discountValue) / 100
      : coupon.discountValue;

  cart.couponCode = coupon.code;
  cart.discount = Math.min(discount, subtotal);

  await cart.save();

  // 🔥 IMPORTANT: return FULL cart ONLY
  successResponse(res, cart, "Coupon applied");
});

module.exports = {
  getCart, addToCart, updateCartItem, removeFromCart,
  clearCart, saveForLater, moveToCart, removeSaved, applyCoupon,
};
