import prisma from "../config/database";
import { generateEmbedding } from "../utils/embedding.util";

export const embedDocumentChunks = async (
  documentId: string
) => {
  const chunks = await prisma.documentChunk.findMany({
    where: {
      documentId,
    },
    orderBy: {
      chunkIndex: "asc",
    },
  });

  if (chunks.length === 0) {
    throw new Error("No chunks found for this document");
  }

  let processed = 0;

  for (const chunk of chunks) {
    const embedding = await generateEmbedding(
      chunk.content
    );

    await prisma.$executeRaw`
      UPDATE "DocumentChunk"
      SET "embedding" = ${JSON.stringify(embedding)}::vector
      WHERE "id" = ${chunk.id}
    `;

    processed++;

    console.log(
      `✅ Embedded chunk ${processed}/${chunks.length}`
    );
  }

  return {
    documentId,
    totalChunks: chunks.length,
    processed,
  };
};