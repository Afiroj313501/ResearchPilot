import { Request, Response, NextFunction } from "express";
import prisma from "../config/database";
import { AppError } from "../utils/app-error";
import { comparePassword, hashPassword } from "../utils/password";

export const getProfile = async (
  req: Request & { userId?: string },
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
      throw new AppError(
        "User not found",
        404
      );
    }

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request & { userId?: string },
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

    const { name, email, currentPassword, newPassword } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!existingUser) throw new AppError("User not found", 404);
    if (newPassword && !(await comparePassword(currentPassword, existingUser.passwordHash))) {
      throw new AppError("Current password is incorrect", 400);
    }

    if (email && email !== existingUser.email) {
      const emailOwner = await prisma.user.findUnique({ where: { email } });
      if (emailOwner) throw new AppError("That email address is already in use", 409);
    }

    const user = await prisma.user.update({
      where: {
        id: req.userId,
      },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(newPassword && { passwordHash: await hashPassword(newPassword) }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
