import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { useAuth } from "../../../context/AuthContext";
import { recommendationApi } from "../../../services/api";

const HistoryPreviewSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPreview = async () => {
      if (!isAuthenticated) {
        return;
      }

      setLoading(true);
      try {
        const response = await recommendationApi.getHistory();
        const rows = Array.isArray(response?.data) ? response.data : [];
        setHistory(rows.slice(0, 3));
      } catch {
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadPreview();
  }, [isAuthenticated]);

  return (
    <section id="history" className="py-16 md:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
              Recommendation History
            </h2>
            <p className="text-muted-foreground mt-2">
              Review previously generated site assessments and plant strategies.
            </p>
          </div>
          <Button
            variant="default"
            iconName="History"
            iconPosition="left"
            onClick={() => window.open("/history", "_blank", "noopener,noreferrer")}
          >
            Open Complete History
          </Button>
        </div>

        {!isAuthenticated && (
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-foreground mb-4">
              Sign in to access your stored regeneration recommendations.
            </p>
            <Button onClick={() => navigate("/user-registration-login")}>
              Login / Register
            </Button>
          </div>
        )}

        {isAuthenticated && loading && (
          <div className="bg-card border border-border rounded-xl p-6 text-muted-foreground">
            Loading your assessment history...
          </div>
        )}

        {isAuthenticated && !loading && history.length === 0 && (
          <div className="bg-card border border-border rounded-xl p-6 text-foreground">
            No saved assessments yet. Generate recommendations from the
            dashboard to populate this section.
          </div>
        )}

        {isAuthenticated && !loading && history.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {history.map((entry) => (
              <article
                key={entry._id}
                className="bg-card border border-border rounded-xl p-5 shadow-earth"
              >
                <p className="text-xs text-muted-foreground mb-3">
                  {new Date(entry.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Soil:</span> {entry.soilType}
                </p>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Space:</span> {entry.spaceType}
                </p>
                <p className="text-sm text-foreground mt-2">
                  <span className="font-semibold">Plants:</span>{" "}
                  {(entry.recommendedPlants || [])
                    .map((plant) => plant?.plantName)
                    .filter(Boolean)
                    .slice(0, 4)
                    .join(", ") || "No plants found"}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HistoryPreviewSection;
