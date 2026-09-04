import fs from "fs/promises";
import { extractPdfText } from "../utils/pdf.util";
import { createChunks } from "../utils/chunk.util";

const filePath =
  "D:\\ResearchPilot\\server\\uploads\\1787867257586-816619028.pdf";

const run = async () => {
  try {
    // Step 1: Extract PDF text
    const fileBuffer = await fs.readFile(filePath);
    const result = await extractPdfText(fileBuffer);

    console.log(
      "✅ PDF extraction successful"
    );

    console.log(
      "📄 Pages:",
      result.pageCount
    );

    console.log(
      "📝 Characters:",
      result.text.length
    );

    // Step 2: Show first 1000 characters
    console.log(
      "\n--- First 1000 characters ---\n"
    );

    console.log(
      result.text.substring(0, 1000)
    );

    // Step 3: Show page information
    console.log(
      "\n--- Page information ---\n"
    );

    result.pages
      .slice(0, 3)
      .forEach((page) => {
        console.log(
          `Page ${page.pageNumber}: ${page.text.length} characters`
        );
      });

    // Step 4: Create chunks
    const chunks = createChunks(
      result.pages,
      {
        chunkSize: 1000,
        overlap: 200,
      }
    );

    // Step 5: Show chunk information
    console.log(
      "\n--- Chunk information ---\n"
    );

    console.log(
      "🔹 Total chunks:",
      chunks.length
    );

    chunks.slice(0, 5).forEach((chunk) => {
      console.log(
        `\nChunk ${chunk.chunkIndex}`
      );

      console.log(
        `Page: ${chunk.pageNumber}`
      );

      console.log(
        `Characters: ${chunk.content.length}`
      );

      console.log(
        `Preview: ${chunk.content.substring(0, 150)}...`
      );
    });
  } catch (error) {
    console.error(
      "❌ PDF processing failed:",
      error
    );
  }
};

run();
