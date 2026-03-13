import mongoose from "mongoose";

const recommendationHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    soilType: {
      type: String,
      required: true,
      trim: true,
    },
    spaceType: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    recommendedPlants: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    climateData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    projectionData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export default mongoose.model(
  "RecommendationHistory",
  recommendationHistorySchema
);
