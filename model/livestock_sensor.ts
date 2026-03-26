import { z } from "zod";

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
