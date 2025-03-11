const Product = require("../models/productModel");
const AppError = require("../utils/appError");
exports.createProduct = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next(new AppError("At least one image is required", 400));
    }

    const imagePaths = req.files.map((file) => file.path);

    if (!req.body.stock || req.body.stock < 0) {
      return next(new AppError("Stock must be a positive number", 400));
    }

    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      images: imagePaths,
      averageRating: req.body.averageRating,
      stock: req.body.stock,
    });

    res.status(201).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map((file) => file.path);
    }

    if (req.body.stock !== undefined) {
      req.body.stock = parseInt(req.body.stock, 10);
      if (isNaN(req.body.stock) || req.body.stock < 0) {
        return next(new AppError("Stock must be a positive number", 400));
      }
    }

    if (req.body.price) {
      req.body.price = parseFloat(req.body.price.replace(/,/g, ""));
      if (isNaN(req.body.price)) {
        return next(new AppError("Invalid price format", 400));
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    let query = Product.find();

    if (req.query.category) {
      query = query.where("category").equals(req.query.category);
    }

    if (req.query.sort) {
      query = query.sort(req.query.sort === "asc" ? "price" : "-price");
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const products = await query;

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};
