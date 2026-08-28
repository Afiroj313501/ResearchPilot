import { Router } from "express";

import {
  askQuestion,
} from "../controllers/chat.controller";

import {
  authenticate,
} from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  askQuestion
);

export default router;