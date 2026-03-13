import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

const RecommendationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [projectionView, setProjectionView] = React.useState('oneYear');

  const formData = location?.state?.formData || null;
  const recommendations = Array.isArray(location?.state?.recommendations)
    ? location.state.recommendations
    : [];
  const climateSummary = location?.state?.climateSummary || null;
  const climateAdaptiveSuggestion = location?.state?.climateAdaptiveSuggestion || '';
  const projection = location?.state?.projection || {};
  const activeProjection =
    projectionView === 'sixMonth' ? projection?.sixMonth : projection?.oneYear;

  const renderProgressBar = (label, value, suffix = '%') => (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground">
          {value ?? 0}
          {suffix}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${Math.max(0, Math.min(Number(value || 0), 100))}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onLogout={() => {
          logout();
          navigate('/user-registration-login');
        }}
      />

      <main className="pt-[88px] pb-10 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
              Your Plant Recommendations
            </h1>
            <p className="text-muted-foreground mt-2">
              Space type: {formData?.spaceType || 'N/A'} | Soil: {formData?.soilType || 'N/A'}
            </p>
          </div>

          {climateSummary && (
            <section className="mb-8 bg-card border border-border rounded-xl p-5">
              <h2 className="font-heading text-2xl text-foreground mb-4">Climate Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-background rounded-lg p-3 border border-border">
                  <p className="text-muted-foreground">Avg Rainfall</p>
                  <p className="text-foreground font-semibold">{climateSummary?.avgRainfallMm ?? 0} mm</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border">
                  <p className="text-muted-foreground">Avg Temperature</p>
                  <p className="text-foreground font-semibold">{climateSummary?.avgTemperatureC ?? 0} C</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border">
                  <p className="text-muted-foreground">Avg Humidity</p>
                  <p className="text-foreground font-semibold">{climateSummary?.avgHumidityPct ?? 0}%</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border">
                  <p className="text-muted-foreground">Rainfall Category</p>
                  <p className="text-foreground font-semibold capitalize">{climateSummary?.rainfallCategory || 'medium'}</p>
                </div>
              </div>
            </section>
          )}

          {climateAdaptiveSuggestion && (
            <section className="mb-8 bg-card border border-border rounded-xl p-5">
              <h2 className="font-heading text-2xl text-foreground mb-2">Climate Adaptive Suggestion</h2>
              <p className="text-muted-foreground">{climateAdaptiveSuggestion}</p>
            </section>
          )}

          {activeProjection && (
            <section className="mb-8 bg-card border border-border rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h2 className="font-heading text-2xl text-foreground">Soil Impact Projection</h2>
                <div className="inline-flex rounded-lg border border-border overflow-hidden">
                  <button
                    className={`px-4 py-2 text-sm ${projectionView === 'sixMonth' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'}`}
                    onClick={() => setProjectionView('sixMonth')}
                  >
                    6-Month
                  </button>
                  <button
                    className={`px-4 py-2 text-sm ${projectionView === 'oneYear' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'}`}
                    onClick={() => setProjectionView('oneYear')}
                  >
                    1-Year
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {renderProgressBar(
                  'Organic Matter Improvement',
                  activeProjection?.organicMatterImprovementPct
                )}
                {renderProgressBar(
                  'Moisture Retention Increase',
                  activeProjection?.moistureRetentionIncreasePct
                )}
                {renderProgressBar(
                  'Overall Soil Improvement',
                  activeProjection?.overallSoilImprovementPct
                )}
                <div className="text-sm text-muted-foreground">
                  Temperature reduction estimate: {activeProjection?.temperatureReductionEstimateC ?? 0} C
                </div>
              </div>
            </section>
          )}

          {!formData && (
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <p className="text-foreground mb-4">No assessment data found. Please complete the form first.</p>
              <Button onClick={() => navigate('/input-wizard-form')}>Go To Assessment</Button>
            </div>
          )}

          {formData && recommendations.length === 0 && (
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} color="var(--color-accent)" />
                <div>
                  <p className="text-foreground font-medium">No plant matches found right now.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your request worked, but the database returned no records for this filter. Add plant documents in MongoDB and try again.
                  </p>
                </div>
              </div>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((plant, idx) => (
                <article key={`${plant?.plantName || 'plant'}-${idx}`} className="bg-card border border-border rounded-xl overflow-hidden shadow-earth">
                  <Image
                    src={plant?.imageURL || '/assets/images/no_image.png'}
                    alt={plant?.plantName || 'Plant image'}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-5 space-y-2">
                    <h2 className="font-heading text-xl text-foreground">{plant?.plantName || 'Unnamed plant'}</h2>
                    <p className="text-sm text-muted-foreground italic">{plant?.scientificName || 'No scientific name'}</p>
                    <p className="text-sm text-foreground">{plant?.description || 'No description available.'}</p>
                    <div className="pt-2 text-xs text-muted-foreground space-y-1">
                      <p>Water: {plant?.waterRequirement || 'N/A'}</p>
                      <p>Sunlight: {plant?.sunlightRequirement || 'N/A'}</p>
                      <p>Root Depth: {plant?.rootDepth || 'N/A'}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                iconName="ChevronLeft"
                iconPosition="left"
                onClick={() => navigate('/input-wizard-form')}
              >
                Back To Assessment
              </Button>
              <Button
                variant="default"
                iconName="History"
                iconPosition="left"
                onClick={() => window.open('/history', '_blank', 'noopener,noreferrer')}
              >
                Open History In New Tab
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecommendationsPage;
