import {
  Request,
  Response,
  NextFunction,
} from "express";

import { verifyToken } from "../utils/jwt";

export interface AuthenticatedRequest
  extends Request {
  userId?: string;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const token = authHeader.substring(7).trim();

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const payload = verifyToken(token);

    if (!payload?.userId) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });

      return;
    }

    req.userId = payload.userId;

    next();
  } catch (error) {
    console.error(
      "Authentication error:",
      error
    );

    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};