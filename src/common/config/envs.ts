import { z } from 'zod';
import * as process from 'process';

export const envSchema = z.object({
    NODE_ENV            : z.enum(['development', 'production', 'test']).default('development'),
    PORT                : z.coerce.number().default(3000),
    CLERK_SECRET_KEY    : z.string().min(1),
    DATABASE_URL        : z.string().url(),
});

export const ENVS = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
