import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error("Unhandled error", err);
  res.status(500).json({
    status: "error",
    message: err.message ?? "Internal server error",
  });
};
