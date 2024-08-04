import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import apiRoutes from './routes/api';

import { pollData } from './services/dataPolling'; // Import the pollData function

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Start polling data
pollData();
export default app;