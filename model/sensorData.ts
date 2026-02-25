import { z } from "zod";

export const sensorDataSchema = z.object({
    id: z.number().int(),
    livestock_id: z.number().int(),
    temperature: z.number().nullable().optional(),
    heart_rate: z.number().int().nullable().optional(),
    sp02: z.number().nullable().optional(),
    timestamp: z.coerce.date(),
    sensor_ear_temperature: z.number().default(0),
    sensor_ambient_temperature: z.number().default(0),
});

export const createSensorDataSchema = sensorDataSchema.omit({
    id: true,
});

export const updateSensorDataSchema = createSensorDataSchema.partial();

export type SensorData = z.infer<typeof sensorDataSchema>;
