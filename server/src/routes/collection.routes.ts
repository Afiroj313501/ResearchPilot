import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/collection.controller";

import { authenticate } from "../middleware/auth.middleware";

import { validate } from "../middleware/validate.middleware";

import {
  createCollectionSchema,
  updateCollectionSchema,
} from "../validations/collection.validation";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validate(createCollectionSchema),
  create
);

router.get(
  "/",
  getAll
);

router.get(
  "/:id",
  getOne
);

router.patch(
  "/:id",
  validate(updateCollectionSchema),
  update
);

router.delete(
  "/:id",
  remove
);

export default router;