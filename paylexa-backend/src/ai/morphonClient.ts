import { createLogger } from '../utils/logger.js';

const logger = createLogger('morphon');

type RequestFingerprint = {
  ip: string;
  path: string;
  method: string;
  userAgent: string;
};

type MorphonClient = {
  captureRequestFingerprint: (fingerprint: RequestFingerprint) => void;
  health: () => { status: 'online' | 'offline' };
};

const morphonEnabled = process.env.MORPHON_X_ENABLED?.toLowerCase() === 'true';

export const morphonClient: MorphonClient = {
  captureRequestFingerprint: (fingerprint) => {
    if (!morphonEnabled) {
      return;
    }

    logger.info(`Morphon-X fingerprint captured`, fingerprint);
  },
  health: () => ({
    status: morphonEnabled ? 'online' : 'offline',
  }),
};
