const User = require("../models/userModel");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new AppError("Email already in use", 400));

    const user = await User.create({ name, email, password });
    const token = user.generateToken();

    res.status(201).json({
      status: "success",
      token,
      data: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new AppError("Invalid email or password", 401));

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(new AppError("Invalid email or password", 401));

    const token = user.generateToken();
    res.status(200).json({
      status: "success",
      token,
      data: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};
