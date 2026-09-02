import {
  Response,
  NextFunction,
} from "express";

import {
  createDocument,
  getCollectionDocuments,
  deleteDocument,
  getDocumentForUser,
  updateDocumentTitle,
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

export const updateDocument = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.userId) throw new AppError("Authentication required", 401);
    const documentId = req.params.id;
    const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
    if (!documentId || Array.isArray(documentId) || !title) throw new AppError("A document title is required", 400);
    const document = await updateDocumentTitle(req.userId, documentId, title);
    res.status(200).json({ success: true, message: "Document updated successfully", data: { document } });
  } catch (error) { next(error); }
};

export const downloadDocument = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.userId) throw new AppError("Authentication required", 401);
    const documentId = req.params.id;
    if (!documentId || Array.isArray(documentId)) throw new AppError("Invalid document ID", 400);
    const document = await getDocumentForUser(req.userId, documentId);
    if (!document.fileUrl) throw new AppError("Document file not found", 404);
    res.download(document.fileUrl, document.originalName);
  } catch (error) { next(error); }
};
