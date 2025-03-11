const express = require("express");
const { protect, restrictTo } = require("../middlewares/authMiddleware");
const {
  createOrder,
  updateOrder,
  getOrder,
  getAllOrders,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", protect, createOrder);
router.patch("/:id", protect, updateOrder);
router.get("/:id", protect, getOrder);
router.get("/", protect, getAllOrders);

module.exports = router;
