import { Router } from "express";

import {
  getConversations,
  getConversation,
} from "../controllers/conversation.controller";

import {
  deleteConversation,
} from "../controllers/conversation.controller";

import {
  authenticate,
} from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  authenticate,
  getConversations
);

router.get(
  "/:conversationId",
  authenticate,
  getConversation
);
router.delete(
  "/:conversationId",
  authenticate,
  deleteConversation
);
export default router;