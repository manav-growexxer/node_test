const express = require("express");
const {
  createProduct,
  updateProduct,
  getAllProducts,
} = require("../controllers/productController");
const upload = require("../middlewares/multerConfig");
const {
  createReview,
  getProductReviews,
} = require("../controllers/reviewController");

const router = express.Router();

router
  .route("/")
  .post(upload.array("images", 5), createProduct) // Allow up to 5 images
  .get(getAllProducts);

router.route("/:id").patch(updateProduct);
router.route("/:id/reviews").post(createReview).get(getProductReviews);

module.exports = router;
