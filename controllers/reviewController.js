const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");

exports.createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { id: productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    const review = await Review.create({
      product: productId,
      rating,
      comment,
    });

    const reviews = await Review.find({ product: productId });
    const totalRatings = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    product.averageRating = totalRatings / reviews.length;
    await product.save();

    res.status(201).json({
      status: "success",
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.id });

    res.status(200).json({
      status: "success",
      results: reviews.length,
      data: reviews,
    });
  } catch (err) {
    next(err);
  }
};
