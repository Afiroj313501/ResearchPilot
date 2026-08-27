import { Request, Response, NextFunction } from "express";
import prisma from "../config/database";

import {
  registerUser,
  loginUser,
} from "../services/auth.service";

import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validation";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);

    const result = await registerUser(data);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);

    const result = await loginUser(data);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};