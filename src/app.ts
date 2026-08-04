import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { environment } from './config/environment.js';
import { routes } from './routes/index.js';
import { errorHandler } from './middlewares/error-handler.middleware.js';

export const app = express();

app.use(helmet());

app.use(
  cors({
    origin: environment.application.frontendUrl,
    credentials: true
  })
);

app.use(express.json());

app.get('/health', (_request, response) => {
  return response.status(200).json({
    status: 'ok',
    application: 'Internal Ticket System API',
    environment: environment.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

app.use(routes);

app.use(errorHandler);