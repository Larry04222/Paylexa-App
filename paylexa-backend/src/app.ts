import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { apiRouter } from "./routes";
import { requestLogger } from "./middleware/logger";
import { morphonGuard } from "./middleware/morphon.guard";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(requestLogger);
app.use(morphonGuard);
app.use("/api", apiRouter);
app.use(errorHandler);

export { app };
