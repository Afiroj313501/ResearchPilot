import dotenv from "dotenv";

dotenv.config();

import prisma from "../config/database";
import { searchSimilarChunks } from "../services/vector-search.service";

const collectionId =
  "a8bd965d-4a72-4a70-a304-4fa3934c7de7";

const run = async () => {
  try {
    const query =
      "What are the main security threats associated with the Model Context Protocol?";

    console.log("🔎 Searching...");
    console.log("❓ Query:", query);

    const results = await searchSimilarChunks(
      query,
      collectionId,
      5
    );

    console.log(
      `\n✅ Found ${results.length} relevant chunks\n`
    );

    results.forEach((result, index) => {
      console.log(
        `--- Result ${index + 1} ---`
      );

      console.log(
        "📄 Document:",
        result.documentId
      );

      console.log(
        "📑 Page:",
        result.pageNumber
      );

      console.log(
        "🧩 Chunk:",
        result.chunkIndex
      );

      console.log(
        "🎯 Similarity:",
        Number(result.similarity).toFixed(4)
      );

      console.log(
        "📝 Content:",
        result.content.substring(0, 300)
      );

      console.log();
    });

    await prisma.$disconnect();
  } catch (error) {
    console.error(
      "❌ Vector search failed:",
      error
    );

    await prisma.$disconnect();
    process.exit(1);
  }
};

run();