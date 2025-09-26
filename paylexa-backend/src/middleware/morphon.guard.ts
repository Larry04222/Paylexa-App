import { Request, Response, NextFunction } from "express";
import { morphonAi } from "../ai";

export const morphonGuard = (req: Request, res: Response, next: NextFunction) => {
  if (!morphonAi.enabled || req.path.startsWith("/api/health")) {
    return next();
  }

  const risk = morphonAi.evaluateLogin({
    ipReputation: req.headers["x-risk-ip"] ?? 0,
    velocity: req.headers["x-risk-velocity"] ?? 0,
    userAgent: req.headers["user-agent"],
  });

  res.locals.morphonRisk = risk;

  if (risk.level === "high") {
    res.status(423).json({
      status: "locked",
      reason: "Morphon-X detected anomalous activity",
      risk,
    });
    return;
  }

  next();
};
