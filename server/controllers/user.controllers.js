import { TryCatch } from "../middlewares/error.middleware.js";
import { User } from "../models/user.model.js";
import { cookieOption, sendToken } from "../utils/features.js";
import { compare } from "bcrypt";
import { ErrorHandler } from "../utils/utilitys.js";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  const avatar = {
    public_id: "ss",
    url: "ifs",
  };
  const user = await User.create({
    name,
    password,
    username,
    bio,
    avatar,
  });

  sendToken(res, user, 201, "User created successfully");
};

const login = TryCatch(async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return next(ErrorHandler("user not found", 404));
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return next(ErrorHandler("password mismatch", 401));
    }
    sendToken(res, user, 201, "Welcome back!");
  } catch (error) {
    next(error);
  }
});

const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);
  res.status(200).json({
    success: true,
    user,
  });
});

const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("access_token", "", { ...cookieOption, maxAge: 0 })
    .json({ success: true, message: "logout successfully" });
});

const searchUser = TryCatch(async (req, res) => {
  const { name } = req.query;
  return res
    .status(200)
    .json({ success: true, message: `successfully ${name}` });
});

export { login, newUser, getMyProfile, logout, searchUser };
