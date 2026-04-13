import { z } from "zod";

export const livestockSchema = z.object({
    id: z.number().int(),
    name: z.string().nullable().optional(),
    species: z.string().nullable().optional(),
    breed: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    birth_date: z.coerce.date().nullable().optional(),
    photo_url: z.url().nullable().optional(),
    status: z.string().nullable().optional(),
    height: z.number().nullable().optional(),
    weight: z.number().nullable().optional(),
    body_condition_score: z.number().int().nullable().optional(),
    notes: z.string().nullable().optional(),
    recorded_at: z.coerce.date().nullable().optional(),
    created_at: z.date(),
    updated_at: z.date(),
    user_id: z.uuid().nullable().optional(),
});

export const createLivestockSchema = livestockSchema.omit({
    id: true,
    created_at: true,
    updated_at: true,
});

export const updateLivestockSchema = createLivestockSchema.partial();

export type Livestock = z.infer<typeof livestockSchema>;
