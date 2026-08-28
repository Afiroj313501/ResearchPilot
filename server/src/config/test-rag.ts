import dotenv from "dotenv";

dotenv.config();

import prisma from "../config/database";
import { buildRAGContext } from "../services/rag.service";

const collectionId =
  "a8bd965d-4a72-4a70-a304-4fa3934c7de7";

const run = async () => {
  try {
    const query =
      "What are the main security threats associated with the Model Context Protocol?";

    console.log("🧠 Building RAG context...");
    console.log("❓ Query:", query);

    const result = await buildRAGContext(
      query,
      collectionId,
      5
    );

    console.log(
      `\n✅ Retrieved ${result.sources.length} sources`
    );

    console.log("\n--- SOURCES ---\n");

    result.sources.forEach((source, index) => {
      console.log(
        `Source ${index + 1}:`
      );

      console.log(
        `Document: ${source.documentId}`
      );

      console.log(
        `Page: ${source.pageNumber}`
      );

      console.log(
        `Chunk: ${source.chunkIndex}`
      );

      console.log(
        `Similarity: ${source.similarity.toFixed(4)}`
      );

      console.log();
    });

    console.log("\n--- RAG CONTEXT ---\n");

    console.log(result.context);

    await prisma.$disconnect();
  } catch (error) {
    console.error(
      "❌ RAG context failed:",
      error
    );

    await prisma.$disconnect();
    process.exit(1);
  }
};

run();