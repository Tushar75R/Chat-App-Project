import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const cookieOption = {
  maxAge: 1000 * 60 * 60 * 24 * 15,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};
const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "Connecto" })
    .then((data) => {
      console.log(`connected to DB : ${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(code)
    .cookie("access_token", token, cookieOption)
    .json({ success: true, message });
};

const emitEvent = (req, event, users, data) => {
  console.log("emitEvent", event);
};

const deleteFilesFromCloudinary = async (public_ids) => {};
export {
  connectDB,
  sendToken,
  cookieOption,
  emitEvent,
  deleteFilesFromCloudinary,
};
