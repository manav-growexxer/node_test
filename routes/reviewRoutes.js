const express = require("express");
const {
  createReview,
  getProductReviews,
} = require("../controllers/reviewController");

const router = express.Router();

module.exports = router;
