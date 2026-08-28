import { NextFunction, Response } from "express";

import type { AuthenticatedRequest } from "../middleware/auth.middleware";

import { AppError } from "../utils/app-error";

import {
  deleteConversationForUser,
  getConversationMessages,
  getUserConversations,
} from "../services/conversation.service";

export const getConversations = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.userId) {
      throw new AppError("Authentication required", 401);
    }

    const conversations = await getUserConversations(req.userId);

    res.status(200).json({
      success: true,
      message: "Conversations retrieved successfully",
      data: {
        conversations,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getConversation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.userId) {
      throw new AppError("Authentication required", 401);
    }

    const conversationId = req.params.conversationId;

    if (!conversationId || Array.isArray(conversationId)) {
      throw new AppError("Conversation ID is required", 400);
    }

    const conversation = await getConversationMessages(
      conversationId,
      req.userId
    );

    res.status(200).json({
      success: true,
      message: "Conversation retrieved successfully",
      data: {
        conversation,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteConversation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.userId) {
      throw new AppError("Authentication required", 401);
    }

    const conversationId = req.params.conversationId;

    if (!conversationId || Array.isArray(conversationId)) {
      throw new AppError("Conversation ID is required", 400);
    }

    await deleteConversationForUser(conversationId, req.userId);

    res.status(200).json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};