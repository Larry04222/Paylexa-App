import type { Request, Response } from 'express';

import { morphonClient } from '../ai/morphonClient.js';

export const getHealthStatus = (_req: Request, res: Response) => {
  return res.json({
    service: 'paylexa-backend',
    status: 'ok',
    morphon: morphonClient.health(),
    timestamp: new Date().toISOString(),
  });
};
