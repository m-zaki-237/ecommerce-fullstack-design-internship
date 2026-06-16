const express = require("express");
const router = express.Router();
const {
  getCart, addToCart, updateCartItem, removeFromCart,
  clearCart, saveForLater, moveToCart, removeSaved, applyCoupon,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/", clearCart);
router.post("/coupon", applyCoupon);

router.put("/saved/:itemId/move", moveToCart);
router.delete("/saved/:itemId", removeSaved);

router.put("/:itemId", updateCartItem);
router.delete("/:itemId", removeFromCart);
router.put("/:itemId/save", saveForLater);

module.exports = router;
