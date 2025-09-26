import type { NextFunction, Request, Response } from 'express';

import { createLogger } from '../utils/logger.js';

const logger = createLogger('error-handler');

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(err.message, { stack: err.stack });

  return res.status(500).json({
    message: 'An unexpected error occurred. The Paylexa guardians are on it.',
  });
};
