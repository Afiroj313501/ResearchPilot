import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .optional(),
  email: z.string().email("Enter a valid email address").optional(),
  currentPassword: z.string().min(8).optional(),
  newPassword: z.string().min(8, "Password must be at least 8 characters").optional(),
}).refine((data) => !data.newPassword || Boolean(data.currentPassword), {
  message: "Current password is required to set a new password",
  path: ["currentPassword"],
});

export type UpdateProfileInput = z.infer<
  typeof updateProfileSchema
>;
