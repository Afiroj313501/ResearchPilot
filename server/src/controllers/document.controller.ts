import {
  Response,
  NextFunction,
} from "express";

import {
  createDocument,
  getCollectionDocuments,
  deleteDocument,
} from "../services/document.service";

import {
  processDocument,
} from "../services/document-processing.service";

import type {
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

import { AppError } from "../utils/app-error";

export const uploadDocument = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check authentication
    if (!req.userId) {
      throw new AppError(
        "Authentication required",
        401
      );
    }

    // Check uploaded file
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "PDF file is required",
      });

      return;
    }

    const { collectionId } = req.body;

    // Create document record
    const document = await createDocument(
      req.userId,
      collectionId,
      req.file
    );

    // Return response immediately.
    // DO NOT await processDocument here.
    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: {
        document,
      },
    });

    // Start processing in background
    processDocument(document.id)
      .then(() => {
        console.log(
          `✅ Background processing completed: ${document.id}`
        );
      })
      .catch((error) => {
        console.error(
          `❌ Background processing failed: ${document.id}`,
          error
        );
      });
  } catch (error) {
    next(error);
  }
};

export const getDocuments = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check authentication
    if (!req.userId) {
      throw new AppError(
        "Authentication required",
        401
      );
    }

    const collectionId =
      req.params.collectionId;

    // Validate collection ID
    if (
      !collectionId ||
      Array.isArray(collectionId)
    ) {
      throw new AppError(
        "Invalid collection ID",
        400
      );
    }

    const documents =
      await getCollectionDocuments(
        req.userId,
        collectionId
      );

    res.status(200).json({
      success: true,
      message:
        "Documents retrieved successfully",
      data: {
        documents,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const removeDocument = async (
  req: AuthenticatedRequest, res: Response, next: NextFunction
): Promise<void> => {
  try {
    if (!req.userId) throw new AppError("Authentication required", 401);
    const documentId = req.params.id;
    if (!documentId || Array.isArray(documentId)) throw new AppError("Invalid document ID", 400);
    await deleteDocument(req.userId, documentId);
    res.status(200).json({ success: true, message: "Document deleted successfully" });
  } catch (error) { next(error); }
};
