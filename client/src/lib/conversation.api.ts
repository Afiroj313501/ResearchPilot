import api from "./api";
import type { ChatSource } from "./chat.api";

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    messages: number;
  };
}

export interface ConversationMessage {
  id: string;
  conversationId: string;
  role: "USER" | "ASSISTANT" | "SYSTEM";
  content: string;
  createdAt: string;
  sources?: ChatSource[];
}

export const getConversations = async (collectionId?: string) => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: {
      conversations: Conversation[];
    };
  }>("/conversations", { params: collectionId ? { collectionId } : undefined });

  return response.data;
};

export const getConversation = async (
  conversationId: string
) => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: {
      conversation: {
        id: string;
        title: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
        messages: ConversationMessage[];
      };
    };
  }>(`/conversations/${conversationId}`);

  return response.data;
};

export const deleteConversation = async (
  conversationId: string
) => {
  const response = await api.delete<{
    success: boolean;
    message: string;
  }>(`/conversations/${conversationId}`);

  return response.data;
};
