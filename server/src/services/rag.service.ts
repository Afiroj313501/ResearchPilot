import {
  searchSimilarChunks,
} from "./vector-search.service";

export interface RAGContext {
  context: string;
  sources: {
    documentId: string;
    pageNumber: number | null;
    chunkIndex: number;
    similarity: number;
    documentTitle: string;
  }[];
}

export const buildRAGContext = async (
  query: string,
  collectionId: string,
  limit = 5
): Promise<RAGContext> => {
  const results = await searchSimilarChunks(
    query,
    collectionId,
    limit
  );

  if (results.length === 0) {
    return {
      context: "",
      sources: [],
    };
  }

  const context = results
    .map((result, index) => {
      return `
SOURCE ${index + 1}
Page: ${result.pageNumber ?? "Unknown"}
Chunk: ${result.chunkIndex}
Similarity: ${Number(
        result.similarity
      ).toFixed(4)}

${result.content}
`;
    })
    .join("\n--------------------\n");

  const sources = results.map((result) => ({
    documentId: result.documentId,
    pageNumber: result.pageNumber,
    chunkIndex: result.chunkIndex,
    similarity: Number(result.similarity),
    documentTitle: result.documentTitle,
  }));

  return {
    context,
    sources,
  };
};
