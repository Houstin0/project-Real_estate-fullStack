import express from "express";
import {
  addMessage,
  deleteMessage
} from "../controllers/message.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();


router.post("/", verifyToken, addMessage);
router.delete("/:messageId", verifyToken, deleteMessage);

export default router;
