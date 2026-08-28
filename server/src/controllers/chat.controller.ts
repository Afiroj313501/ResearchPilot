import {
  Response,
  NextFunction,
} from "express";

import type { AuthenticatedRequest } from "../middleware/auth.middleware";

import { AppError } from "../utils/app-error";

import {
  generateRAGAnswer,
} from "../services/answer.service";

import {
  createConversation,
  getConversationForUser,
  addMessage,
} from "../services/conversation.service";

export const askQuestion = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Make sure the user is authenticated
    if (!req.userId) {
      throw new AppError(
        "Authentication required",
        401
      );
    }

    const {
      collectionId,
      question,
      conversationId,
    } = req.body;

    // Validate collection ID
    if (
      !collectionId ||
      typeof collectionId !== "string"
    ) {
      throw new AppError(
        "Collection ID is required",
        400
      );
    }

    // Validate question
    if (
      !question ||
      typeof question !== "string" ||
      !question.trim()
    ) {
      throw new AppError(
        "Question is required",
        400
      );
    }

    let activeConversationId: string;

    // ------------------------------------------------
    // 1. Create a new conversation OR validate existing
    // ------------------------------------------------

    if (conversationId) {
      if (
        typeof conversationId !== "string"
      ) {
        throw new AppError(
          "Invalid conversation ID",
          400
        );
      }

      const conversation =
        await getConversationForUser(
          conversationId,
          req.userId
        );

      activeConversationId =
        conversation.id;

      // Save user's new question
      await addMessage(
        activeConversationId,
        "USER",
        question.trim()
      );
    } else {
      const conversation =
        await createConversation(
          req.userId,
          collectionId,
          question
        );

      activeConversationId =
        conversation.id;
    }

    // ------------------------------------------------
    // 2. Generate RAG answer
    // ------------------------------------------------

    const result =
      await generateRAGAnswer(
        req.userId,
        question,
        collectionId
      );

    // ------------------------------------------------
    // 3. Save assistant answer
    // ------------------------------------------------

    await addMessage(
      activeConversationId,
      "ASSISTANT",
      result.answer
    );

    // ------------------------------------------------
    // 4. Return response
    // ------------------------------------------------

    res.status(200).json({
      success: true,
      message:
        "Answer generated successfully",
      data: {
        conversationId:
          activeConversationId,
        answer: result.answer,
        sources: result.sources,
      },
    });
  } catch (error) {
    next(error);
  }
};
