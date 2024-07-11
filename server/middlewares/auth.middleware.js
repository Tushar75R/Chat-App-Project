import { ErrorHandler } from "../utils/utilitys.js";
import { TryCatch } from "./error.middleware.js";
import jwt from "jsonwebtoken";

const isAuthenticated = TryCatch(async (req, res, next) => {
  //   console.log(req.cookies.access_token);
  const token = req.cookies.access_token;
  if (!token) {
    next(ErrorHandler("please login to access this route", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedData._id;
  next();
});

export { isAuthenticated };
