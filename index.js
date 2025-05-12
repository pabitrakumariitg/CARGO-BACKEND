import express from "express";
import connectDB from "./config/db.config.js"
import dotenv from "dotenv";
import cors from "cors";
import shipmentRoutes from "./routes/shipment.routes.js"
dotenv.config();

const app = express();
const PORT=process.env.PORT
app.use(cors({
  origin: "https://cargo-webapp.vercel.app/", 
  credentials: true            
}));
app.use(express.json());
app.use("/api", shipmentRoutes);

app.listen(PORT,()=>{
    console.log("Server started at PORT:",PORT)
    connectDB()
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});
