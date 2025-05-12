import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    shipmentId: { type: String, required: true, unique: true },
    containerId: { type: String, required: true },
    route: [{ type: String }],
    currentLocation: {
      location:{type:String},
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    eta: { type: String },
    status: {
      type: String,
      enum: ["In Transit", "Delivered", "Delayed", "Pending"], // You can restrict the status values as needed
      default: "Pending", // Default status
    },
  },
  { timestamps: true }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;
