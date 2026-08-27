export interface TextChunk {
  content: string;
  pageNumber: number;
  chunkIndex: number;
}

interface ChunkOptions {
  chunkSize?: number;
  overlap?: number;
}

/**
 * Split page-aware PDF text into overlapping chunks.
 *
 * Default:
 * - 1000 characters per chunk
 * - 200 characters overlap
 */
export const createChunks = (
  pages: {
    pageNumber: number;
    text: string;
  }[],
  options: ChunkOptions = {}
): TextChunk[] => {
  const chunkSize = options.chunkSize ?? 1000;
  const overlap = options.overlap ?? 200;

  if (overlap >= chunkSize) {
    throw new Error(
      "Chunk overlap must be smaller than chunk size"
    );
  }

  const chunks: TextChunk[] = [];

  let chunkIndex = 0;

  for (const page of pages) {
    const text = page.text.trim();

    if (!text) {
      continue;
    }

    let start = 0;

    while (start < text.length) {
      const end = Math.min(
        start + chunkSize,
        text.length
      );

      const content = text
        .slice(start, end)
        .trim();

      if (content.length > 0) {
        chunks.push({
          content,
          pageNumber: page.pageNumber,
          chunkIndex,
        });

        chunkIndex++;
      }

      if (end >= text.length) {
        break;
      }

      start = end - overlap;
    }
  }

  return chunks;
};

