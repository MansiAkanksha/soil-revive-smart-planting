const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const safeNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const average = (values) => {
  if (!values.length) {
    return 0;
  }
  const total = values.reduce((sum, value) => sum + safeNumber(value), 0);
  return total / values.length;
};

const getTimeframeProjection = (avgScores, factor) => {
  const organicMatterImprovementPct = clamp(
    avgScores.soilImprovement * 1.25 * factor,
    0,
    100
  );
  const moistureRetentionIncreasePct = clamp(
    avgScores.moistureRetention * 1.35 * factor,
    0,
    100
  );
  const temperatureReductionEstimateC = clamp(
    (avgScores.erosionControl / 10) * 2.4 * factor,
    0,
    12
  );
  const overallSoilImprovementPct =
    (organicMatterImprovementPct + moistureRetentionIncreasePct) / 2;

  return {
    organicMatterImprovementPct: Number(
      organicMatterImprovementPct.toFixed(1)
    ),
    moistureRetentionIncreasePct: Number(
      moistureRetentionIncreasePct.toFixed(1)
    ),
    temperatureReductionEstimateC: Number(
      temperatureReductionEstimateC.toFixed(2)
    ),
    overallSoilImprovementPct: Number(overallSoilImprovementPct.toFixed(1)),
  };
};

export const calculateSoilImpactProjection = (plants) => {
  const rows = Array.isArray(plants) ? plants : [];

  const avgScores = {
    soilImprovement: average(rows.map((p) => p?.soilImprovementScore)),
    moistureRetention: average(rows.map((p) => p?.moistureRetentionScore)),
    erosionControl: average(rows.map((p) => p?.erosionControlScore)),
  };

  return {
    sixMonth: getTimeframeProjection(avgScores, 0.55),
    oneYear: getTimeframeProjection(avgScores, 1),
  };
};
