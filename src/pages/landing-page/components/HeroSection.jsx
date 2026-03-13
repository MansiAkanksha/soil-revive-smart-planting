import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full mb-6">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-medium text-success">
                  Rule-Based Soil Regeneration
                </span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Transform Degraded Soil with
                <span className="text-primary block mt-2">
                  Ecologically Optimized Plant Systems
                </span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Access scientifically informed plant recommendations designed to support soil health, improve moisture retention, and stabilize root zones across rooftops, slopes, home gardens, and agricultural landscapes.
                Built on ecological principles such as nitrogen fixation, erosion control, and biodiversity support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Sprout"
                  iconPosition="left"
                  onClick={() => navigate("/user-registration-login")}
                  className="shadow-earth-md hover:shadow-earth-lg"
                >
                  Start Assessment
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="PlayCircle"
                  iconPosition="left"
                  onClick={() =>
                    window.open(
                      "/assets/videos/soilrevive-demo.mp4",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  Watch Demo
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 md:gap-6 mt-12 pt-8 border-t border-border">
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary mb-1">
                    500+
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Species Profiles
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-success mb-1">
                    85%
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Modeled Improvement
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-accent mb-1">
                    10K+
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Sites Assessed
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-earth-xl">
                <Image
                  src="/assets/images/no_image.png"
                  alt="Lush green garden with diverse native plants growing in rich dark soil showing healthy root systems and vibrant foliage in natural sunlight"
                  className="w-full h-64 md:h-80 lg:h-96 object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-earth-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-success"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground">
                          Soil Health Projection
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Based on published agronomic indicators
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 md:w-40 md:h-40 bg-accent/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default HeroSection;
