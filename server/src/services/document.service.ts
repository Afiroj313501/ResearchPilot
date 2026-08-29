import fs from "fs/promises";

import prisma from "../config/database";
import { AppError } from "../utils/app-error";

export const createDocument = async (
  userId: string,
  collectionId: string,
  file: Express.Multer.File
) => {
  // Verify that the collection belongs to the authenticated user
  const collection = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      userId,
    },
  });

  // If collection doesn't exist or doesn't belong to user,
  // remove the uploaded file and reject the request.
  if (!collection) {
    await fs.unlink(file.path).catch(() => {});

    throw new AppError(
      "Collection not found",
      404
    );
  }

  // Create document metadata in PostgreSQL
  const document = await prisma.document.create({
    data: {
      collectionId,
      title: file.originalname.replace(/\.pdf$/i, ""),
      originalName: file.originalname,
      fileUrl: file.path,
      mimeType: file.mimetype,
      fileSize: file.size,
      status: "PENDING",
    },
  });

  return document;
};

export const getCollectionDocuments = async (
  userId: string,
  collectionId: string
) => {
  const collection = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      userId,
    },
  });

  if (!collection) {
    throw new AppError("Collection not found", 404);
  }

  return prisma.document.findMany({
    where: {
      collectionId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};