import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from 'helmet';
import cookieParser from "cookie-parser";


import { connectDB } from "./db/config.js";
import authRoutes from './modules/auth/routes.js';
import userRoutes from './modules/users/routes.js';
import friendRoutes from './modules/friends/routes.js';
import postRoutes from './modules/posts/routes.js';
import mediaRoutes from './modules/media/routes.js';

import {errorHandler} from './middleware/error.js';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

await connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res)=>res.send("Welcome to Social Media Platform"));

// Global error shield
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>console.log("Server is running on PORT: "+PORT));
