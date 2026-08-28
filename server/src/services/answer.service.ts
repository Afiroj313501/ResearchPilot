import { GoogleGenAI } from "@google/genai";

import prisma from "../config/database";

import {
  buildRAGContext,
} from "./rag.service";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is not configured"
  );
}

const ai = new GoogleGenAI({
  apiKey,
});

const GENERATION_MODEL = "gemini-3.6-flash";

export interface RAGAnswer {
  answer: string;
  sources: {
    documentId: string;
    pageNumber: number | null;
    chunkIndex: number;
    similarity: number;
  }[];
}

export const generateRAGAnswer = async (
  userId: string,
  query: string,
  collectionId: string
): Promise<RAGAnswer> => {
  if (!query.trim()) {
    throw new Error(
      "Question cannot be empty"
    );
  }

  // Verify that the collection belongs
  // to the authenticated user.
  const collection =
    await prisma.collection.findFirst({
      where: {
        id: collectionId,
        userId,
      },
    });

  if (!collection) {
    throw new Error(
      "Collection not found"
    );
  }

  const rag = await buildRAGContext(
    query,
    collectionId,
    5
  );

  if (!rag.context) {
    return {
      answer:
        "I could not find relevant information in the uploaded documents.",
      sources: [],
    };
  }

  const prompt = `
You are ResearchPilot, an AI research assistant.

Answer the user's question using ONLY the
provided research context.

IMPORTANT RULES:

1. Do not use outside knowledge.
2. Do not invent facts.
3. If the context does not contain enough
   information to answer the question, say so.
4. Give a clear and concise answer.
5. When making a claim, mention the relevant
   page number when possible.
6. Do not mention that you are using a RAG system.
7. Do not make up citations.

USER QUESTION:
${query}

RESEARCH CONTEXT:
${rag.context}

Now provide the best possible answer based
strictly on the research context.
`;

  const response =
    await ai.models.generateContent({
      model: GENERATION_MODEL,
      contents: prompt,
    });

  const answer =
    response.text?.trim();

  if (!answer) {
    throw new Error(
      "Gemini returned an empty answer"
    );
  }

  return {
    answer,
    sources: rag.sources,
  };
};