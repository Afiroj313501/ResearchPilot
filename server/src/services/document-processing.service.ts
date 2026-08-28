import fs from "fs/promises";

import prisma from "../config/database";
import { extractPdfText } from "../utils/pdf.util";
import { createChunks } from "../utils/chunk.util";
import { embedDocumentChunks } from "./embedding.service";

export const processDocument = async (
  documentId: string
) => {
  const document = await prisma.document.findUnique({
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
    // Mark document as processing
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

    // Create chunks
    const chunks = createChunks(pdf.pages, {
      chunkSize: 1000,
      overlap: 200,
    });

    console.log(
      `✂️ Created ${chunks.length} chunks`
    );

    // Store chunks in database
    await prisma.documentChunk.deleteMany({
      where: {
        documentId,
      },
    });

    await prisma.documentChunk.createMany({
      data: chunks.map((chunk) => ({
        documentId,
        content: chunk.content,
        pageNumber: chunk.pageNumber,
        chunkIndex: chunk.chunkIndex,
      })),
    });

    console.log("💾 Chunks saved to database");

    // Update page count
    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        pageCount: pdf.pageCount,
      },
    });

    // Generate embeddings
    console.log("🧠 Generating embeddings...");

    const embeddingResult =
      await embedDocumentChunks(documentId);

    console.log(
      `✅ Generated ${embeddingResult.processed} embeddings`
    );

    // Mark document ready
    const updatedDocument =
      await prisma.document.update({
        where: {
          id: documentId,
        },
        data: {
          status: "READY",
        },
      });

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