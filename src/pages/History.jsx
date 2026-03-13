import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { recommendationApi } from "../services/api";

const History = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await recommendationApi.getHistory();
        setHistory(Array.isArray(response.data) ? response.data : []);
      } catch (apiError) {
        setError(
          apiError?.response?.data?.message ||
            "Unable to load recommendation history right now."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/user-registration-login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogout={handleLogout} />

      <main className="pt-[88px] pb-10 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-2">
            Recommendation History
          </h1>
          <p className="text-muted-foreground mb-8">
            Your past plant recommendations, newest first.
          </p>

          {isLoading && (
            <div className="bg-card border border-border rounded-xl p-6 text-muted-foreground">
              Loading history...
            </div>
          )}

          {!isLoading && error && (
            <div className="bg-card border border-error/30 rounded-xl p-6 text-error">
              {error}
            </div>
          )}

          {!isLoading && !error && history.length === 0 && (
            <div className="bg-card border border-border rounded-xl p-6 text-foreground">
              No past recommendations yet
            </div>
          )}

          {!isLoading && !error && history.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {history.map((entry) => (
                <article
                  key={entry._id}
                  className="bg-card border border-border rounded-xl p-5 shadow-earth"
                >
                  <p className="text-sm text-muted-foreground mb-4">
                    {new Date(entry.createdAt).toLocaleString()}
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold text-foreground">Soil Type:</span>{" "}
                      <span className="text-muted-foreground">{entry.soilType}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">Space Type:</span>{" "}
                      <span className="text-muted-foreground">{entry.spaceType}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">Location:</span>{" "}
                      <span className="text-muted-foreground">{entry.location}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">Plants:</span>{" "}
                      <span className="text-muted-foreground">
                        {(entry.recommendedPlants || [])
                          .map((plant) => plant?.plantName)
                          .filter(Boolean)
                          .join(", ") || "No plants found"}
                      </span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
