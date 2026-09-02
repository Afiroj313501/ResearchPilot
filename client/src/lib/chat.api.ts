import api from "./api";

export interface ChatSource {
  documentId: string;
  pageNumber: number | null;
  chunkIndex: number;
  similarity: number;
  documentTitle: string;
}

export interface ChatResponse {
  success: boolean;
  message: string;
  data: {
    conversationId: string;
    answer: string;
    sources: ChatSource[];
  };
}

export const askQuestion = async (
  collectionId: string,
  question: string,
  conversationId?: string
): Promise<ChatResponse> => {
  const response = await api.post<ChatResponse>(
    "/chat",
    {
      collectionId,
      question,
      ...(conversationId
        ? { conversationId }
        : {}),
    }
  );

  return response.data;
};
