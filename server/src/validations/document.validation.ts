import { z } from "zod";

export const createDocumentSchema = z.object({
  collectionId: z
    .string()
    .uuid("Invalid collection ID"),
});

export type CreateDocumentInput = z.infer<
  typeof createDocumentSchema
>;