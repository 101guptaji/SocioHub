import express from "express";
import * as ctrl from "./controller.js";
import { auth } from '../../middleware/auth.js';

const router = express.Router();

// Send a new message
router.post("/", auth, ctrl.sendMessage);

// Get conversation with a specific user
router.get("/:userId", auth, ctrl.getConversation);

// Get inbox (last messages with all users)
router.get("/", auth, ctrl.getInbox);

export default router;
