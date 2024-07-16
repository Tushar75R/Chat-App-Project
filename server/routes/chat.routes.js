import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  addMembers,
  getMyChat,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
} from "../controllers/chat.controllers.js";

const app = express.Router();

//After that user must be logged in
app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.post("/my", getMyChat);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMembers);

app.put("/removemember", removeMember);

app.delete("/leave/:id", leaveGroup);
//send attachments

//get messages

//get chat details , rename, delete
export default app;
