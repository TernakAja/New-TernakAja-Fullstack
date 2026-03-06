import { z } from "zod";

/**
 * Zod schema for the POST /api/livestock request body.
 *
 * - `user_id` is intentionally excluded — it comes from the auth session.
 * - Required fields match the original Express handler's validation.
 * - `birth_date` accepts an ISO date string (e.g. "2024-01-15").
 */
export const createLivestockInputSchema = z.object({
  device_id: z
    .number({ error: "device_id is required and must be a number" })
    .int({ error: "device_id must be an integer" })
    .positive({ error: "device_id must be positive" }),

  name: z
    .string({ error: "name is required" })
    .min(1, { error: "name cannot be empty" }),

  species: z
    .string({ error: "species is required" })
    .min(1, { error: "species cannot be empty" }),

  breed: z
    .string({ error: "breed is required" })
    .min(1, { error: "breed cannot be empty" }),

  gender: z
    .string({ error: "gender is required" })
    .min(1, { error: "gender cannot be empty" }),

  birth_date: z
    .string({ error: "birth_date is required" })
    .date({ error: "birth_date must be a valid date (YYYY-MM-DD)" }),

  status: z
    .string({ error: "status is required" })
    .min(1, { error: "status cannot be empty" }),

  height: z
    .number({ error: "height is required and must be a number" })
    .positive({ error: "height must be positive" }),

  weight: z
    .number({ error: "weight is required and must be a number" })
    .positive({ error: "weight must be positive" }),

  body_condition_score: z
    .number({ error: "body_condition_score is required and must be a number" })
    .int({ error: "body_condition_score must be an integer" })
    .min(1, { error: "body_condition_score must be between 1 and 5" })
    .max(5, { error: "body_condition_score must be between 1 and 5" }),

  photo_url: z.string().url({ error: "photo_url must be a valid URL" }).optional(),

  notes: z.string().optional(),

  recorded_at: z
    .string()
    .datetime({ error: "recorded_at must be a valid ISO 8601 datetime" })
    .optional(),
});

export type CreateLivestockInput = z.infer<typeof createLivestockInputSchema>;
