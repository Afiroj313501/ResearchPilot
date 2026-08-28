import dotenv from "dotenv";

dotenv.config();

import prisma from "../config/database";
import { processDocument } from "../services/document-processing.service";

const documentId =
  "45dc960c-1062-4d89-a6d8-d9831b63751b";

const run = async () => {
  try {
    console.log("🚀 Starting document processing...\n");

    const document = await processDocument(
      documentId
    );

    console.log("\n✅ Document processing completed!");

    console.log("📄 Document ID:", document.id);
    console.log("📑 Status:", document.status);
    console.log("📄 Pages:", document.pageCount);

    const chunkCount =
      await prisma.documentChunk.count({
        where: {
          documentId,
        },
      });

    console.log("🧩 Chunks:", chunkCount);

    await prisma.$disconnect();
  } catch (error) {
    console.error(
      "\n❌ Document processing failed:",
      error
    );

    await prisma.$disconnect();
    process.exit(1);
  }
};

run();