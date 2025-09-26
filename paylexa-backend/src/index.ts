import 'dotenv/config';

import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { registerMorphonGuards } from './middleware/morphonGuard.js';
import { errorHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';
import { createLogger } from './utils/logger.js';

const app: Application = express();
const logger = createLogger('bootstrap');

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('combined'));

registerMorphonGuards(app);

app.use('/api', routes);

app.use(errorHandler);

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  logger.info(`Paylexa backend running on port ${port}`);
});

export default app;
