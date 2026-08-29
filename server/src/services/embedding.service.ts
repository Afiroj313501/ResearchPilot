import prisma from "../config/database";
import { generateEmbedding } from "../utils/embedding.util";

const DELAY_BETWEEN_REQUESTS = 700;
const MAX_RETRIES = 6;

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const isRateLimitError = (error: unknown): boolean => {
  if (!error || typeof error !== "object") {
    return false;
  }

  const err = error as {
    status?: number;
    message?: string;
  };

  return (
    err.status === 429 ||
    err.message?.includes("429") === true ||
    err.message?.includes("RESOURCE_EXHAUSTED") === true
  );
};

export const embedDocumentChunks = async (
  documentId: string
) => {
  /**
   * Only select chunks that do NOT already have
   * an embedding.
   *
   * This makes processing resumable.
   */
  const chunks = await prisma.$queryRaw<
    {
      id: string;
      content: string;
      chunkIndex: number;
    }[]
  >`
    SELECT
      "id",
      "content",
      "chunkIndex"
    FROM "DocumentChunk"
    WHERE "documentId" = ${documentId}
      AND "embedding" IS NULL
    ORDER BY "chunkIndex" ASC
  `;

  /**
   * Count total chunks separately.
   */
  const totalResult = await prisma.$queryRaw<
    { count: bigint }[]
  >`
    SELECT COUNT(*) as count
    FROM "DocumentChunk"
    WHERE "documentId" = ${documentId}
  `;

  const totalChunks = Number(totalResult[0]?.count ?? 0);

  /**
   * If everything is already embedded,
   * processing is already complete.
   */
  if (chunks.length === 0) {
    console.log(
      `✅ All ${totalChunks} chunks already have embeddings`
    );

    return {
      documentId,
      totalChunks,
      processed: 0,
      remaining: 0,
    };
  }

  console.log(
    `🧠 ${chunks.length} chunks require embeddings`
  );

  let processed = 0;

  for (const chunk of chunks) {
    let success = false;
    let attempts = 0;

    while (!success) {
      attempts++;

      try {
        const embedding = await generateEmbedding(
          chunk.content
        );

        await prisma.$executeRaw`
          UPDATE "DocumentChunk"
          SET "embedding" = ${JSON.stringify(
            embedding
          )}::vector
          WHERE "id" = ${chunk.id}
        `;

        processed++;
        success = true;

        console.log(
          `✅ Embedded ${processed}/${chunks.length} remaining chunks`
        );

        /**
         * Keep requests below the Gemini free-tier
         * requests-per-minute limit.
         */
        if (processed < chunks.length) {
          await sleep(DELAY_BETWEEN_REQUESTS);
        }
      } catch (error) {
        if (!isRateLimitError(error)) {
          throw error;
        }

        if (attempts >= MAX_RETRIES) {
          console.error(
            `❌ Maximum retries reached for chunk ${chunk.chunkIndex}`
          );

          throw error;
        }

        /**
         * Exponential backoff:
         *
         * Attempt 1 → 5 sec
         * Attempt 2 → 10 sec
         * Attempt 3 → 20 sec
         * Attempt 4 → 40 sec
         * Attempt 5 → 60 sec
         */
        const retryDelay = Math.min(
          5000 * Math.pow(2, attempts - 1),
          60000
        );

        console.warn(
          `⚠️ Gemini rate limit reached. ` +
            `Retry ${attempts}/${MAX_RETRIES} ` +
            `in ${retryDelay / 1000}s...`
        );

        await sleep(retryDelay);
      }
    }
  }

  /**
   * Check how many embeddings now exist.
   */
  const remainingResult = await prisma.$queryRaw<
    { count: bigint }[]
  >`
    SELECT COUNT(*) as count
    FROM "DocumentChunk"
    WHERE "documentId" = ${documentId}
      AND "embedding" IS NULL
  `;

  const remaining = Number(
    remainingResult[0]?.count ?? 0
  );

  return {
    documentId,
    totalChunks,
    processed,
    remaining,
  };
};