import { ErrorHandler } from "../utils/utilitys.js";
import { TryCatch } from "./error.middleware.js";
import { adminSecretKey } from "../app.js";
import jwt from "jsonwebtoken";

const isAuthenticated = TryCatch(async (req, res, next) => {
  //   console.log(req.cookies.access_token);
  const token = req.cookies["access_token"];
  if (!token) {
    return next(ErrorHandler("please login to access this route", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedData._id;
  next();
});

const adminOnly = TryCatch(async (req, res, next) => {
  //   console.log(req.cookies.access_token);
  const token = req.cookies["connecto-admin-token"];
  if (!token) {
    next(ErrorHandler("only admin can access this route", 401));
  }
  const adminID = jwt.verify(token, process.env.JWT_SECRET);
  const isMatched = adminID === adminSecretKey;

  if (!isMatched) return next(ErrorHandler("Invalid Admin Key", 401));
  next();
});

export { isAuthenticated, adminOnly };
