import prisma from "../config/database";
import { generateEmbedding } from "../utils/embedding.util";

export interface SimilarChunk {
  id: string;
  documentId: string;
  content: string;
  pageNumber: number | null;
  chunkIndex: number;
  similarity: number;
}

export const searchSimilarChunks = async (
  query: string,
  collectionId: string,
  limit = 5
): Promise<SimilarChunk[]> => {
  if (!query.trim()) {
    throw new Error("Search query cannot be empty");
  }

  const queryEmbedding = await generateEmbedding(query);

  const vector = `[${queryEmbedding.join(",")}]`;

  const results = await prisma.$queryRaw<SimilarChunk[]>`
    SELECT
      dc."id",
      dc."documentId",
      dc."content",
      dc."pageNumber",
      dc."chunkIndex",
      1 - (dc."embedding" <=> ${vector}::vector) AS "similarity"
    FROM "DocumentChunk" dc
    INNER JOIN "Document" d
      ON d."id" = dc."documentId"
    WHERE d."collectionId" = ${collectionId}
      AND dc."embedding" IS NOT NULL
    ORDER BY dc."embedding" <=> ${vector}::vector
    LIMIT ${limit}
  `;

  return results;
};