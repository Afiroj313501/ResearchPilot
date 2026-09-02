import prisma from "../config/database";
import { AppError } from "../utils/app-error";

const generateConversationTitle = (
  question: string
): string => {
  const cleaned = question
    .trim()
    .replace(/\s+/g, " ");

  // Remove common question prefixes
  const withoutPrefix = cleaned.replace(
    /^(what|why|how|when|where|who|can you|could you|please|explain|tell me)\s+/i,
    ""
  );

  // Keep the title short and readable
  const title =
    withoutPrefix.charAt(0).toUpperCase() +
    withoutPrefix.slice(1);

  return title.length > 80
    ? `${title.slice(0, 77)}...`
    : title;
};

export const createConversation = async (
  userId: string,
  collectionId: string,
  firstQuestion: string
) => {
  // Make sure the collection belongs to the user
  const collection =
    await prisma.collection.findFirst({
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

  const cleanedQuestion =
    firstQuestion
      .trim()
      .replace(/\s+/g, " ");

  const title =
    cleanedQuestion.length > 60
      ? `${cleanedQuestion.slice(0, 57)}...`
      : cleanedQuestion;

  const conversation =
    await prisma.conversation.create({
      data: {
        userId,
        collectionId,
        title,
        messages: {
          create: {
            role: "USER",
            content: cleanedQuestion,
          },
        },
      },
      include: {
        messages: true,
      },
    });

  return conversation;
};

export const getConversationForUser =
  async (
    conversationId: string,
    userId: string
  ) => {
    const conversation =
      await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId,
        },
      });

    if (!conversation) {
      throw new AppError(
        "Conversation not found",
        404
      );
    }

    return conversation;
  };

export const addMessage = async (
  conversationId: string,
  role:
    | "USER"
    | "ASSISTANT"
    | "SYSTEM",
  content: string
) => {
  return prisma.message.create({
    data: {
      conversationId,
      role,
      content,
    },
  });
};

export const getConversationMessages =
  async (
    conversationId: string,
    userId: string
  ) => {
    const conversation =
      await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId,
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

    if (!conversation) {
      throw new AppError(
        "Conversation not found",
        404
      );
    }

    return conversation;
  };

export const getUserConversations = async (
  userId: string,
  collectionId?: string
) => {
  // Conversations are scoped to a collection when a collection ID is supplied.
  return prisma.conversation.findMany({
    where: {
      userId,
      ...(collectionId ? { collectionId } : {}),
    },
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });
};

export const deleteConversationForUser = async (
  conversationId: string,
  userId: string
) => {
  const conversation =
    await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId,
      },
    });

  if (!conversation) {
    throw new AppError(
      "Conversation not found",
      404
    );
  }

  await prisma.conversation.delete({
    where: {
      id: conversationId,
    },
  });

  return true;
};
