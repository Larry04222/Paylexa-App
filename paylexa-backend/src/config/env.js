const path = require('path');
const fs = require('fs');

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const [key, ...rest] = trimmed.split('=');
      const value = rest.join('=').trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

const config = {
  app: {
    port: process.env.PORT ? Number(process.env.PORT) : 4000
  },
  auth: {
    accessTokenTtl: Number(process.env.ACCESS_TOKEN_TTL || 900),
    refreshTokenTtl: Number(process.env.REFRESH_TOKEN_TTL || 60 * 60 * 24 * 7),
    jwtSecret: process.env.JWT_SECRET || 'super-secret-key'
  },
  redis: {
    ttl: Number(process.env.REDIS_SESSION_TTL || 60 * 60 * 24 * 7)
  }
};

module.exports = config;
