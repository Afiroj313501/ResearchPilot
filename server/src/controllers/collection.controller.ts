import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  createCollection,
  getUserCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
} from "../services/collection.service";

import type { AuthenticatedRequest } from "../middleware/auth.middleware";
import { AppError } from "../utils/app-error";

const getAuthenticatedUserId = (
  req: AuthenticatedRequest
): string => {
  if (!req.userId) {
    throw new AppError(
      "Authentication required",
      401
    );
  }

  return req.userId;
};

export const create = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const collection = await createCollection(
      getAuthenticatedUserId(req),
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Collection created successfully",
      data: {
        collection,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const collections = await getUserCollections(
      getAuthenticatedUserId(req)
    );

    res.status(200).json({
      success: true,
      message: "Collections retrieved successfully",
      data: {
        collections,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const collection = await getCollectionById(
      getAuthenticatedUserId(req),
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Collection retrieved successfully",
      data: {
        collection,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const collection = await updateCollection(
      getAuthenticatedUserId(req),
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Collection updated successfully",
      data: {
        collection,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await deleteCollection(
      getAuthenticatedUserId(req),
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};