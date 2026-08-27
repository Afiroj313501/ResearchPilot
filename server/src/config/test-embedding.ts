import dotenv from "dotenv";

dotenv.config();

import { generateEmbedding } from "../utils/embedding.util";

const run = async () => {
  try {
    const text =
      "The Model Context Protocol enables AI models to interact with external tools and resources.";

    console.log("🧠 Generating embedding...");

    const embedding = await generateEmbedding(text);

    console.log("✅ Embedding generated successfully");
    console.log("📐 Dimensions:", embedding.length);

    console.log("\n--- First 10 values ---\n");

    console.log(embedding.slice(0, 10));
  } catch (error) {
    console.error("❌ Embedding generation failed:", error);
  }
};

run();