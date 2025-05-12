import express from 'express';
import connectDB from './config/db.config.js';
import dotenv from 'dotenv';
import cors from 'cors';
import shipmentRoutes from './routes/shipment.routes.js';

// Configure environment variables
dotenv.config();

// Create Express app
const app = express();

// Comprehensive CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000', // Local frontend
    'https://your-frontend-domain.com', // Production frontend
    '*' // Open for Postman and other clients during development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api', shipmentRoutes);

// Root route for verifying server is running
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running successfully', 
    timestamp: new Date().toISOString() 
  });
});

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'production' ? {} : err.message 
  });
});

// Export for Vercel
export default app;

// Local server startup (only for local development)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
    connectDB();
  });
}