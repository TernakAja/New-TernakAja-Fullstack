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

export const livestockResponseSchema = z.object({
  id: z.number(),

  name: z.string().nullable(),
  species: z.string().nullable(),
  breed: z.string().nullable(),
  gender: z.string().nullable(),

  birth_date: z.string().nullable(),

  photo_url: z.string().url().nullable(),

  status: z.string().nullable(),

  height: z.number().nullable(),
  weight: z.number().nullable(),

  body_condition_score: z.number().int().nullable(),

  notes: z.string().nullable(),

  recorded_at: z.string().nullable(),

  created_at: z.string(),
  updated_at: z.string(),

  user_id: z.uuid().nullable(), 
});

export type LivestockResponse = z.infer<typeof livestockResponseSchema>;

export const livestockListResponseSchema = z.array(livestockResponseSchema);

export type LivestockListResponse = z.infer<typeof livestockListResponseSchema>;

export const livestockWithSensorDataSchema = z.object({
  id: z.number(),
  user_id: z.uuid(),
  name: z.string().max(255),
  species: z.string().max(255),
  breed: z.string().max(255),
  gender: z.enum(["male", "female"]),
  birth_date: z.string().date(),
  photo_url: z.url().nullable(),
  status: z.string().max(100),
  height: z.number().positive().nullable(),
  weight: z.number().positive().nullable(),
  body_condition_score: z.number().min(0).max(10).nullable(),
  notes: z.string().max(500).nullable(),
  recorded_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  sensor_id: z.number().nullable(),
  temperature: z.number().positive().nullable(),
  heart_rate: z.number().positive().nullable(),
  sp02: z.number().positive().nullable(),
  timestamp: z.string().nullable(),
});

export type LivestockWithSensorData = z.infer<typeof livestockWithSensorDataSchema>;

export const livestockWithSensorDataListSchema = z.array(livestockWithSensorDataSchema);

export type LivestockWithSensorDataList = z.infer<typeof livestockWithSensorDataListSchema>;


