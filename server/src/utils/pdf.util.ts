import { PDFParse } from "pdf-parse";

export interface ExtractedPage {
  pageNumber: number;
  text: string;
}

export interface ExtractedPdf {
  text: string;
  pageCount: number;
  pages: ExtractedPage[];
}

export const extractPdfText = async (
  fileBuffer: Buffer
): Promise<ExtractedPdf> => {
  const parser = new PDFParse({
    data: fileBuffer,
  });

  try {
    const result = await parser.getText();

    const pages: ExtractedPage[] = result.pages.map(
      (page, index) => ({
        pageNumber: index + 1,
        text: page.text.trim(),
      })
    );

    return {
      text: result.text,
      pageCount: pages.length,
      pages,
    };
  } finally {
    await parser.destroy();
  }
};