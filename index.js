import express from "express";
import connectDB from "./config/db.config.js"
import dotenv from "dotenv";
import cors from "cors";
import shipmentRoutes from "./routes/shipment.routes.js"
dotenv.config();

const app = express();
const PORT=process.env.PORT

// CORS configuration - must be before routes
app.use(cors({
  origin: "https://cargo-webapp.vercel.app",  // Remove trailing slash
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],    // Add allowed headers
  credentials: true
}));

// Middleware
app.use(express.json());

// Test route to verify CORS
app.get("/test", (req, res) => {
  res.json({ message: "CORS is working" });
});

// Routes
app.use("/api", shipmentRoutes);

// Handle 404 errors - must be after routes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error handling middleware - must be last
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
app.listen(PORT,()=>{
    console.log("Server started at PORT:",PORT)
    connectDB()
})

// Export for Vercel
export default app;
