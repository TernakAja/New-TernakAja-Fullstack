import { z } from "zod";

export const deviceSchema = z.object({
    livestock_id: z.number().int(),
    device_id: z.number().int(),
    last_update: z.coerce.date().nullable().optional(),
});

export const createDeviceSchema = deviceSchema;
export const updateDeviceSchema = deviceSchema.partial();

export type Device = z.infer<typeof deviceSchema>;
