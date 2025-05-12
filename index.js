import express from "express";
import connectDB from "./config/db.config.js"
import dotenv from "dotenv";
import cors from "cors";
import shipmentRoutes from "./routes/shipment.routes.js"
dotenv.config();

const app = express();
const PORT=process.env.PORT
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true               // allow credentials
}));
app.use(express.json());
app.use("/api", shipmentRoutes);

app.listen(PORT,()=>{
    console.log("Server started at PORT:",PORT)
    connectDB()
})


