import { GoogleGenAI } from "@google/genai";

import prisma from "../config/database";
import { AppError } from "../utils/app-error";

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

// Set GEMINI_FALLBACK_MODELS to models enabled for the same API key. A model
// can be unavailable independently, so a fallback is more resilient than a
// single fixed endpoint. Do not assume every account has a free allowance.
const GENERATION_MODELS = [
  process.env.GEMINI_MODEL || "gemini-3.6-flash",
  ...(process.env.GEMINI_FALLBACK_MODELS || "gemini-3.5-flash,gemini-3.5-flash-lite")
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean),
].filter((model, index, models) => models.indexOf(model) === index);

const isTransientModelError = (error: unknown): boolean => {
  const status = (error as { status?: number })?.status;
  const message = error instanceof Error ? error.message : String(error);
  return status === 408 || status === 429 || (status !== undefined && status >= 500) ||
    /RESOURCE_EXHAUSTED|UNAVAILABLE|overloaded|timeout|temporarily/i.test(message);
};

const pause = (milliseconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

const generateWithFallback = async (prompt: string): Promise<string> => {
  let lastError: unknown;

  for (const model of GENERATION_MODELS) {
    // One short retry absorbs brief overloads without immediately moving to a
    // lower-cost fallback model.
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const response = await ai.models.generateContent({ model, contents: prompt });
        const answer = response.text?.trim();
        if (!answer) throw new Error("Gemini returned an empty answer");
        return answer;
      } catch (error) {
        lastError = error;
        if (!isTransientModelError(error)) break;
        if (attempt === 0) await pause(700 + Math.floor(Math.random() * 300));
      }
    }
  }

  console.error("All configured Gemini models failed:", lastError);
  throw new AppError(
    "The AI service is temporarily busy. Please try your question again shortly.",
    503
  );
};

export interface RAGAnswer {
  answer: string;
  sources: {
    documentId: string;
    pageNumber: number | null;
    chunkIndex: number;
    similarity: number;
    documentTitle: string;
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

  const answer = await generateWithFallback(prompt);

  return {
    answer,
    sources: rag.sources,
  };
};
