import { z } from 'zod';

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof projectEnv> {}
    }
}

export const projectEnv = z.object({
  DATABASE_URI: z.string(),
  UPSTASH_REDIS_URI: z.string(),
  JWT_SECRET: z.string(),
  INFURA_PROJECT_ID: z.string(),
});

projectEnv.parse(process.env);