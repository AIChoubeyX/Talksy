import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import cors from 'cors';
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from './lib/db.js';
import {app, server } from './lib/socket.js';


app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

 //app.use(express.json());
app.use(express.json({ limit: '10mb' })); // or higher if needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes)
const PORT = process.env.PORT

server.listen(5001, () => {
  console.log('Server is running on port 5001');
  connectDB();
});