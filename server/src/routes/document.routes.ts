import { Router } from "express";

import {
  uploadDocument,
  getDocuments,
  removeDocument,
} from "../controllers/document.controller";

import { authenticate } from "../middleware/auth.middleware";
import { uploadPdf } from "../middleware/upload.middleware";
import { validate } from "../middleware/validate.middleware";
import { createDocumentSchema } from "../validations/document.validation";

const router = Router();

router.post(
  "/upload",
  authenticate,
  uploadPdf.single("file"),
  validate(createDocumentSchema),
  uploadDocument
);

router.get(
  "/collection/:collectionId",
  authenticate,
  getDocuments
);

router.delete("/:id", authenticate, removeDocument);

export default router;
