import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  plantName: String,
  scientificName: String,
  category: String,
  rootDepth: String,
  waterRequirement: String,
  sunlightRequirement: String,
  soilImprovementScore: Number,
  moistureRetentionScore: Number,
  erosionControlScore: Number,
  rooftopCompatible: Boolean,
  slopeCompatible: Boolean,
  ruralCompatible: Boolean,
  description: String,
  imageURL: String
});

export default mongoose.model("Plant", plantSchema);