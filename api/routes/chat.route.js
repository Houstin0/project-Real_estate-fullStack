import express from "express";
import {
  getConversations,
  getMessages
} from "../controllers/chat.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.get("/messages/:conversationId", verifyToken, getMessages);
// router.get("/:id", verifyToken, getChat);
// router.post("/", verifyToken, addChat);
// router.put("/read/:id", verifyToken, readChat);

export default router;
