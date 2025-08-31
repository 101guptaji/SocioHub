import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from 'helmet';
import cookieParser from "cookie-parser";


import { connectDB } from "./db/config.js";
import authRoutes from './modules/auth/routes.js';
import userRoutes from './modules/users/routes.js';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

await connectDB();

app.get('/', (req, res)=>res.send("Welcome to Social Media Platform"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Global error shield
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Unexpected server error" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>console.log("Server is running on PORT: "+PORT));
