import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.routes.js";
import chatRoute from "./routes/chat.routes.js";
import adminRoute from "./routes/admin.routes.js";
dotenv.config({
  path: "./.env",
});
const mongo_uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "fsdfds";
const envMode = process.env.NODE_ENV || "DEVELOPMENT";

connectDB(mongo_uri);
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);
app.get("/", (req, res) => {
  console.log("Hello World");
});

app.use(errorMiddleware);
app.listen(port, (err) => {
  console.log(`server listening on ${port} and in ${envMode} mode`);
});

export { adminSecretKey, envMode };
