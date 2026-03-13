import React, { useEffect, useState } from "react";
import { statsApi } from "../../../services/api";

const CommunityImpactSection = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRegeneratedSpaces: 0,
    averageProjectedSoilImprovement: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await statsApi.getGlobalStats();
        setStats((prev) => ({ ...prev, ...(response?.data || {}) }));
      } catch {
        setStats({
          totalUsers: 0,
          totalRegeneratedSpaces: 0,
          averageProjectedSoilImprovement: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <section className="py-16 md:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-3">
          Regeneration Impact Dashboard
        </h2>
        <p className="text-muted-foreground mb-8">
          Aggregated progress indicators from active SoilRevive assessments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground">Total Assessors</p>
            <p className="text-3xl font-heading text-foreground mt-2">
              {loading ? "..." : stats.totalUsers}
            </p>
          </article>
          <article className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground">Total Regeneration Plans</p>
            <p className="text-3xl font-heading text-foreground mt-2">
              {loading ? "..." : stats.totalRegeneratedSpaces}
            </p>
          </article>
          <article className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground">
              Mean Projected Soil Improvement
            </p>
            <p className="text-3xl font-heading text-foreground mt-2">
              {loading ? "..." : `${stats.averageProjectedSoilImprovement}%`}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpactSection;
