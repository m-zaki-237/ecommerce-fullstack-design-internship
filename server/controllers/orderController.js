const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { successResponse, paginatedResponse } = require("../utils/apiResponse");

// @desc  Create order from cart
// @route POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart || cart.items.length === 0) {
    res.status(400); throw new Error("Cart is empty");
  }

  const itemsPrice = cart.items.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = parseFloat((itemsPrice * 0.1).toFixed(2));
  const discount = cart.discount || 0;
  const totalPrice = parseFloat((itemsPrice + shippingPrice + taxPrice - discount).toFixed(2));

  const order = await Order.create({
    user: req.user._id,
    orderItems: cart.items.map((i) => ({
      product: i.product,
      name: i.name,
      image: i.image,
      price: i.price,
      qty: i.qty,
    })),
    shippingAddress,
    paymentMethod: paymentMethod || "Card",
    itemsPrice,
    shippingPrice,
    taxPrice,
    discount,
    couponCode: cart.couponCode || "",
    totalPrice,
  });

  // Decrement stock
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product, { $inc: { countInStock: -item.qty } });
  }

  // Clear cart
  cart.items = [];
  cart.couponCode = "";
  cart.discount = 0;
  await cart.save();

  successResponse(res, order, "Order placed successfully", 201);
});

// @desc  Get logged-in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const [orders, total] = await Promise.all([
    Order.find({ user: req.user._id }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments({ user: req.user._id }),
  ]);
  paginatedResponse(res, orders, total, page, limit);
});

// @desc  Get single order
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) { res.status(404); throw new Error("Order not found"); }
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403); throw new Error("Not authorized to view this order");
  }
  successResponse(res, order);
});

// @desc  Mark order as paid (simulate payment)
// @route PUT /api/orders/:id/pay
// @access Private
const markOrderPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error("Order not found"); }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.status = "processing";
  order.paymentResult = {
    id: req.body.id || `PAY-${Date.now()}`,
    status: "COMPLETED",
    updateTime: new Date().toISOString(),
    email: req.user.email,
  };
  const updated = await order.save();
  successResponse(res, updated, "Order marked as paid");
});

// @desc  Get all orders (admin)
// @route GET /api/orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const [orders, total] = await Promise.all([
    Order.find({}).populate("user", "name email").sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments({}),
  ]);
  paginatedResponse(res, orders, total, page, limit);
});

// @desc  Update order status (admin)
// @route PUT /api/orders/:id/status
// @access Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error("Order not found"); }
  order.status = status;
  if (status === "delivered") { order.isDelivered = true; order.deliveredAt = Date.now(); }
  const updated = await order.save();
  successResponse(res, updated, "Order status updated");
});

module.exports = { createOrder, getMyOrders, getOrderById, markOrderPaid, getAllOrders, updateOrderStatus };
