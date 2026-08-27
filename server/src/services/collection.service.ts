import prisma from "../config/database";
import { AppError } from "../utils/app-error";
import type {
  CreateCollectionInput,
  UpdateCollectionInput,
} from "../validations/collection.validation";

export const createCollection = async (
  userId: string,
  data: CreateCollectionInput
) => {
  const collection = await prisma.collection.create({
    data: {
      name: data.name,
      userId,
    },
  });

  return collection;
};

export const getUserCollections = async (
  userId: string
) => {
  return prisma.collection.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getCollectionById = async (
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
    throw new AppError(
      "Collection not found",
      404
    );
  }

  return collection;
};

export const updateCollection = async (
  userId: string,
  collectionId: string,
  data: UpdateCollectionInput
) => {
  const collection = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      userId,
    },
  });

  if (!collection) {
    throw new AppError(
      "Collection not found",
      404
    );
  }

  return prisma.collection.update({
    where: {
      id: collectionId,
    },
    data: {
      name: data.name,
    },
  });
};

export const deleteCollection = async (
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
    throw new AppError(
      "Collection not found",
      404
    );
  }

  await prisma.collection.delete({
    where: {
      id: collectionId,
    },
  });
};