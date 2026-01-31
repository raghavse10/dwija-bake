import { z } from "zod";

export const ConfigValidationSchema = z.object({
  NODE_ENV: z.string().optional().default("development"),
  API_PORT: z.coerce.number().default(3001),
  CORS_ORIGIN: z.string().url().optional().default("http://localhost:3000"),
  DATABASE_URL: z.string().url(),
});

export type ConfigSchema = z.infer<typeof ConfigValidationSchema>;
