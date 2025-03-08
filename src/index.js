import {} from 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from './config/logger.js';
import ErrorResponse from './interceptors/toError.js';
import errorMiddleware from './middlewares/error.js';
import router from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders:
      'Content-Type, Authorization, Accept, Accept-Language, Accept-Encoding',
    exposedHeaders:
      'Content-Type, Authorization, Accept, Accept-Language, Accept-Encoding',
    maxAge: 3600,
  })
);
app.use(helmet());
app.use(morgan(logger.MORGAN_FORMAT));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(router);
app.use(errorMiddleware);

// 404 Response Handler
app.use((req, res) => {
  const url = req.url;
  const method = req.method;
  const response = ErrorResponse(
    404,
    `${method} - ${url} is not found!`,
    new Error()
  );
  res.status(404).json(response);
});

app.listen(PORT, () => {
  console.log('----------------------------------------------');
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('----------------------------------------------');
});

export default app;
