import express from "express";
import RecommendationHistory from "../models/RecommendationHistory.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res, next) => {
  try {
    const history = await RecommendationHistory.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(history);
  } catch (error) {
    return next(error);
  }
});

export default router;
