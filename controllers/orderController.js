const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");
const User = require("../models/userModel");

exports.createOrder = catchAsync(async (req, res, next) => {
  const { products } = req.body;
  if (!products || products.length === 0) {
    return next(new AppError("Order must contain at least one product", 400));
  }

  let totalPrice = 0;
  const bulkUpdateOps = [];

  for (let item of products) {
    const product = await Product.findById(item.product);
    if (!product)
      return next(new AppError(`Invalid product ID: ${item.product}`, 400));
    if (product.stock < item.quantity)
      return next(new AppError(`Insufficient stock for ${product.name}`, 400));

    totalPrice += product.price * item.quantity;
    bulkUpdateOps.push({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { stock: -item.quantity } },
      },
    });
  }

  await Product.bulkWrite(bulkUpdateOps);

  const order = await Order.create({
    customer: req.user._id,
    products,
    totalPrice,
  });

  await sendEmail({
    email: req.user.email,
    subject: "Order Confirmation",
    message: `Your order has been placed successfully! Order ID: ${order._id}`,
  });

  res.status(201).json({
    status: "success",
    data: order,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ["Pending", "Shipped", "Delivered"];
  if (!validStatuses.includes(status)) {
    return next(new AppError("Invalid status value", 400));
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!order) return next(new AppError("Order not found", 404));

  res.status(200).json({ status: "success", data: order });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "products.product"
  );

  if (!order || order.length === 0)
    return next(new AppError("Order not found", 404));

  res.status(200).json({ status: "success", data: order });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  let query = Order.find().populate("products.product");

  if (req.query.status) query = query.where("status").equals(req.query.status);

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  const orders = await query;

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: orders,
  });
});
