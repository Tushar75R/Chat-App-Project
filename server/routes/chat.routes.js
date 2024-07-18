import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  addMembers,
  getChatDetails,
  getMyChat,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachment,
  deleteChat,
  getMessages,
} from "../controllers/chat.controllers.js";
import { attachmentsMulter } from "../middlewares/multer.middleware.js";

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
app.post("/message", attachmentsMulter, sendAttachment);
//get messages

app.get("/message/:id", getMessages);

//get chat details , rename, delete
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);
export default app;
