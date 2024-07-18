import { TryCatch } from "../middlewares/error.middleware.js";
import { cookieOption, emitEvent, sendToken } from "../utils/features.js";
import { compare } from "bcrypt";
import { ErrorHandler } from "../utils/utilitys.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { Request } from "../models/request.model.js";
import { NEW_REQUEST } from "../constants/event.js";

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
  const { name = "" } = req.query;

  const myChat = await Chat.find({ groupChat: false, members: req.user });

  const allUsersFromMyChat = myChat.flatMap((chat) => chat.members);

  const allUsersExceptMeandFriends = await User.find({
    _id: { $nin: allUsersFromMyChat },
    name: { $regex: name, $options: "i" },
  });
  const user = allUsersExceptMeandFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));
  return res.status(200).json({ success: true, message: user });
});

const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;
  const request = await Request.findOne({
    $or: [
      { sender: userId, receiver: req.user },
      { sender: req.user, receiver: userId },
    ],
  });
  if (request) return next(ErrorHandler("Request already sent", 404));

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);
  return res.status(200).json({
    success: true,
    message: "Friend request sent",
  });
});

const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;
});
export {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
};
