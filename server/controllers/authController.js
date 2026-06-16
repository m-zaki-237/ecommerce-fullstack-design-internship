const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");
const { successResponse, errorResponse } = require("../utils/apiResponse");

// @desc  Register user
// @route POST /api/auth/register
// @access Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("User already exists with this email");
  }
  const user = await User.create({ name, email, password });
  successResponse(
    res,
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
    "Registration successful",
    201
  );
});

// @desc  Login user
// @route POST /api/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  successResponse(res, {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    token: generateToken(user._id),
  });
});

// @desc  Get current user profile
// @route GET /api/auth/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist", "name price images");
  successResponse(res, user);
});

// @desc  Update user profile
// @route PUT /api/auth/me
// @access Private
const updateMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("+password");
  if (!user) { res.status(404); throw new Error("User not found"); }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.address) user.address = { ...user.address, ...req.body.address };
  if (req.body.password) user.password = req.body.password;
  const updated = await user.save();
  successResponse(res, {
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    address: updated.address,
    token: generateToken(updated._id),
  });
});

// @desc  Add/remove wishlist
// @route PUT /api/auth/wishlist/:productId
// @access Private
const toggleWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.productId;
  const idx = user.wishlist.indexOf(productId);
  if (idx === -1) {
    user.wishlist.push(productId);
  } else {
    user.wishlist.splice(idx, 1);
  }
  await user.save();
  successResponse(res, user.wishlist, idx === -1 ? "Added to wishlist" : "Removed from wishlist");
});

module.exports = { register, login, getMe, updateMe, toggleWishlist };
