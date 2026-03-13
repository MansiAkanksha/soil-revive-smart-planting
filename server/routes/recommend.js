import express from "express";
import Plant from "../models/Plant.js";
import RecommendationHistory from "../models/RecommendationHistory.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  fetchClimateSummary,
  getClimateAdaptiveSuggestion,
} from "../utils/climateService.js";
import { calculateSoilImpactProjection } from "../utils/soilImpactProjection.js";

const router = express.Router();

const normalizeWaterRequirement = (value) => {
  const text = String(value || "").toLowerCase();
  if (text.includes("low")) {
    return "low";
  }
  if (text.includes("high")) {
    return "high";
  }
  return "medium";
};

const scorePlantForRainfall = (plant, rainfallCategory) => {
  const requirement = normalizeWaterRequirement(plant?.waterRequirement);
  let score = 0;

  if (requirement === rainfallCategory) {
    score += 3;
  } else if (
    (rainfallCategory === "low" && requirement === "medium") ||
    (rainfallCategory === "high" && requirement === "medium")
  ) {
    score += 1;
  }

  score += Number(plant?.soilImprovementScore || 0) / 10;
  return score;
};

router.post("/", protect, async (req, res, next) => {
  try {
    const { spaceType, soilType, location, city, state } = req.body;

    let plants;

    if (spaceType === "rooftop") {
      plants = await Plant.find({ rooftopCompatible: true }).lean();
    } else if (spaceType === "slope") {
      plants = await Plant.find({ slopeCompatible: true }).lean();
    } else {
      plants = await Plant.find().lean();
    }

    const climateSummary = await fetchClimateSummary({ city, state });
    const rainfallCategory = climateSummary?.rainfallCategory || "medium";

    const rankedPlants = [...plants].sort((a, b) => {
      return (
        scorePlantForRainfall(b, rainfallCategory) -
        scorePlantForRainfall(a, rainfallCategory)
      );
    });
    const climateAdaptiveSuggestion =
      getClimateAdaptiveSuggestion(rainfallCategory);
    const projection = calculateSoilImpactProjection(rankedPlants);

    const resolvedLocation =
      location?.trim() ||
      [city, state]
        .filter(Boolean)
        .map((value) => String(value).trim())
        .join(", ") ||
      "Unknown";

    // Persist each recommendation result for the authenticated user.
    await RecommendationHistory.create({
      userId: req.user._id,
      soilType: soilType || "Unknown",
      spaceType: spaceType || "Unknown",
      location: resolvedLocation,
      recommendedPlants: rankedPlants,
      climateData: climateSummary,
      projectionData: projection,
    });

    return res.status(200).json({
      plants: rankedPlants,
      climateSummary,
      climateAdaptiveSuggestion,
      projection,
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
