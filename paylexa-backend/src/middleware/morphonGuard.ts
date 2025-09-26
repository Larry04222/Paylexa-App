import type { Application, Request, Response, NextFunction } from 'express';

import { morphonClient } from '../ai/morphonClient.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('morphon-guard');

export const registerMorphonGuards = (app: Application) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const enableMorphon = process.env.MORPHON_X_ENABLED?.toLowerCase() === 'true';

    if (!enableMorphon) {
      return next();
    }

    morphonClient.captureRequestFingerprint({
      ip: req.ip,
      path: req.originalUrl,
      method: req.method,
      userAgent: req.get('user-agent') ?? 'unknown',
    });

    logger.debug(`Morphon-X guard evaluated request ${req.method} ${req.originalUrl}`);

    return next();
  });
};
