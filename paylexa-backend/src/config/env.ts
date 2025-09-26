import "dotenv/config";

const getEnv = (key: string, fallback?: string) => {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const getBoolean = (key: string, fallback = "false") => {
  return getEnv(key, fallback).toLowerCase() === "true";
};

export const envConfig = {
  nodeEnv: getEnv("NODE_ENV", "development"),
  port: Number.parseInt(getEnv("PORT", "4000"), 10),
  databaseUrl: getEnv("DATABASE_URL"),
  redisUrl: getEnv("REDIS_URL"),
  jwtSecret: getEnv("JWT_SECRET"),
  twoFaEmailFrom: getEnv("TWOFA_EMAIL_FROM"),
  smtpHost: getEnv("SMTP_HOST"),
  smtpUser: getEnv("SMTP_USER"),
  smtpPass: getEnv("SMTP_PASS"),
  morphonAiEnabled: getBoolean("MORPHON_AI_ENABLED", "true"),
  morphonAlertWebhook: getEnv("MORPHON_ALERT_WEBHOOK", ""),
  fileCdnBaseUrl: getEnv("FILE_CDN_BASE_URL", ""),
  cardIssuerApiKey: getEnv("CARD_ISSUER_API_KEY", ""),
  topupAggregatorKey: getEnv("TOPUP_AGGREGATOR_KEY", ""),
};
