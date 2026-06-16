const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { successResponse, paginatedResponse } = require("../utils/apiResponse");

// @desc  Dashboard stats
// @route GET /api/admin/stats
// @access Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalProducts, totalOrders, ordersData] = await Promise.all([
    User.countDocuments({ role: "user" }),
    Product.countDocuments(),
    Order.countDocuments(),
    Order.aggregate([{ $group: { _id: null, revenue: { $sum: "$totalPrice" } } }]),
  ]);
  const revenue = ordersData[0]?.revenue || 0;
  successResponse(res, { totalUsers, totalProducts, totalOrders, revenue });
});

// @desc  Get all users
// @route GET /api/admin/users
// @access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    User.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments({}),
  ]);
  paginatedResponse(res, users, total, page, limit);
});

// @desc  Delete user
// @route DELETE /api/admin/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) { res.status(404); throw new Error("User not found"); }
  if (user.role === "admin") { res.status(400); throw new Error("Cannot delete admin user"); }
  await user.deleteOne();
  successResponse(res, null, "User deleted");
});

// @desc  Make user admin
// @route PUT /api/admin/users/:id/role
// @access Private/Admin
const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
  if (!user) { res.status(404); throw new Error("User not found"); }
  successResponse(res, user, "User role updated");
});

module.exports = { getDashboardStats, getAllUsers, deleteUser, updateUserRole };
