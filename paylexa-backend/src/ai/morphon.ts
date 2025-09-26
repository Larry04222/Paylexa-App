import { envConfig } from "../config/env";

export type RiskLevel = "low" | "medium" | "high";

export interface RiskSignal {
  feature: string;
  score: number;
  level: RiskLevel;
  metadata?: Record<string, unknown>;
}

const scoreToLevel = (score: number): RiskLevel => {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
};

export const morphonAi = {
  enabled: envConfig.morphonAiEnabled,
  evaluateLogin: (context: Record<string, unknown>): RiskSignal => {
    const velocity = Number(context["velocity"] ?? 0);
    const ipReputation = Number(context["ipReputation"] ?? 0);
    const composite = Math.min(100, velocity * 10 + ipReputation * 0.5);

    return {
      feature: "login",
      score: composite,
      level: scoreToLevel(composite),
      metadata: context,
    };
  },
};
