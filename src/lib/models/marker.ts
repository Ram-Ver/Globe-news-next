import mongoose from "mongoose";

const markerSchema = new mongoose.Schema(
  {
    _id: String,
    lat: Number,
    lng: Number,
    label: String,
  },
  { timestamps: true }
);

export const Marker =
  mongoose.models.marker || mongoose.model("marker", markerSchema);
