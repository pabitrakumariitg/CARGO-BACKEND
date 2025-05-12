import express from "express";
import connectDB from "./config/db.config.js"
import dotenv from "dotenv";
import cors from "cors";
import shipmentRoutes from "./routes/shipment.routes.js"
dotenv.config();

const app = express();
const PORT=8000
app.use(cors({
  origin: "https://cargo-webapp.vercel.app", 
  credentials: true            
}));
app.use(express.json());
app.use("/api", shipmentRoutes);
app.listen(PORT,()=>{
    console.log("Server started at PORT:",PORT)
    connectDB()
})

