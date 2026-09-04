import path from "path";

import prisma from "../config/database";
import { AppError } from "../utils/app-error";
import { removePdf, storePdf } from "./storage.service";

export const createDocument = async (
  userId: string,
  collectionId: string,
  file: Express.Multer.File
) => {
  if (!file.buffer?.length) {
    throw new AppError("PDF file is required", 400);
  }

  const collection = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      userId,
    },
  });

  if (!collection) {
    throw new AppError("Collection not found", 404);
  }

  const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
  const objectPath = `${userId}/${collectionId}/${uniqueName}`;
  const fileUrl = await storePdf(file.buffer, objectPath);

  const document = await prisma.document.create({
    data: {
      collectionId,
      title: file.originalname.replace(/\.pdf$/i, ""),
      originalName: file.originalname,
      fileUrl,
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

export const deleteDocument = async (
  userId: string,
  documentId: string
) => {
  const document = await prisma.document.findFirst({
    where: { id: documentId, collection: { userId } },
  });

  if (!document) throw new AppError("Document not found", 404);

  await prisma.document.delete({ where: { id: documentId } });
  if (document.fileUrl) await removePdf(document.fileUrl);
};

export const updateDocumentTitle = async (
  userId: string,
  documentId: string,
  title: string
) => {
  const document = await prisma.document.findFirst({
    where: { id: documentId, collection: { userId } },
  });
  if (!document) throw new AppError("Document not found", 404);
  return prisma.document.update({ where: { id: documentId }, data: { title } });
};

export const getDocumentForUser = async (userId: string, documentId: string) => {
  const document = await prisma.document.findFirst({ where: { id: documentId, collection: { userId } } });
  if (!document) throw new AppError("Document not found", 404);
  return document;
};
