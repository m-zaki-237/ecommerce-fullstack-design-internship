const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const { successResponse, errorResponse, paginatedResponse } = require("../utils/apiResponse");

// @desc  Get all products with filters, search, pagination
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const query = {};

  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }
  if (req.query.category) query.category = req.query.category;
  if (req.query.brand) query.brand = { $in: req.query.brand.split(",") };
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
  }
  if (req.query.rating) query.rating = { $gte: Number(req.query.rating) };
  if (req.query.featured === "true") query.isFeatured = true;

  const sortMap = {
    newest: { createdAt: -1 },
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    rating: { rating: -1 },
    featured: { isFeatured: -1, createdAt: -1 },
  };
  const sort = sortMap[req.query.sort] || sortMap.featured;

  const [products, total] = await Promise.all([
    Product.find(query).sort(sort).skip(skip).limit(limit),
    Product.countDocuments(query),
  ]);

  paginatedResponse(res, products, total, page, limit);
});

// @desc  Get single product
// @route GET /api/products/:id
// @access Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error("Product not found"); }
  successResponse(res, product);
});

// @desc  Get featured / deals products
// @route GET /api/products/featured
// @access Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(10).sort({ createdAt: -1 });
  successResponse(res, products);
});

// @desc  Get products by category
// @route GET /api/products/category/:category
// @access Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.params.category }).limit(8);
  successResponse(res, products);
});

// @desc  Create product (admin)
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  successResponse(res, product, "Product created", 201);
});

// @desc  Update product (admin)
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) { res.status(404); throw new Error("Product not found"); }
  successResponse(res, product, "Product updated");
});

// @desc  Delete product (admin)
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) { res.status(404); throw new Error("Product not found"); }
  successResponse(res, null, "Product deleted");
});

// @desc  Create product review
// @route POST /api/products/:id/reviews
// @access Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error("Product not found"); }

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) { res.status(400); throw new Error("You already reviewed this product"); }

  product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(rating), comment });
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
  await product.save();
  successResponse(res, product.reviews, "Review added", 201);
});

module.exports = {
  getProducts, getProduct, getFeaturedProducts,
  getProductsByCategory, createProduct, updateProduct,
  deleteProduct, createReview,
};
