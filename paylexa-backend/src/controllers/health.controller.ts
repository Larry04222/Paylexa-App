import { Request, Response } from "express";

export const healthController = {
  getStatus: (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "paylexa-backend",
    });
  },
};
