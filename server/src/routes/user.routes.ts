import { Router } from "express";

import {
  getProfile,
  updateProfile,
} from "../controllers/user.controller";

import { authenticate } from "../middleware/auth.middleware";

import { validate } from "../middleware/validate.middleware";

import {
  updateProfileSchema,
} from "../validations/user.validation";

const router = Router();

router.get(
  "/profile",
  authenticate,
  getProfile
);

router.patch(
  "/profile",
  authenticate,
  validate(updateProfileSchema),
  updateProfile
);

export default router;