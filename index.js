// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import shipmentRoutes from "./routes/shipments.js";

dotenv.config();
await connectDB();  // connect to MongoDB

const app = express();

app.use(cors({
  origin: "*",        // allow Postman, frontend, etc.
  credentials: true
}));

app.use(express.json());
app.use("/api", shipmentRoutes);

export default app;   // no app.listen()
