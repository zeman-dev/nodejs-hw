import express from 'express';
import helmet from 'helmet';
import 'dotenv/config';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRouter from './routes/notesRoutes.js';
import { errors } from 'celebrate';
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' with { type: 'json' };

const app = express();

// {LIBRARIES}

app.use(helmet());

app.use(
  cors({
    origin: 'https://09-auth-neon-omega.vercel.app',
    credentials: true,
  }),
);

app.use(logger());

app.use(express.json());

app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// {ROUTES}

app.use(notesRouter);
app.use(authRouter);

// {ERROR MIDDLEWARE}

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

// {CONNECTION TO DB}

await connectMongoDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT=${PORT}`);
});
