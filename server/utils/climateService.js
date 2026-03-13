const toFixedNumber = (value, digits = 2) =>
  Number(Number(value || 0).toFixed(digits));

const getRainfallCategory = (avgRainfallMm) => {
  if (avgRainfallMm < 2) {
    return "low";
  }
  if (avgRainfallMm < 8) {
    return "medium";
  }
  return "high";
};

export const getClimateAdaptiveSuggestion = (rainfallCategory) => {
  if (rainfallCategory === "low") {
    return "Low rainfall detected. Prefer drought-tolerant plants with lower water demand and mulch support.";
  }
  if (rainfallCategory === "high") {
    return "High rainfall detected. Prefer plants with strong root anchoring and moisture-balancing soil behavior.";
  }
  return "Moderate rainfall detected. Choose balanced water-use plants for steady soil regeneration.";
};

export const fetchClimateSummary = async ({ city, state }) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const fallback = {
    avgRainfallMm: 0,
    avgTemperatureC: 0,
    avgHumidityPct: 0,
    rainfallCategory: "medium",
    source: "fallback",
  };

  if (!apiKey || !city) {
    return fallback;
  }

  const query = [city, state].filter(Boolean).join(",");

  try {
    const geoParams = new URLSearchParams({
      q: query,
      limit: "1",
      appid: apiKey,
    });
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?${geoParams.toString()}`
    );
    const geoData = await geoResponse.json();

    if (!Array.isArray(geoData) || geoData.length === 0) {
      return fallback;
    }

    const { lat, lon } = geoData[0];
    const forecastParams = new URLSearchParams({
      lat: String(lat),
      lon: String(lon),
      appid: apiKey,
      units: "metric",
    });
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?${forecastParams.toString()}`
    );
    const forecastData = await forecastResponse.json();
    const list = Array.isArray(forecastData?.list) ? forecastData.list : [];

    if (list.length === 0) {
      return fallback;
    }

    const totals = list.reduce(
      (acc, item) => {
        acc.temp += Number(item?.main?.temp || 0);
        acc.humidity += Number(item?.main?.humidity || 0);
        acc.rain += Number(item?.rain?.["3h"] || 0);
        return acc;
      },
      { temp: 0, humidity: 0, rain: 0 }
    );

    const count = list.length;
    const avgTemperatureC = toFixedNumber(totals.temp / count, 1);
    const avgHumidityPct = toFixedNumber(totals.humidity / count, 1);
    const avgRainfallMm = toFixedNumber(totals.rain / 5, 2);
    const rainfallCategory = getRainfallCategory(avgRainfallMm);

    return {
      avgRainfallMm,
      avgTemperatureC,
      avgHumidityPct,
      rainfallCategory,
      source: "openweather",
    };
  } catch {
    return fallback;
  }
};
