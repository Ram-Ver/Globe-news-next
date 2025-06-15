import mongoose from 'mongoose';

const polygonSchema = new mongoose.Schema({
  label: String,
  points: [[Number]], 
}, { timestamps: true });

export const Polygon = mongoose.models.Polygon || mongoose.model("Polygon", polygonSchema);
