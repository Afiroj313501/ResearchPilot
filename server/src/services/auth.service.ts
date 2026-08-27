import prisma from "../config/database";

import {
  hashPassword,
  comparePassword,
} from "../utils/password";

import { generateToken } from "../utils/jwt";

import { AppError } from "../utils/app-error";

import type {
  RegisterInput,
  LoginInput,
} from "../validations/auth.validation";

export const registerUser = async (
  data: RegisterInput
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new AppError(
      "User with this email already exists",
      409
    );
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash: hashedPassword,
    },
  });

  const token = generateToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export const loginUser = async (
  data: LoginInput
) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const isPasswordValid = await comparePassword(
    data.password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const token = generateToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};