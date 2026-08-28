import {
  Response,
  NextFunction,
} from "express";

import type { AuthenticatedRequest } from "../middleware/auth.middleware";

import { AppError } from "../utils/app-error";

import {
  generateRAGAnswer,
} from "../services/answer.service";

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

    const { collectionId, question } = req.body;

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

    const result = await generateRAGAnswer(
      req.userId,
      question,
      collectionId
    );

    res.status(200).json({
      success: true,
      message: "Answer generated successfully",
      data: {
        answer: result.answer,
        sources: result.sources,
      },
    });
  } catch (error) {
    next(error);
  }
};
