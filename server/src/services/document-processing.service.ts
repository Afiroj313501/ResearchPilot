import prisma from "../config/database";

import { extractPdfText } from "../utils/pdf.util";

import { createChunks } from "../utils/chunk.util";

import { embedDocumentChunks } from "./embedding.service";

export const processDocument = async (
  documentId: string
) => {
  const document =
    await prisma.document.findUnique({
      where: {
        id: documentId,
      },
    });

  if (!document) {
    throw new Error("Document not found");
  }

  if (!document.fileUrl) {
    throw new Error("Document file not found");
  }

  try {
    /**
     * Mark document as processing.
     */
    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        status: "PROCESSING",
      },
    });

    console.log("📄 Extracting PDF text...");

    const pdf = await extractPdfText(
      document.fileUrl
    );

    console.log(
      `✅ Extracted ${pdf.pageCount} pages`
    );

    /**
     * Create chunks.
     */
    const chunks = createChunks(pdf.pages, {
      chunkSize: 1000,
      overlap: 200,
    });

    console.log(
      `✂️ Created ${chunks.length} chunks`
    );

    /**
     * Check whether chunks already exist.
     *
     * If processing is being resumed after a failure,
     * don't recreate/delete existing chunks.
     */
    const existingChunkCount =
      await prisma.documentChunk.count({
        where: {
          documentId,
        },
      });

    if (existingChunkCount === 0) {
      console.log(
        "💾 Saving chunks to database..."
      );

      await prisma.documentChunk.createMany({
        data: chunks.map((chunk) => ({
          documentId,
          content: chunk.content,
          pageNumber: chunk.pageNumber,
          chunkIndex: chunk.chunkIndex,
        })),
      });

      console.log(
        `💾 Saved ${chunks.length} chunks`
      );
    } else {
      console.log(
        `♻️ Found ${existingChunkCount} existing chunks. Resuming processing...`
      );
    }

    /**
     * Update page count.
     */
    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        pageCount: pdf.pageCount,
      },
    });

    /**
     * Generate missing embeddings.
     */
    console.log(
      "🧠 Generating missing embeddings..."
    );

    const embeddingResult =
      await embedDocumentChunks(documentId);

    console.log(
      `✅ Embedding process finished`
    );

    console.log(
      `📊 Total chunks: ${embeddingResult.totalChunks}`
    );

    console.log(
      `📊 Newly embedded: ${embeddingResult.processed}`
    );

    console.log(
      `📊 Remaining: ${embeddingResult.remaining}`
    );

    /**
     * Only mark READY if every chunk has
     * an embedding.
     */
    if (embeddingResult.remaining > 0) {
      throw new Error(
        `Document still has ${embeddingResult.remaining} chunks without embeddings`
      );
    }

    const updatedDocument =
      await prisma.document.update({
        where: {
          id: documentId,
        },
        data: {
          status: "READY",
        },
      });

    console.log(
      `🎉 Document ${documentId} is READY`
    );

    return updatedDocument;
  } catch (error) {
    console.error(
      "❌ Document processing failed:",
      error
    );

    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        status: "FAILED",
      },
    });

    throw error;
  }
};
