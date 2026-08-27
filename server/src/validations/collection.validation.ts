import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z
    .string()
    .min(2, "Collection name must be at least 2 characters")
    .max(100, "Collection name must not exceed 100 characters")
    .trim(),
});

export const updateCollectionSchema = z.object({
  name: z
    .string()
    .min(2, "Collection name must be at least 2 characters")
    .max(100, "Collection name must not exceed 100 characters")
    .trim(),
});

export type CreateCollectionInput = z.infer<
  typeof createCollectionSchema
>;

export type UpdateCollectionInput = z.infer<
  typeof updateCollectionSchema
>;