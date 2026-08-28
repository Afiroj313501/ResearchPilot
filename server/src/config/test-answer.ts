import dotenv from "dotenv";

dotenv.config();

import prisma from "../config/database";

import {
  generateRAGAnswer,
} from "../services/answer.service";

const userId =
  "f69faa72-cbfe-41a3-af8a-afcd768374f9";

const collectionId =
  "a8bd965d-4a72-4a70-a304-4fa3934c7de7";

const run = async () => {
  try {
    const question =
      "What are the main security threats associated with the Model Context Protocol?";

    console.log(
      "🤖 Generating RAG answer..."
    );

    console.log(
      "❓ Question:",
      question
    );

    const result =
      await generateRAGAnswer(
        userId,
        question,
        collectionId
      );

    console.log(
      "\n--- ANSWER ---\n"
    );

    console.log(result.answer);

    console.log(
      "\n--- SOURCES ---\n"
    );

    result.sources.forEach(
      (source, index) => {
        console.log(
          `Source ${index + 1}`
        );

        console.log(
          `📑 Page: ${source.pageNumber}`
        );

        console.log(
          `🧩 Chunk: ${source.chunkIndex}`
        );

        console.log(
          `🎯 Similarity: ${source.similarity.toFixed(
            4
          )}`
        );

        console.log();
      }
    );
  } catch (error) {
    console.error(
      "❌ RAG answer generation failed:",
      error
    );

    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

run();