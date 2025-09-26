const LEVELS = ['debug', 'info', 'warn', 'error'] as const;

type Level = (typeof LEVELS)[number];

type Logger = {
  debug: (message: string, meta?: Record<string, unknown>) => void;
  info: (message: string, meta?: Record<string, unknown>) => void;
  warn: (message: string, meta?: Record<string, unknown>) => void;
  error: (message: string, meta?: Record<string, unknown>) => void;
};

const shouldLog = (level: Level) => {
  const envLevel = (process.env.LOG_LEVEL ?? 'info') as Level;
  const levelWeight = LEVELS.indexOf(level);
  const envWeight = LEVELS.indexOf(envLevel);

  return levelWeight >= envWeight;
};

export const createLogger = (namespace: string): Logger => ({
  debug: (message, meta) => {
    if (shouldLog('debug')) {
      console.debug(`[${namespace}] ${message}`, meta ?? '');
    }
  },
  info: (message, meta) => {
    if (shouldLog('info')) {
      console.info(`[${namespace}] ${message}`, meta ?? '');
    }
  },
  warn: (message, meta) => {
    if (shouldLog('warn')) {
      console.warn(`[${namespace}] ${message}`, meta ?? '');
    }
  },
  error: (message, meta) => {
    if (shouldLog('error')) {
      console.error(`[${namespace}] ${message}`, meta ?? '');
    }
  },
});
