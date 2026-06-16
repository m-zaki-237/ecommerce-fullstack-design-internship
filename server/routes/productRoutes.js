const express = require("express");
const router = express.Router();
const {
  getProducts, getProduct, getFeaturedProducts,
  getProductsByCategory, createProduct, updateProduct,
  deleteProduct, createReview,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProduct);

router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.post("/:id/reviews", protect, createReview);

module.exports = router;
