import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from 'helmet';

import authRoutes from './modules/auth/routes.js';
import userRoutes from './modules/users/routes.js';
import friendRoutes from './modules/friends/routes.js';
import postRoutes from './modules/posts/routes.js';
import messageRouter from './modules/messages/routes.js';

import {errorHandler} from './middleware/error.js';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRouter);

app.get('/', (req, res)=>res.send("Welcome to Social Media Platform"));

// Global error shield
app.use(errorHandler);

export default app;
