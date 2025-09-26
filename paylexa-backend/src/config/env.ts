export type AppConfig = {
  env: string;
  port: number;
  databaseUrl: string;
  redisUrl: string;
  jwtSecret: string;
  morphonEnabled: boolean;
};

const ensure = (value: string | undefined, key: string) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

export const loadConfig = (): AppConfig => ({
  env: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: ensure(process.env.DATABASE_URL, 'DATABASE_URL'),
  redisUrl: ensure(process.env.REDIS_URL, 'REDIS_URL'),
  jwtSecret: ensure(process.env.JWT_SECRET, 'JWT_SECRET'),
  morphonEnabled: (process.env.MORPHON_X_ENABLED ?? 'false').toLowerCase() === 'true',
});
