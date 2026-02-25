import { z } from "zod";

export const userSchema = z.object({
    id: z.uuid(),
    name: z.string().nullable().optional(),
    email: z.email(),
    role: z.string(),
    profile_picture: z.string().url().nullable().optional(),
    created_at: z.date(),
});

export const createUserSchema = userSchema.omit({
    created_at: true,
});

export const updateUserSchema = createUserSchema.partial();

export type User = z.infer<typeof userSchema>;
