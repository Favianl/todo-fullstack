import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { FRONT_URL, PORT } from './config.js';
import testRoutes from './routes/test.routes.js';
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(
  cors({
    origin: FRONT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api', tasksRoutes);

app.use('/api', testRoutes);

app.listen(PORT);
console.log(`Server on port ${PORT}`);
