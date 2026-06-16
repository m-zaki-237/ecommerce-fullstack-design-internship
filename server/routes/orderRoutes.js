const express = require("express");
const router = express.Router();
const {
  createOrder, getMyOrders, getOrderById,
  markOrderPaid, getAllOrders, updateOrderStatus,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", createOrder);
router.get("/myorders", getMyOrders);
router.get("/:id", getOrderById);
router.put("/:id/pay", markOrderPaid);

router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
