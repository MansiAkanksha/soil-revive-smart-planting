import express from "express";
import User from "../models/User.js";
import RecommendationHistory from "../models/RecommendationHistory.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const [totalUsers, totalRegeneratedSpaces, historyRows] = await Promise.all([
      User.countDocuments(),
      RecommendationHistory.countDocuments(),
      RecommendationHistory.find(
        {},
        { recommendedPlants: 1, projectionData: 1 }
      ).lean(),
    ]);

    const projectedValues = historyRows
      .map((row) => Number(row?.projectionData?.oneYear?.overallSoilImprovementPct))
      .filter((value) => Number.isFinite(value));

    const averageProjectedSoilImprovement =
      projectedValues.length > 0
        ? Number(
            (
              projectedValues.reduce((sum, value) => sum + value, 0) /
              projectedValues.length
            ).toFixed(1)
          )
        : 0;

    const plantScores = historyRows.flatMap((row) =>
      (row?.recommendedPlants || [])
        .map((plant) => Number(plant?.soilImprovementScore))
        .filter((value) => Number.isFinite(value))
    );
    const averageSoilImprovementScore =
      plantScores.length > 0
        ? Number(
            (
              plantScores.reduce((sum, value) => sum + value, 0) /
              plantScores.length
            ).toFixed(2)
          )
        : 0;

    return res.status(200).json({
      totalUsers,
      totalRegeneratedSpaces,
      averageProjectedSoilImprovement,
      averageSoilImprovementScore,
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
