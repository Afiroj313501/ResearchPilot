import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  createDocument,
} from "../services/document.service";

import type { AuthenticatedRequest } from "../middleware/auth.middleware";
import { AppError } from "../utils/app-error";

export const uploadDocument = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.userId) {
      throw new AppError(
        "Authentication required",
        401
      );
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "PDF file is required",
      });

      return;
    }

    const { collectionId } = req.body;

    const document = await createDocument(
      req.userId,
      collectionId,
      req.file
    );

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: {
        document,
      },
    });
  } catch (error) {
    next(error);
  }
};