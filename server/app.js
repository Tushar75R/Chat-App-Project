import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/user.routes.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
dotenv.config({
  path: "./.env",
});
const mongo_uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
connectDB(mongo_uri);
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/user", userRoute);

app.get("/", (req, res) => {
  console.log("Hello World");
});

app.use(errorMiddleware);
app.listen(port, (err) => {
  if (err) throw err;
  else console.log("server is online");
});
